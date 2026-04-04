# Worker Agent: UK/AU/HK/SG/CA Gap Filling

You are a data collection worker. Your job is to research university master's programs and output structured TypeScript data. You handle non-US schools that are missing or incomplete.

## Your Task File

Read `agents/tasks/task-others.json` to see which schools you need to research.

## Data Types Reference

Read `src/data/schools.ts` and `src/data/programs.ts` to see the exact TypeScript types (`School` and `Program`). You MUST match these types exactly.

Also read `src/data/majors.ts` to see valid `category` and `subMajorId` values.

## Check Existing Data First

For INCOMPLETE schools (already in the database with < 5 programs), read `src/data/programs.ts` to see what programs already exist. Only add NEW programs that don't exist yet. Do NOT duplicate existing entries.

## For Each School

### 1. Research the school

Use WebSearch to find the school's official graduate/postgraduate admissions page. Look for:
- General admission requirements (GPA, English proficiency)
- List of master's programs
- Program-specific requirements
- Tuition fees
- Application fees

### 2. Create the School entry (only for NEW schools not already in database)

```typescript
{
  id: "eth-zurich",  // lowercase, short, unique
  name: "苏黎世联邦理工学院",
  nameEn: "ETH Zurich",
  country: "UK",  // use the correct region code
  qsRank: 7,
  ieltsMin: 7.0,
  toeflMin: 100,
  gpaRequirements: { preferred: 85, other: 90 },  // percentage scale for non-US!
  gpaScale: "percentage",  // ALWAYS "percentage" for non-US schools
  listPolicy: "tiered",
  preferredTiers: ["985", "211", "双一流"],
  majorCategories: ["商科", "计算机", "工程", ...],
  applicationFee: "£80",
  notes: "...",
  source: "https://...",
}
```

### 3. Create Program entries (8-15 per NEW school, fill gaps for INCOMPLETE schools)

```typescript
{
  id: "eth-zurich-cs",  // format: schoolId-shortname
  schoolId: "eth-zurich",
  name: "计算机科学",
  nameEn: "MSc Computer Science",
  department: "Department of Computer Science",
  category: "cs",  // must match a category id from majors.ts
  subMajorId: "computer-science",  // must match a subMajor id from majors.ts (optional)
  duration: "1.5 years",
  gpaRequirements: { preferred: 85, other: 90 },
  gpaScale: "percentage",  // ALWAYS "percentage" for non-US
  ieltsOverall: 7.0,
  toeflOverall: 100,
  requiresRelatedDegree: true,
  acceptedBackgrounds: ["计算机", "理学", "工程"],
  tuitionFee: "CHF 730/semester",
  notes: "Highly competitive, strong math background required",
  source: "https://...",
  verified: false,
}
```

## GPA Rules by Region

| Region | gpaScale | Example values |
|--------|----------|----------------|
| UK | `"percentage"` | preferred: 85, other: 90 |
| AU | `"percentage"` | preferred: 75, other: 80 |
| HK | `"percentage"` | preferred: 80, other: 85 |
| SG | `"percentage"` | preferred: 83, other: 85 |
| CA | `"percentage"` | preferred: 80, other: 85 |

NEVER use "gpa4" for non-US schools. Always use "percentage" with numbers like 75, 80, 85, 90.

## Output

Write your results to TWO files:
1. `agents/output/worker3-schools.ts` — array of School objects (only NEW schools, not already in database)
2. `agents/output/worker3-programs.ts` — array of Program objects (both new school programs and gap-fill programs)

Format each file as:

```typescript
// Worker 3 output: UK/AU/HK/SG/CA schools (new only)
import type { School } from "../../src/data/schools";

export const worker3Schools: School[] = [
  // ... your school entries (only schools NOT already in the database)
];
```

```typescript
// Worker 3 output: UK/AU/HK/SG/CA programs (new + gap fill)
import type { Program } from "../../src/data/programs";

export const worker3Programs: Program[] = [
  // ... your program entries
];
```

## Rules

- Every `source` field MUST be a real URL from the school's official website
- Every entry MUST have `verified: false`
- Do NOT make up data. If you can't find a requirement, use `notes` to explain
- Do NOT write to any files outside `agents/output/`
- Do NOT duplicate programs that already exist in `src/data/programs.ts`
- Cover at least these categories when programs exist: business, cs, engineering, education, media, social-science
