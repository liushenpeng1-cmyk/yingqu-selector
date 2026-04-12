# yingqu-selector → Partner Integration Spec

**Version**: 1.0
**Last Updated**: 2026-04-13
**Source Implementation**: `src/lib/referral.ts`
**Demo URL**: https://yingqu-selector.vercel.app

---

## 1. What This Document Is

yingqu-selector is a Chinese study-abroad school matcher. When a user finishes filtering and decides to apply, we package their inputs + chosen school(s)/program(s) into URL query parameters and open your landing page in a new tab.

**Your job**: Receive these params on `/apply` (or similar), prefill your application form, and attribute the session to `ref=yingqu` for revenue tracking.

**Our job**: Route the user to you with all fields populated. Nothing else.

No backend integration. No API keys. No webhooks needed for MVP.

### Two-phase rollout

We support two traffic modes controlled by a single env var on our side (`NEXT_PUBLIC_PARTNER_MODE`):

| Mode | Query sent | When to use |
|---|---|---|
| **`simple`** (current default) | `ref=yingqu&utm_source=yingqu&utm_medium=referral` only | Launch day. We start sending you users immediately. You only need a homepage that records `ref=yingqu` in analytics — no `/apply` endpoint required. |
| **`full`** | Full payload per §3 schema | After you finish the `/apply` endpoint and pass the §6 test matrix. We flip the env var; all future button clicks send the full prefill payload. |

You do not need to block your own launch on the full mode — simple mode already attributes revenue correctly via `ref=yingqu`. Full mode is a UX upgrade (prefill saves the user ~30 seconds of typing) that goes live when you're ready.

---

## 2. Landing URL

```
{YOUR_BASE_URL}?<query-params>
```

We will configure `YOUR_BASE_URL` in our Vercel environment once you confirm the path. Recommended: `https://ioffer.ai/apply`.

**Opened via** `window.open(url, "_blank", "noopener,noreferrer")`.

---

## 3. Query Parameter Schema

### 3.1 Always Present

| Key | Type | Example | Notes |
|---|---|---|---|
| `ref` | string | `"yingqu"` | **Attribution key.** Verify its presence before prefill. |
| `target` | enum | `"ug"` \| `"pg"` | Undergrad vs postgrad |
| `schoolIds` | JSON array | `%5B%22oxford%22%2C%22cambridge%22%5D` | School IDs (stable, lowercase) |
| `regions` | JSON array | `%5B%22UK%22%2C%22US%22%5D` | ISO-like region codes |

**All array values are `JSON.stringify`'d then `encodeURIComponent`'d.** Example raw value:

```
schoolIds=%5B%22oxford%22%2C%22cambridge%22%5D
```

After `decodeURIComponent` + `JSON.parse` you get `["oxford", "cambridge"]`.

### 3.2 Conditionally Present

#### Specific programs (when user favorited individual programs)

| Key | Type | Example |
|---|---|---|
| `programIds` | JSON array | `["ox-ug-cs", "cam-ug-maths"]` |

If user clicks "Apply to this school" (not a specific program), we send the full list of matched programs at that school.

#### Language test (always present if user filled in)

| Key | Type | Example |
|---|---|---|
| `lang` | enum | `"IELTS"` \| `"TOEFL"` |
| `langScore` | string | `"7.0"` |
| `langExempt` | `"1"` \| `"0"` | Bool encoded as 1/0 |

#### Postgrad only (`target=pg`)

