#!/bin/bash
set -uo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
AGENTS_DIR="$PROJECT_DIR/agents"
OUTPUT_DIR="$AGENTS_DIR/output"

cd "$PROJECT_DIR"

# Clean previous worker output (keep snapshots)
rm -f "$OUTPUT_DIR"/worker*.ts "$OUTPUT_DIR"/notes-fixes.json

# ═══ Phase 0: SNAPSHOT ═══
echo "[$(date +%H:%M:%S)] Phase 0: Saving snapshots..."
cp src/data/schools.ts "$OUTPUT_DIR/schools-before.ts"
cp src/data/programs.ts "$OUTPUT_DIR/programs-before.ts"

# ═══ Phase 1: Workers (parallel) ═══
echo "[$(date +%H:%M:%S)] Phase 1: 3 Workers in parallel"

PIDS=()
cleanup() {
  for pid in "${PIDS[@]}"; do
    kill "$pid" 2>/dev/null || true
  done
}
trap cleanup EXIT

# Worker 1: 7 remaining US schools ($15)
echo "  Starting Worker 1: Final US schools..."
claude -p "$(cat "$AGENTS_DIR/prompts/worker-us-final.md")" \
  --dangerously-skip-permissions \
  --allowedTools "WebSearch" "WebFetch" "Read" "Write" \
  --max-budget-usd 15 \
  --output-format text &
PIDS+=($!)

# Worker 2: Expand NUS/NTU ($8)
echo "  Starting Worker 2: Singapore expansion..."
claude -p "$(cat "$AGENTS_DIR/prompts/worker-sg-expand.md")" \
  --dangerously-skip-permissions \
  --allowedTools "WebSearch" "WebFetch" "Read" "Write" \
  --max-budget-usd 8 \
  --output-format text &
PIDS+=($!)

# Worker 3: Fill missing notes ($5)
echo "  Starting Worker 3: Notes fix..."
claude -p "$(cat "$AGENTS_DIR/prompts/worker-notes-fix.md")" \
  --dangerously-skip-permissions \
  --allowedTools "WebSearch" "WebFetch" "Read" "Write" \
  --max-budget-usd 5 \
  --output-format text &
PIDS+=($!)

FAILURES=0
for pid in "${PIDS[@]}"; do
  if ! wait "$pid"; then
    echo "WARNING: Worker $pid failed"
    ((FAILURES++))
  fi
done

if [ "$FAILURES" -eq 3 ]; then
  echo "ERROR: All workers failed. Aborting."
  exit 1
fi
if [ "$FAILURES" -gt 0 ]; then
  echo "WARNING: $FAILURES worker(s) failed, proceeding with partial results"
fi

# ═══ Phase 2: REVIEW ═══
echo "[$(date +%H:%M:%S)] Phase 2: REVIEW"
if ! claude -p "$(cat "$AGENTS_DIR/prompts/reviewer.md")

ADDITIONAL TASK: After merging new schools and programs, also read agents/output/notes-fixes.json (if it exists) and update the notes field for each listed program ID in src/data/programs.ts. Only update programs where notes is currently undefined or empty." \
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
