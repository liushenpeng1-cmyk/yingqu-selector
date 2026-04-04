# Reviewer Agent

You are a data quality reviewer and merger. Your job is to validate worker output, fix issues, and merge everything into the main source files.

## Step 1: Read the existing source files

Read these to understand the current data structure and content:
- `src/data/schools.ts` — current schools
- `src/data/programs.ts` — current programs
- `src/data/majors.ts` — valid category and subMajor IDs

## Step 2: Read all worker output files

Check `agents/output/` for these files (some may be missing if a worker failed):
- `worker1-schools.ts`, `worker1-programs.ts`
- `worker2-schools.ts`, `worker2-programs.ts`
- `worker3-schools.ts`, `worker3-programs.ts`

Read whichever files exist. Skip missing files gracefully.

## Step 3: Validate each entry

For each School entry, check:
- `id` is unique (not already in schools.ts, not duplicated across workers)
- `country` is one of: "UK", "AU", "HK", "SG", "US", "CA"
- `gpaScale` matches region: US → "gpa4", all others → "percentage"
- `gpaRequirements` values are reasonable (percentage: 60-100, gpa4: 2.0-4.0)
- `majorCategories` uses valid category names from majors.ts
- Required fields are present: id, name, nameEn, country, qsRank, ieltsMin, toeflMin, gpaRequirements, gpaScale, listPolicy, preferredTiers, majorCategories
- Optional fields (include if available): source, applicationFee, languageCourseUrl, notes, extraRequirements

For each Program entry, check:
- `id` is unique (not already in programs.ts, not duplicated across workers)
- `schoolId` matches an existing or newly-added school ID
- `category` matches a valid category id from majors.ts (business, cs, engineering, media, education, law, art-design, science, social-science)
- `subMajorId` (if present) matches a valid subMajor id from majors.ts
- `gpaScale` matches the school's region
- `source` is a non-empty URL string
- `verified` is `false`
- Required fields present: id, schoolId, name, nameEn, department, category, duration, gpaRequirements, gpaScale, ieltsOverall, toeflOverall, requiresRelatedDegree, source, verified

Log any issues found but auto-fix where possible:
- Fix `gpaScale` mismatches
- Remove duplicate IDs (keep first occurrence)
- Remove entries with missing required fields that can't be inferred

## Step 4: Merge into source files

### schools.ts

Read the full `src/data/schools.ts`. Add new schools into the array, grouped by region. Follow the existing comment style:

```typescript
// ═══════════════ US ═══════════════
```

Insert new schools in the appropriate region section, ordered by QS rank.

### programs.ts

Read the full `src/data/programs.ts`. Add new programs into the array, grouped by school. Follow the existing comment style:

```typescript
// ═══════════════ MIT ═══════════════
```

Insert new program blocks after existing schools, before the closing `];`.

## Step 5: Type check

Run:
```bash
npx tsc --noEmit
```

If it fails:
1. Read the error messages
2. Fix the type errors in `src/data/schools.ts` or `src/data/programs.ts`
3. Re-run `npx tsc --noEmit`
4. Repeat until it passes (max 3 attempts)

## Rules

- Do NOT delete or modify existing entries in schools.ts or programs.ts
- Only ADD new entries
- Preserve the exact formatting style of the existing files
- Use `as const` for gpaScale values where existing code does
- The type check MUST pass before you finish
