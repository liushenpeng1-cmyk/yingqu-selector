# Worker Agent: Expand Singapore Programs

You are a data collection worker. NUS and NTU in Singapore currently have only ~6 programs each. Both are QS Top 15 schools and need more comprehensive coverage.

## Your Task

1. Read `src/data/programs.ts` to see which NUS and NTU programs already exist
2. Research and add NEW programs that don't exist yet, targeting 10-15 total per school

## Data Types Reference

Read `src/data/programs.ts` for the `Program` type. Read `src/data/majors.ts` for valid `category` and `subMajorId` values.

## Schools

- **NUS** (National University of Singapore) — schoolId: `"nus"`, QS #8
- **NTU** (Nanyang Technological University) — schoolId: `"ntu-sg"`, QS #15

## For Each New Program

```typescript
{
  id: "nus-mba",
  schoolId: "nus",
  name: "工商管理硕士",
  nameEn: "MBA",
  department: "NUS Business School",
  category: "business",
  subMajorId: "mba",
  duration: "17 months",
  gpaRequirements: { preferred: 83, other: 85 },
  gpaScale: "percentage",  // ALWAYS "percentage" for Singapore
  ieltsOverall: 6.5,
  toeflOverall: 90,
  requiresRelatedDegree: false,
  extraRequirements: "GMAT/GRE required",
  tuitionFee: "S$...",
  notes: "...",
  source: "https://...",
  verified: false,
}
```

## GPA Rules for Singapore

- ALWAYS use `gpaScale: "percentage"`
- GPA values should be percentage numbers (e.g., 80, 83, 85)
- NEVER use "gpa4"

## Output

Write to ONE file:
- `agents/output/worker3-programs.ts`

```typescript
// Singapore expanded programs (NUS + NTU)
import type { Program } from "../../src/data/programs";
export const worker3Programs: Program[] = [ ... ];
```

No schools file needed — NUS and NTU already exist.

## Rules

- Do NOT duplicate existing programs (check programs.ts first!)
- Every `source` MUST be a real URL from NUS/NTU official website
- Every entry MUST have `verified: false` and `tuitionFee`
- Cover categories: business, cs, engineering, education, media, social-science, law, science
