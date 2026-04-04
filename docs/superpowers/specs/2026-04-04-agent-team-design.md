# Agent Team Design: QS Top 100 Data Collection

## Overview

Build a 5-agent team orchestrated by a shell script to collect QS Top 100 university admission data across 6 regions (US, UK, AU, HK, SG, CA) and populate the yingqu-selector website. Fully automatic — no human approval needed during execution.

## Current State

- Existing data in `src/data/schools.ts` and `src/data/programs.ts`
- UK/AU mostly covered, HK/SG/CA partially covered, US partially covered
- Dispatcher will dynamically read current files to determine exact coverage gaps
- Data types: `School`, `Program`, `MajorCategory` well-defined in TypeScript

## Architecture

```
Dispatcher → Worker×3 (parallel) → Reviewer → Summary
```

### Agent Roles

| Agent | Input | Output | Tools | Budget |
|-------|-------|--------|-------|--------|
| Dispatcher | existing data + QS list | 3 task JSONs | WebSearch, WebFetch, Read, Write | $2 |
| Worker 1 (US-A) | task-us-a.json | worker1-schools.ts, worker1-programs.ts | WebSearch, WebFetch, Read, Write | $5 |
| Worker 2 (US-B) | task-us-b.json | worker2-schools.ts, worker2-programs.ts | WebSearch, WebFetch, Read, Write | $5 |
| Worker 3 (Others) | task-others.json | worker3-schools.ts, worker3-programs.ts | WebSearch, WebFetch, Read, Write | $5 |
| Reviewer | all output/*.ts files | merged src/data/*.ts | Read, Write, Edit, Bash | $3 |
| Summary | final data + before snapshot | output/report.md | Read, Write | $1 |

### GPA Scale by Region

| Region | gpaScale | Example values |
|--------|----------|----------------|
| UK | `"percentage"` | preferred: 85, other: 90 |
| AU | `"percentage"` | preferred: 75, other: 80 |
| HK | `"percentage"` | preferred: 80, other: 85 |
| SG | `"percentage"` | preferred: 83, other: 85 |
| CA | `"percentage"` | preferred: 80, other: 85 |
| US | `"gpa4"` | preferred: 3.5, other: 3.7 |

Workers MUST follow this table. Only US uses 4.0 scale; all others use percentage.

### File Structure

```
agents/
├── run.sh                    # Main orchestration script
├── prompts/
│   ├── dispatcher.md         # Dispatcher system prompt
│   ├── worker-us-a.md        # Worker 1 prompt (US group A)
│   ├── worker-us-b.md        # Worker 2 prompt (US group B)
│   ├── worker-others.md      # Worker 3 prompt (UK/AU/HK/SG/CA gap filling)
│   ├── reviewer.md           # Reviewer prompt
│   └── summary.md            # Summary prompt
├── tasks/                    # Generated at runtime by Dispatcher
│   ├── task-us-a.json
│   ├── task-us-b.json
│   └── task-others.json
└── output/                   # Generated at runtime by Workers
    ├── schools-before.ts     # Snapshot for before/after comparison
    ├── programs-before.ts    # Snapshot for before/after comparison
    ├── worker1-schools.ts
    ├── worker1-programs.ts
    ├── worker2-schools.ts
    ├── worker2-programs.ts
    ├── worker3-schools.ts
    ├── worker3-programs.ts
    └── report.md             # Final summary report
```

## Execution Flow

### Phase 0: SNAPSHOT
- Copy current `src/data/schools.ts` → `output/schools-before.ts`
- Copy current `src/data/programs.ts` → `output/programs-before.ts`
- These snapshots let the Summary agent compute before/after diffs

### Phase 1: DISPATCH (~2 min)
- Read existing `schools.ts` and `programs.ts` to know current coverage dynamically
- WebSearch QS World University Rankings Top 100
- Split uncovered/incomplete schools into 3 task groups
- Output task JSONs with school list + target categories per worker

### Phase 2: WORK (parallel, ~15-20 min)
- 3 workers run concurrently via `&`
- Each worker iterates through assigned schools
- For each school: WebSearch official postgrad pages → extract admission requirements
- Output TypeScript data matching `School` and `Program` types to `output/`
- Every entry must have `source` URL and `verified: false`
- Workers write ONLY to `agents/output/` (prompt-level constraint)

**US-specific handling:**
- GPA on 4.0 scale (`gpaScale: "gpa4"`)
- Many don't publish hard GPA cutoffs → use `notes` (e.g., "average admitted GPA 3.7+")
- GRE/GMAT requirements → `extraRequirements` field

### Phase 3: REVIEW (~5 min)
- Read all temp files from `output/`
- Validate required fields (id, schoolId, name, gpaRequirements, source...)
- Check id uniqueness, schoolId consistency with schools data
- Merge into `src/data/schools.ts` and `src/data/programs.ts` preserving region grouping
- Run `npx tsc --noEmit` to verify TypeScript types (faster than full build)
- Auto-fix type errors if check fails, re-run until pass

### Phase 4: SUMMARY (~2 min)
- Read `output/schools-before.ts` and `output/programs-before.ts` for baseline
- Read final `src/data/schools.ts` and `src/data/programs.ts` for current state
- Compute deltas: new schools, new programs, by region and category
- Coverage rate of QS Top 100
- Data quality flags (incomplete schools, unverified entries)
- Output `output/report.md`

## run.sh Implementation

```bash
#!/bin/bash
set -uo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
AGENTS_DIR="$PROJECT_DIR/agents"
TASKS_DIR="$AGENTS_DIR/tasks"
OUTPUT_DIR="$AGENTS_DIR/output"

# Cleanup
rm -rf "$TASKS_DIR" "$OUTPUT_DIR"
mkdir -p "$TASKS_DIR" "$OUTPUT_DIR"

cd "$PROJECT_DIR"

# ═══ Phase 0: SNAPSHOT ═══
echo "[$(date +%H:%M:%S)] Phase 0: Saving snapshots..."
cp src/data/schools.ts "$OUTPUT_DIR/schools-before.ts"
cp src/data/programs.ts "$OUTPUT_DIR/programs-before.ts"

# ═══ Phase 1: DISPATCH ═══
echo "[$(date +%H:%M:%S)] Phase 1: DISPATCH"
timeout 600 claude -p "$(cat "$AGENTS_DIR/prompts/dispatcher.md")" \
  --dangerously-skip-permissions \
  --allowedTools "WebSearch" "WebFetch" "Read" "Write" \
  --max-budget-usd 2 \
  --output-format text

# ═══ Phase 2: WORK (parallel) ═══
echo "[$(date +%H:%M:%S)] Phase 2: WORK (parallel)"

# Trap to clean up background workers on failure
PIDS=()
cleanup() {
  for pid in "${PIDS[@]}"; do
    kill "$pid" 2>/dev/null || true
  done
}
trap cleanup EXIT

timeout 1800 claude -p "$(cat "$AGENTS_DIR/prompts/worker-us-a.md")" \
  --dangerously-skip-permissions \
  --allowedTools "WebSearch" "WebFetch" "Read" "Write" \
  --max-budget-usd 5 \
  --output-format text &
PIDS+=($!)

timeout 1800 claude -p "$(cat "$AGENTS_DIR/prompts/worker-us-b.md")" \
  --dangerously-skip-permissions \
  --allowedTools "WebSearch" "WebFetch" "Read" "Write" \
  --max-budget-usd 5 \
  --output-format text &
PIDS+=($!)

timeout 1800 claude -p "$(cat "$AGENTS_DIR/prompts/worker-others.md")" \
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

# Proceed if at least 1 worker succeeded
if [ "$FAILURES" -eq 3 ]; then
  echo "ERROR: All workers failed. Aborting."
  exit 1
fi
if [ "$FAILURES" -gt 0 ]; then
  echo "WARNING: $FAILURES worker(s) failed, proceeding with partial results"
fi

# ═══ Phase 3: REVIEW ═══
echo "[$(date +%H:%M:%S)] Phase 3: REVIEW"
timeout 900 claude -p "$(cat "$AGENTS_DIR/prompts/reviewer.md")" \
  --dangerously-skip-permissions \
  --allowedTools "Read" "Write" "Edit" "Bash" \
  --max-budget-usd 3 \
  --output-format text

# ═══ Phase 4: SUMMARY ═══
echo "[$(date +%H:%M:%S)] Phase 4: SUMMARY"
timeout 300 claude -p "$(cat "$AGENTS_DIR/prompts/summary.md")" \
  --dangerously-skip-permissions \
  --allowedTools "Read" "Write" \
  --max-budget-usd 1 \
  --output-format text

trap - EXIT
echo ""
echo "═══ Done! Report: $OUTPUT_DIR/report.md ═══"
echo "Total budget cap: \$21"
```

### Key flags for full automation:
- `--dangerously-skip-permissions` — bypasses all permission prompts, zero human interaction
- `--max-budget-usd` — per-agent cost cap to prevent runaway spending (total: $21 max)
- `timeout` — per-agent wall-clock limit (workers: 30min, reviewer: 15min, others: 5-10min)
- `--allowedTools` — whitelist per agent role (workers can't Edit or Bash)

## Key Constraints

- Workers write ONLY to `agents/output/`, not `src/data/` (prompt-enforced)
- Only Reviewer has permission to modify source files
- All new data entries must have `verified: false` and a `source` URL
- US uses `gpaScale: "gpa4"`, all other regions use `"percentage"` (see table above)
- TypeScript type check must pass before Summary phase runs
- Script continues with partial results if 1-2 workers fail (but aborts if all 3 fail)

## Expected Output

- New US schools added (those missing from QS Top 100)
- Gap-filled entries for UK/AU/HK/SG/CA
- Full report with coverage stats and quality flags
- All data includes source URLs for manual verification
