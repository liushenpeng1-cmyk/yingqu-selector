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

# ═══ Phase 2: Re-run failed Workers (parallel, higher budget) ═══
echo "[$(date +%H:%M:%S)] Phase 2: WORK — re-running Worker 2 & 3 with higher budget"

PIDS=()
cleanup() {
  for pid in "${PIDS[@]}"; do
    kill "$pid" 2>/dev/null || true
  done
}
trap cleanup EXIT

claude -p "$(cat "$AGENTS_DIR/prompts/worker-us-b.md")" \
  --dangerously-skip-permissions \
  --allowedTools "WebSearch" "WebFetch" "Read" "Write" \
  --max-budget-usd 10 \
  --output-format text &
PIDS+=($!)

claude -p "$(cat "$AGENTS_DIR/prompts/worker-others.md")" \
  --dangerously-skip-permissions \
  --allowedTools "WebSearch" "WebFetch" "Read" "Write" \
  --max-budget-usd 10 \
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
if [ "$FAILURES" -gt 0 ]; then
  echo "WARNING: $FAILURES worker(s) failed, proceeding with partial results"
fi

# ═══ Phase 3: REVIEW ═══
echo "[$(date +%H:%M:%S)] Phase 3: REVIEW"
if ! claude -p "$(cat "$AGENTS_DIR/prompts/reviewer.md")" \
  --dangerously-skip-permissions \
  --allowedTools "Read" "Write" "Edit" "Bash" \
  --max-budget-usd 5 \
  --output-format text; then
  echo "ERROR: Reviewer failed."
  exit 1
fi

# ═══ Phase 4: SUMMARY ═══
echo "[$(date +%H:%M:%S)] Phase 4: SUMMARY"
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
