#!/bin/bash
set -uo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
AGENTS_DIR="$PROJECT_DIR/agents"
OUTPUT_DIR="$AGENTS_DIR/output"

cd "$PROJECT_DIR"

# ═══ Phase 0: SNAPSHOT ═══
echo "[$(date +%H:%M:%S)] Phase 0: Saving snapshots..."
cp src/data/schools.ts "$OUTPUT_DIR/schools-before.ts"
cp src/data/programs.ts "$OUTPUT_DIR/programs-before.ts"

# ═══ Phase 1: Workers (parallel) ═══
echo "[$(date +%H:%M:%S)] Phase 1: Running US-remaining + tuition-fix in parallel"

PIDS=()
cleanup() {
  for pid in "${PIDS[@]}"; do
    kill "$pid" 2>/dev/null || true
  done
}
trap cleanup EXIT

# Worker: 7 remaining US schools ($15 budget)
claude -p "$(cat "$AGENTS_DIR/prompts/worker-us-remaining.md")" \
  --dangerously-skip-permissions \
  --allowedTools "WebSearch" "WebFetch" "Read" "Write" \
  --max-budget-usd 15 \
  --output-format text &
PIDS+=($!)

# Worker: fix 5 missing tuition fees ($3 budget)
claude -p "$(cat "$AGENTS_DIR/prompts/worker-tuition-fix.md")" \
  --dangerously-skip-permissions \
  --allowedTools "WebSearch" "WebFetch" "Read" "Write" \
  --max-budget-usd 3 \
  --output-format text &
PIDS+=($!)

FAILURES=0
for pid in "${PIDS[@]}"; do
  if ! wait "$pid"; then
    echo "WARNING: Worker $pid failed"
    ((FAILURES++))
  fi
done

if [ "$FAILURES" -eq 2 ]; then
  echo "ERROR: Both workers failed. Aborting."
  exit 1
fi

# ═══ Phase 2: REVIEW ═══
echo "[$(date +%H:%M:%S)] Phase 2: REVIEW (merge programs + apply tuition fixes)"
if ! claude -p "$(cat "$AGENTS_DIR/prompts/reviewer.md")

ADDITIONAL TASK: After merging new programs, also read agents/output/tuition-fixes.json (if it exists) and update the tuitionFee field for each listed program ID in src/data/programs.ts." \
  --dangerously-skip-permissions \
  --allowedTools "Read" "Write" "Edit" "Bash" \
  --max-budget-usd 5 \
  --output-format text; then
  echo "ERROR: Reviewer failed."
  exit 1
fi

# ═══ Phase 3: SUMMARY ═══
echo "[$(date +%H:%M:%S)] Phase 3: SUMMARY"
claude -p "$(cat "$AGENTS_DIR/prompts/summary.md")" \
  --dangerously-skip-permissions \
  --allowedTools "Read" "Write" \
  --max-budget-usd 2 \
  --output-format text

trap - EXIT
echo ""
echo "═══════════════════════════════════════════"
echo "Done! Report: $OUTPUT_DIR/report.md"
echo "═══════════════════════════════════════════"
