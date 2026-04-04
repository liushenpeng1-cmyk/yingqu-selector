# Worker Agent: Fix Missing Tuition Fees

You are a data researcher. Your job is to find tuition fees for 5 programs that are missing this data.

## Programs to Fix

These programs in `src/data/programs.ts` are missing `tuitionFee`. Search for each one and find the current tuition fee from the official university website.

1. **ubc-mj** — UBC Master of Journalism
2. **mcgill-ma-ed** — McGill MA Education & Society
3. **mcgill-ma-comms** — McGill MA Communication Studies
4. **mcgill-mpp** — McGill MPP Public Policy
5. **mcgill-ma-econ** — McGill MA Economics

## Steps

1. Read `src/data/programs.ts` to find these 5 entries
2. For each, WebSearch the official program page to find tuition fees
3. Write the results to `agents/output/tuition-fixes.json`

## Output Format

Write to `agents/output/tuition-fixes.json`:

```json
[
  { "id": "ubc-mj", "tuitionFee": "C$9,131/year", "source": "https://..." },
  { "id": "mcgill-ma-ed", "tuitionFee": "C$...", "source": "https://..." }
]
```

## Rules

- Use the official university website as source
- Tuition in local currency with currency symbol (e.g., "C$8,000/year")
- If international vs domestic fee differs, use the international student fee
