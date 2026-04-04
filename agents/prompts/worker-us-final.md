# Worker Agent: Final US Schools

You are a data collection worker. Research these US schools that are in the QS Top 100 but NOT yet in our database, and add them with their programs.

## Your Task

First, read `src/data/schools.ts` to confirm which of these schools are missing. Then research and create entries for them.

Expected missing schools (verify against database):
1. **Duke University** — QS ~25
2. **UC San Diego (UCSD)** — QS ~62
3. **University of Texas at Austin** — QS ~58
4. **Brown University** — QS ~73
5. **University of Wisconsin-Madison** — QS ~83
6. **Boston University** — QS ~93
7. **Rice University** — QS ~96

Some of these may already be in the database — skip any that already exist.

## Data Types Reference

Read `src/data/schools.ts` and `src/data/programs.ts` to see the exact TypeScript types (`School` and `Program`). You MUST match these types exactly.

Also read `src/data/majors.ts` to see valid `category` and `subMajorId` values.

## For Each Missing School

### 1. Create the School entry

```typescript
{
  id: "duke",  // lowercase, short, unique
  name: "杜克大学",
  nameEn: "Duke University",
  country: "US",
  qsRank: 25,
  ieltsMin: 7.0,
  toeflMin: 100,
  gpaRequirements: { preferred: 3.7, other: 3.5 },
  gpaScale: "gpa4",  // ALWAYS "gpa4" for US schools
  listPolicy: "open",
  preferredTiers: [],
  majorCategories: ["商科", "计算机", "工程", ...],
  extraRequirements: "GRE required for most programs",
  applicationFee: "US$95",
  notes: "...",
  source: "https://...",
}
```

### 2. Create Program entries (8-12 per school)

Use WebSearch to find each school's graduate programs. For each program:

```typescript
{
  id: "duke-mba",
  schoolId: "duke",
  name: "工商管理硕士",
  nameEn: "MBA",
  department: "Fuqua School of Business",
  category: "business",
  subMajorId: "mba",
  duration: "2 years",
  gpaRequirements: { preferred: 3.7, other: 3.5 },
  gpaScale: "gpa4",
  ieltsOverall: 7.0,
  toeflOverall: 100,
  requiresRelatedDegree: false,
  extraRequirements: "GMAT/GRE required",
  tuitionFee: "US$...",
  notes: "...",
  source: "https://...",
  verified: false,
}
```

## GPA Rules

- ALWAYS use `gpaScale: "gpa4"` for US schools
- If no official GPA minimum, use admitted student averages in `notes`

## Output

Write to TWO files:
1. `agents/output/worker1-schools.ts` — new School entries only
2. `agents/output/worker1-programs.ts` — Program entries for new schools

```typescript
// Final US schools
import type { School } from "../../src/data/schools";
export const worker1Schools: School[] = [ ... ];
```

```typescript
// Final US programs
import type { Program } from "../../src/data/programs";
export const worker1Programs: Program[] = [ ... ];
```

## Rules

- Every `source` MUST be a real URL
- Every entry MUST have `verified: false`
- Every entry MUST have `tuitionFee` filled in
- Do NOT write to any files outside `agents/output/`
- Cover at least: business, cs, engineering + 2 other categories per school
