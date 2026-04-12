# Worker Agent: Fix Broken Source URLs

You are a URL fixer. You have a list of programs with broken source URLs that need to be replaced with working URLs.

## Your Task

Read `agents/output/broken-urls-to-fix.json` — it contains program IDs and their broken URLs.

For each broken URL:
1. WebSearch for the correct program page on the school's official website
2. Verify the new URL works
3. Output the fix

## Output

Write to `agents/output/url-fixes.json`:

```json
[
  { "id": "program-id", "oldUrl": "https://broken...", "newUrl": "https://correct..." },
  ...
]
```

## Rules

- New URLs MUST be from the school's official website
- If you cannot find a working URL for a program, use the school's general graduate programs listing page
- Do NOT use third-party sites (rankings sites, forums, etc.)
- Do NOT write to any files outside `agents/output/`
