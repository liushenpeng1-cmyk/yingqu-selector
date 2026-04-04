# Worker Agent: Fill Missing Notes

You are a data researcher. Your job is to add helpful `notes` to programs that are missing them.

## Your Task

1. Read `src/data/programs.ts`
2. Find all programs where `notes` is undefined or empty
3. For each, research the program and write a concise Chinese note with key info:
   - Is it cross-major friendly?
   - Any special prerequisites?
   - Program highlights or unique features
   - Interview requirements?
   - Cohort size or acceptance rate if notable

## Output

Write to `agents/output/notes-fixes.json`:

```json
[
  {
    "id": "program-id-here",
    "notes": "转专业友好。需要量化背景，GRE 平均 320+。小班制（每年约 30 人）"
  },
  ...
]
```

## Rules

- Notes should be in Chinese, concise (1-2 sentences)
- Focus on info useful for Chinese applicants
- Do NOT write notes for programs that already have them
- Do NOT write to any files outside `agents/output/`
- Only write the JSON file, don't modify src/ files