| Key | Type | Example |
|---|---|---|
| `gpa` | string | `"3.8"` or `"85"` |
| `gpaScale` | enum | `"gpa4"` \| `"percentage"` |
| `userTier` | string | `"985"` \| `"211"` \| `"双一流"` \| `"双非"` \| `"overseas"` |
| `currentCategoryId` | string | `"business"` (student's undergrad field) |
| `targetSubMajorId` | string | `"management"` (desired postgrad program) |
| `ukClassification` | enum | `"first"` \| `"2:1"` \| `"2:2"` |
| `auClassification` | enum | `"hd"` \| `"d"` \| `"c"` \| `"p"` |
| `isOverseasUndergrad` | `"1"` \| `"0"` | |
| `isJointUniversity` | `"1"` \| `"0"` | Student from XJTLU/UNNC/NYU Shanghai etc. |
| `jointUniType` | enum | `"uk-partner"` \| `"us-partner"` \| `"hk-partner"` |

#### Undergrad only (`target=ug`)

| Key | Type | Example |
|---|---|---|
| `curriculum` | enum | `"alevel"` \| `"ib"` \| `"gaokao"` |
| `alevelGrades` | JSON array | `[{"subject":"Mathematics","grade":"A*"},{"subject":"Physics","grade":"A"}]` |
| `ibScore` | string | `"42"` (out of 45) |
| `gaokaoScore` | string | `"650"` |
| `gaokaoTotal` | string | `"750"` |
| `subjectArea` | string | `"economics"` (target subject) |

### 3.3 Encoding Rules Summary

- **Scalar strings / numbers**: `encodeURIComponent(value)` only
- **Booleans**: `"1"` or `"0"` (not `"true"`/`"false"`)
- **Arrays & nested objects**: `encodeURIComponent(JSON.stringify(value))`
- **Empty / undefined**: key omitted entirely (do not expect empty-string values)

---

## 4. Reference Parser (TypeScript)

Drop this into your `/apply` page. It handles all encoding edge cases.

```ts
// app/apply/parse-yingqu.ts
export type YingquPayload = {
  ref: string;
  target?: "ug" | "pg";
  schoolIds: string[];
  programIds?: string[];
  regions?: string[];
  lang?: "IELTS" | "TOEFL";
  langScore?: string;
  langExempt?: boolean;
  gpa?: string;
  gpaScale?: "gpa4" | "percentage";
  userTier?: string;
  currentCategoryId?: string;
  targetSubMajorId?: string;
  ukClassification?: string;
  auClassification?: string;
  isOverseasUndergrad?: boolean;
  isJointUniversity?: boolean;
  jointUniType?: string;
  curriculum?: "alevel" | "ib" | "gaokao";
  alevelGrades?: { subject: string; grade: string }[];
  ibScore?: string;
  gaokaoScore?: string;
  gaokaoTotal?: string;
  subjectArea?: string;
};

const ARRAY_KEYS = new Set([
  "schoolIds", "programIds", "regions", "alevelGrades",
]);
const BOOL_KEYS = new Set([
  "langExempt", "isOverseasUndergrad", "isJointUniversity",
]);

export function parseYingquParams(search: string): YingquPayload | null {
  const p = new URLSearchParams(search);
  const ref = p.get("ref");
  if (ref !== "yingqu") return null;              // attribution guard

  const out: Record<string, unknown> = { ref };
  for (const [k, v] of p.entries()) {
    if (ARRAY_KEYS.has(k)) {
      try { out[k] = JSON.parse(v); } catch { /* skip malformed */ }
    } else if (BOOL_KEYS.has(k)) {
      out[k] = v === "1";
    } else {
      out[k] = v;
    }
  }
  return out as YingquPayload;
}

// Usage (Next.js client component):
// const payload = parseYingquParams(window.location.search);
// if (payload) prefillForm(payload);
```

---

## 5. Attribution & Analytics

### What we need from you

1. **Persist `ref=yingqu`** the moment the user lands. Store in `sessionStorage` + a 30-day cookie. Do not drop it on page navigation.
2. **Tag every downstream event** (signup, payment, subscription) with `source: "yingqu"` in your analytics pipeline.
3. **Monthly report to us**: count of sessions, signups, paid conversions broken down by `ref=yingqu`. Required for revenue share reconciliation.

### Fraud guard (lightweight)

Verify the `Referer` header contains `yingqu-selector.vercel.app` (or the domain we eventually use). If it's missing or from another origin, still accept the params but flag the session as `unverified_referer`. Pure client-side, no need for us to sign anything for MVP.

---

## 6. End-to-End Test Matrix

Both teams walk through these 4 scenarios before marking integration "done":

| # | Scenario | Expected query keys present | Expected prefill |
|---|---|---|---|
| 1 | PG, single school | `ref`, `target=pg`, `schoolIds=["oxford"]`, `gpa`, `lang`, `langScore`, `regions` | Oxford preselected + GPA/IELTS filled |
| 2 | UG, single program | `ref`, `target=ug`, `schoolIds=["ucl"]`, `programIds=["ucl-ug-cs"]`, `curriculum`, `alevelGrades` | UCL + CS program preselected + A-Levels filled |
| 3 | Batch (favorites) | `programIds` with ≥2 entries from ≥2 different schools | All programs visible in a multi-apply flow |
| 4 | Malformed | Remove `ref=yingqu` manually | Your page should NOT prefill and should NOT count toward attribution |

We will share our staging URL and coordinate a 30-minute joint smoke test before production cutover.

---

## 7. Versioning

- Current version: **1.0** (implicit — no `v` param sent)
- Breaking schema changes will add `v=2` etc. Parse `v` first; if unknown, show a generic landing page asking the user to refresh.
- Backward-compatible additions (new optional keys) do not require version bump.

---

## 8. What NOT to Expect

- **No webhooks from us.** We do not track your conversions; you report them to us.
- **No API calls.** The entire handshake is a single URL.
- **No PII beyond what the user explicitly filled.** We never send phone numbers, emails, or names (we don't collect them).
- **No persistent session.** Each click is a fresh URL; if the user bounces back to yingqu and re-clicks, they get a new payload.

---

## 9. Contact

- **Technical questions**: @caleb (yingqu-selector maintainer) — replies within 1 business day.
- **Implementation PRs / examples**: share your test endpoint and we'll validate from our side.
- **Commercial terms**: separate track, not in this document.

---

## Appendix A — Full URL Example

Decoded for readability:

```
https://ioffer.ai/apply
  ?ref=yingqu
  &target=pg
  &schoolIds=["oxford","cambridge","ucl"]
  &programIds=["ox-ug-cs","cam-ug-maths","ucl-ug-economics"]
  &regions=["UK"]
  &lang=IELTS
  &langScore=7.5
  &gpa=3.85
  &gpaScale=gpa4
  &userTier=211
  &currentCategoryId=engineering
  &targetSubMajorId=cs-ai
```

Actual wire format (array values encoded):

```
https://ioffer.ai/apply?ref=yingqu&target=pg&schoolIds=%5B%22oxford%22%2C%22cambridge%22%2C%22ucl%22%5D&programIds=%5B%22ox-ug-cs%22%2C%22cam-ug-maths%22%2C%22ucl-ug-economics%22%5D&regions=%5B%22UK%22%5D&lang=IELTS&langScore=7.5&gpa=3.85&gpaScale=gpa4&userTier=211&currentCategoryId=engineering&targetSubMajorId=cs-ai
```

## Appendix B — Stable ID References

- **Full school list** (151 schools): https://yingqu-selector.vercel.app + inspect `schoolIds` in any referral URL
- **Program list** (~4,300 programs across UG/PG): same source
- IDs are stable. We commit to not renaming without 30 days notice.
