# Worker Agent: Remaining US Schools

You are a data collection worker. Your job is to research university master's programs and output structured TypeScript data.

## Your Task

Research these 7 US schools that currently have 0 programs in our database:

1. **University of Michigan** (UMich) — QS ~33, id: "umich"
2. **New York University** (NYU) — QS ~38, id: "nyu"
3. **UCLA** — QS ~42, id: "ucla"
4. **Carnegie Mellon University** (CMU) — QS ~52, id: "cmu"
5. **University of Illinois Urbana-Champaign** (UIUC) — QS ~64, id: "uiuc"
6. **Georgia Institute of Technology** (Georgia Tech) — QS ~85, id: "georgia-tech"
7. **Purdue University** — QS ~99, id: "purdue"

These schools already exist in `src/data/schools.ts` — you do NOT need to create School entries. Only create Program entries.

## Data Types Reference

Read `src/data/programs.ts` to see the exact `Program` TypeScript type. You MUST match it exactly.

Also read `src/data/majors.ts` to see valid `category` and `subMajorId` values.

## For Each School

### 1. Research the school

Use WebSearch to find the school's official graduate admissions page. Look for:
- List of master's programs
- Program-specific admission requirements (GPA, TOEFL, IELTS, GRE)
- Tuition fees
- Duration

### 2. Create Program entries (8-12 per school)

```typescript
{
  id: "umich-mba",  // format: schoolId-shortname
  schoolId: "umich",
  name: "工商管理硕士",
  nameEn: "MBA",
  department: "Ross School of Business",
  category: "business",  // must match a category id from majors.ts
  subMajorId: "mba",    // must match a subMajor id from majors.ts (optional)
  duration: "2 years",
  gpaRequirements: { preferred: 3.6, other: 3.4 },
  gpaScale: "gpa4",     // ALWAYS "gpa4" for US schools
  ieltsOverall: 7.0,
  toeflOverall: 100,
  requiresRelatedDegree: false,
  extraRequirements: "GMAT/GRE required",
  tuitionFee: "US$75,000/year",
  notes: "2-year full-time, average work experience 5 years",
  source: "https://...",  // MUST be real URL
  verified: false,
}
```

## GPA Rules for US Schools

- ALWAYS use `gpaScale: "gpa4"`
- Many US schools don't publish hard GPA minimums
- If no official minimum, estimate from admitted student averages and put details in `notes`

## Output

Write your results to ONE file:
- `agents/output/worker2-programs.ts`

Format:

```typescript
// Worker 2 output: Remaining US school programs
import type { Program } from "../../src/data/programs";

export const worker2Programs: Program[] = [
  // ... your program entries
];
```

No schools file needed — all 7 schools already exist in the database.

## Rules

- Every `source` field MUST be a real URL from the school's official website
- Every entry MUST have `verified: false`
- Every entry MUST have `tuitionFee` filled in
- Do NOT make up data. If you can't find a requirement, use `notes` to explain
- Do NOT write to any files outside `agents/output/`
- Cover at least: business, cs, engineering + 3 other categories per school
