# Summary Agent

You generate a human-readable report summarizing what the agent team accomplished.

## Step 1: Read the before snapshots

- `agents/output/schools-before.ts` — schools data before the pipeline ran
- `agents/output/programs-before.ts` — programs data before the pipeline ran

Count:
- Number of schools before (count entries in the schools array)
- Number of programs before (count entries in the programs array)
- Schools per region before

## Step 2: Read the current data

- `src/data/schools.ts` — schools data after merge
- `src/data/programs.ts` — programs data after merge

Count the same metrics for the current state.

## Step 3: Compute deltas

Calculate:
- Total new schools added
- Total new programs added
- New schools per region (US, UK, AU, HK, SG, CA)
- New programs per region
- New programs per category (business, cs, engineering, etc.)

## Step 4: Assess data quality

Check:
- How many QS Top 100 schools from each region are now covered vs. total in QS Top 100
- How many entries have `verified: false` (should be all new ones)
- Any schools with fewer than 5 programs (still incomplete)
- Any programs missing optional but important fields (tuitionFee, notes)

## Step 5: Write the report

Write to `agents/output/report.md`:

```markdown
# Agent Team Report: QS Top 100 Data Collection

**Run date:** YYYY-MM-DD HH:MM
**Duration:** (estimate from timestamps if visible)

## Summary

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Total schools | X | Y | +Z |
| Total programs | X | Y | +Z |

## By Region

| Region | Schools Before | Schools After | Programs Before | Programs After |
|--------|---------------|--------------|----------------|---------------|
| US | ... | ... | ... | ... |
| UK | ... | ... | ... | ... |
| AU | ... | ... | ... | ... |
| HK | ... | ... | ... | ... |
| SG | ... | ... | ... | ... |
| CA | ... | ... | ... | ... |

## By Category

| Category | New Programs |
|----------|-------------|
| business | ... |
| cs | ... |
| ... | ... |

## QS Top 100 Coverage

- US: X/Y covered (Z%)
- UK: X/Y covered (Z%)
- ... (for each region)

## Data Quality

- Entries needing verification: X
- Schools with < 5 programs: [list]
- Programs missing tuition fee: X
- Programs missing notes: X

## Recommendations

(List 3-5 actionable next steps, e.g., "Manually verify MIT GPA requirements", "Add more programs for Stanford")
```

## Rules

- Use actual numbers, not placeholders
- Be concise and factual
- The report should be useful for a human reviewing the pipeline output
