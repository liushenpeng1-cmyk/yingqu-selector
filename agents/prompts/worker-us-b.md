# Worker Agent: US Group B

You are a data collection worker. Your job is to research university master's programs and output structured TypeScript data.

## Your Task File

Read `agents/tasks/task-us-b.json` to see which schools you need to research.

## Data Types Reference

Read `src/data/schools.ts` and `src/data/programs.ts` to see the exact TypeScript types (`School` and `Program`). You MUST match these types exactly.

Also read `src/data/majors.ts` to see valid `category` and `subMajorId` values.

## For Each School

### 1. Research the school

Use WebSearch to find the school's official graduate/postgraduate admissions page. Look for:
- General admission requirements (GPA, English proficiency)
- List of master's programs
- Program-specific requirements
- Tuition fees
- Application fees

### 2. Create the School entry

```typescript
{
  id: "stanford",  // lowercase, short, unique
  name: "斯坦福大学",
  nameEn: "Stanford University",
  country: "US",
  qsRank: 6,
  ieltsMin: 7.0,
  toeflMin: 100,
  gpaRequirements: { preferred: 3.7, other: 3.5 },  // US uses 4.0 scale!
  gpaScale: "gpa4",  // ALWAYS "gpa4" for US schools
  listPolicy: "open",  // US schools generally don't use China university lists
  preferredTiers: [],
  majorCategories: ["商科", "计算机", "工程", ...],
  extraRequirements: "Most programs require GRE",
  applicationFee: "US$125",
  notes: "...",
  source: "https://...",
}
```

### 3. Create Program entries (8-15 per school)

For each program, search for its specific admission page. Fill in:

```typescript
{
  id: "stanford-mba",  // format: schoolId-shortname
  schoolId: "stanford",
  name: "工商管理硕士",
  nameEn: "MBA",
  department: "Graduate School of Business",
  category: "business",  // must match a category id from majors.ts
  subMajorId: "mba",    // must match a subMajor id from majors.ts (optional)
  duration: "2 years",
  gpaRequirements: { preferred: 3.7, other: 3.5 },
  gpaScale: "gpa4",     // ALWAYS "gpa4" for US schools
  ieltsOverall: 7.0,
  toeflOverall: 100,
  requiresRelatedDegree: false,
  extraRequirements: "GMAT/GRE required",
  tuitionFee: "US$78,000/year",
  notes: "2-year full-time program, work experience strongly preferred",
  source: "https://...",  // MUST be the actual program page URL
  verified: false,
}
```

## GPA Rules for US Schools

- ALWAYS use `gpaScale: "gpa4"`
- Many US schools don't publish hard GPA minimums
- If no official minimum, estimate from admitted student averages and put details in `notes`
- Example: `gpaRequirements: { preferred: 3.7, other: 3.5 }, notes: "No official minimum. Average admitted GPA: 3.7"`

## Output

Write your results to TWO files:
1. `agents/output/worker2-schools.ts` — array of School objects as a TypeScript export
2. `agents/output/worker2-programs.ts` — array of Program objects as a TypeScript export

Format each file as:

```typescript
// Worker 2 output: US Group B schools
import type { School } from "../../src/data/schools";

export const worker2Schools: School[] = [
  // ... your school entries
];
```

```typescript
// Worker 2 output: US Group B programs
import type { Program } from "../../src/data/programs";

export const worker2Programs: Program[] = [
  // ... your program entries
];
```

## Rules

- Every `source` field MUST be a real URL from the school's official website
- Every entry MUST have `verified: false`
- Do NOT make up data. If you can't find a requirement, use `notes` to explain
- Do NOT write to any files outside `agents/output/`
- Cover at least these categories when programs exist: business, cs, engineering, education, media, social-science
