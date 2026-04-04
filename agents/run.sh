#!/bin/bash
set -uo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
AGENTS_DIR="$PROJECT_DIR/agents"
TASKS_DIR="$AGENTS_DIR/tasks"
OUTPUT_DIR="$AGENTS_DIR/output"

# Cleanup previous run
rm -rf "$TASKS_DIR" "$OUTPUT_DIR"
mkdir -p "$TASKS_DIR" "$OUTPUT_DIR"

cd "$PROJECT_DIR"

# ═══ Phase 0: SNAPSHOT ═══
echo "[$(date +%H:%M:%S)] Phase 0: Saving snapshots..."
cp src/data/schools.ts "$OUTPUT_DIR/schools-before.ts"
cp src/data/programs.ts "$OUTPUT_DIR/programs-before.ts"

# ═══ Phase 1: DISPATCH ═══
echo "[$(date +%H:%M:%S)] Phase 1: DISPATCH"
if ! claude -p "$(cat "$AGENTS_DIR/prompts/dispatcher.md")" \
  --dangerously-skip-permissions \
  --allowedTools "WebSearch" "WebFetch" "Read" "Write" \
  --max-budget-usd 2 \
  --output-format text; then
  echo "ERROR: Dispatcher failed. Aborting."
  exit 1
fi

# Verify task files were created
for f in "$TASKS_DIR/task-us-a.json" "$TASKS_DIR/task-us-b.json" "$TASKS_DIR/task-others.json"; do
  if [ ! -f "$f" ]; then
    echo "ERROR: Dispatcher did not create $f. Aborting."
    exit 1
  fi
done

# ═══ Phase 2: WORK (parallel) ═══
echo "[$(date +%H:%M:%S)] Phase 2: WORK (parallel)"

PIDS=()
cleanup() {
  for pid in "${PIDS[@]}"; do
    kill "$pid" 2>/dev/null || true
  done
}
trap cleanup EXIT

claude -p "$(cat "$AGENTS_DIR/prompts/worker-us-a.md")" \
  --dangerously-skip-permissions \
  --allowedTools "WebSearch" "WebFetch" "Read" "Write" \
  --max-budget-usd 5 \
  --output-format text &
PIDS+=($!)

claude -p "$(cat "$AGENTS_DIR/prompts/worker-us-b.md")" \
  --dangerously-skip-permissions \
  --allowedTools "WebSearch" "WebFetch" "Read" "Write" \
  --max-budget-usd 5 \
  --output-format text &
PIDS+=($!)

claude -p "$(cat "$AGENTS_DIR/prompts/worker-others.md")" \
  --dangerously-skip-permissions \
  --allowedTools "WebSearch" "WebFetch" "Read" "Write" \
  --max-budget-usd 5 \
  --output-format text &
PIDS+=($!)

# Wait for each worker, track failures
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

# ═══ Phase 3: REVIEW ═══
echo "[$(date +%H:%M:%S)] Phase 3: REVIEW"
if ! claude -p "$(cat "$AGENTS_DIR/prompts/reviewer.md")" \
  --dangerously-skip-permissions \
  --allowedTools "Read" "Write" "Edit" "Bash" \
  --max-budget-usd 3 \
  --output-format text; then
  echo "ERROR: Reviewer failed."
  exit 1
fi

# ═══ Phase 4: SUMMARY ═══
echo "[$(date +%H:%M:%S)] Phase 4: SUMMARY"
claude -p "$(cat "$AGENTS_DIR/prompts/summary.md")" \
  --dangerously-skip-permissions \
  --allowedTools "Read" "Write" \
  --max-budget-usd 1 \
  --output-format text

trap - EXIT
echo ""
echo "═══════════════════════════════════════════"
echo "Done! Report: $OUTPUT_DIR/report.md"
echo "Total budget cap: \$21"
echo "═══════════════════════════════════════════"
