# yingqu-selector ⇄ i-offer.ai 对接规范

**Version**: 1.1
**Last Updated**: 2026-04-13
**Live Source**: `src/lib/referral.ts`
**yingqu 线上**: https://yingqu-selector.vercel.app
**ioffer 接收端**: https://student.i-offer.ai/

---

## 0. 一张图看懂

```
┌─────────────────────────┐        ┌──────────────────────────┐
│ yingqu-selector         │  jump  │ student.i-offer.ai       │
│ 抖音/小红书自然流量      │ ─────▶ │ 接住 ref=yingqu 归因       │
│ 用户填完表单选好学校/专业 │        │ (Phase 2: 预填申请表单)    │
└─────────────────────────┘        └──────────────────────────┘
        已上线 ✅                         Phase 1 立即可用 ✅
```

**零 API · 零 Webhook · 零共享数据库** — 整个协议只是一次 URL 跳转。

---

## 1. 合作分工

| | yingqu | i-offer |
|---|---|---|
| 流量来源 | ✅ 抖音/小红书/SEO | — |
| 用户选校/选专业 | ✅ 已上线 | ❌ 不做 |
| 收藏 + 批量意向 | ✅ 已上线 (localStorage) | ❌ 不做 |
| 归因接收 | ❌ | ✅ 识别 `ref=yingqu` |
| AI 文书/申请服务 | ❌ 不做 | ✅ 主营业务 |
| 收款 + 服务交付 | ❌ 不做 | ✅ 主营业务 |
| 转化数据报表 | ❌ | ✅ 每月给 yingqu 出漏斗 |

---

## 2. 落地 URL

```
https://student.i-offer.ai/?<query-params>
```

- 打开方式：`window.open(url, "_blank", "noopener,noreferrer")`
- yingqu 通过 `NEXT_PUBLIC_PARTNER_URL` 环境变量配置,如需调整只改 env,无需发版。
- **不要用 `dev.i-offer.ai`** — 那个会 302 跳到 `student.i-offer.ai`,多一跳会丢 referrer 且 Safari 可能拦 cookie。

---

## 3. 两阶段上线

yingqu 侧有个 `NEXT_PUBLIC_PARTNER_MODE` 开关,控制发送信息的详细程度:

| 模式 | 发送的 query 参数 | 启用时机 | 是否当前启用 |
|---|---|---|---|
| **`simple`** | `ref=yingqu&utm_source=yingqu&utm_medium=referral` | 现在。只归因,不预填 | ✅ **当前生产** |
| **`full`** | 完整 payload（见 §4） | ioffer 端 `/apply` 或预填逻辑就绪后 | ⏳ 待 ioffer 通知 |

**关键点**：Phase 1 你们什么都不用改代码就能开始收流量 + 做归因统计。Phase 2 是 UX 升级（省用户 30 秒填表）,你们好了通知 yingqu,我们翻一下 env var 就切,不需要你们重新部署。

---

## 4. Full 模式完整参数表（Phase 2 用）

### 4.1 必带字段

| Key | Type | 示例 | 说明 |
|---|---|---|---|
| `ref` | string | `"yingqu"` | **归因 key,首要校验** |
| `utm_source` | string | `"yingqu"` | 标准 UTM,GA/Posthog 等自动识别 |
| `utm_medium` | string | `"referral"` | 同上 |
| `target` | enum | `"ug"` \| `"pg"` | 本科 or 硕士 |
| `schoolIds` | JSON[] | `%5B%22oxford%22%5D` | 学校 ID 列表（用户选中/收藏的） |
| `regions` | JSON[] | `%5B%22UK%22%5D` | 目标地区代码 |

### 4.2 按需带字段

| 场景 | 字段 | 说明 |
|---|---|---|
| 用户收藏到专业级 | `programIds` (JSON[]) | 如 `["ox-ug-cs","cam-ug-maths"]` |
| 用户填了语言成绩 | `lang` / `langScore` | `"IELTS"` / `"7.0"` |
| 英语国家豁免 | `langExempt` | `"1"` / `"0"` |
| 硕士 tab | `gpa` / `gpaScale` / `userTier` / `currentCategoryId` / `targetSubMajorId` / `ukClassification` / `auClassification` / `isOverseasUndergrad` / `isJointUniversity` / `jointUniType` | 详见 4.3 |
| 本科 tab | `curriculum` / `alevelGrades` / `ibScore` / `gaokaoScore` / `gaokaoTotal` / `subjectArea` | 详见 4.4 |

### 4.3 硕士（`target=pg`）

| Key | Type | 示例 |
|---|---|---|
| `gpa` | string | `"3.8"` or `"85"` |
| `gpaScale` | enum | `"gpa4"` \| `"percentage"` |
| `userTier` | string | `"985"` \| `"211"` \| `"双一流"` \| `"双非"` \| `"overseas"` |
| `currentCategoryId` | string | `"business"` (学生本科专业类别) |
| `targetSubMajorId` | string | `"management"` (目标硕士专业) |
| `ukClassification` | enum | `"first"` \| `"2:1"` \| `"2:2"` |
| `auClassification` | enum | `"hd"` \| `"d"` \| `"c"` \| `"p"` |
| `isOverseasUndergrad` | bool | `"1"` \| `"0"` |
| `isJointUniversity` | bool | `"1"` \| `"0"` (XJTLU/UNNC/NYU Shanghai/DKU 等) |
| `jointUniType` | enum | `"uk-partner"` \| `"us-partner"` \| `"hk-partner"` |

### 4.4 本科（`target=ug`）

| Key | Type | 示例 |
|---|---|---|
| `curriculum` | enum | `"alevel"` \| `"ib"` \| `"gaokao"` |
| `alevelGrades` | JSON[] | `[{"subject":"Math","grade":"A*"},{"subject":"Physics","grade":"A"}]` |
| `ibScore` | string | `"42"` (满分 45) |
| `gaokaoScore` | string | `"650"` |
| `gaokaoTotal` | string | `"750"` |
| `subjectArea` | string | `"economics"` |

### 4.5 编码规则（重要）

- 标量字符串/数字 → `encodeURIComponent(value)`
- 布尔 → `"1"` / `"0"`（**不是** `"true"`/`"false"`）
- 数组和嵌套对象 → `encodeURIComponent(JSON.stringify(value))`
- 空值 / undefined → 该 key 完全不出现（不会以空字符串形式出现）

---

## 5. 参考解析代码（TypeScript）

直接 drop 进 `/apply` 或任意页面的初始化逻辑:

```ts
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

export function parseYingqu(search: string): YingquPayload | null {
  const p = new URLSearchParams(search);
  if (p.get("ref") !== "yingqu") return null;   // 归因守卫

  const out: Record<string, unknown> = { ref: "yingqu" };
  for (const [k, v] of p.entries()) {
    if (k === "ref") continue;
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

// 使用示例(React client component / Next.js app router):
// const payload = parseYingqu(window.location.search);
// if (payload) prefillForm(payload);
```

---

## 6. 归因 & 分析（Phase 1 就需要）

### 6.1 必做

1. 用户落地时把 `ref=yingqu` 写入 `sessionStorage` + 30 天 cookie,页面跳转不丢。
2. 下游事件（注册/付费/开通订阅）打点时带 `source: "yingqu"` 或等价字段到你们的分析管道。
3. 每月给 yingqu 一份 **`ref=yingqu` 的漏斗**（曝光 → 注册 → 付费）,用于分成结算。

### 6.2 防作弊

- 校验 HTTP `Referer` header 包含 `yingqu-selector.vercel.app`
- 不匹配的流量仍然接收,但打 `unverified_referer` 标签,结算时过滤

### 6.3 UTM 集成

`utm_source=yingqu&utm_medium=referral` 是标准 UTM,GA4 / Posthog / Mixpanel / Plausible **全部自动识别**,不用写代码就能看到来源仪表盘。

---

## 7. E2E 联调清单（Phase 2 启用前跑一遍）

| # | 场景 | 预期看到的 query key | 预期 UI |
|---|---|---|---|
| 1 | 硕士 · 单校申请 | `ref`, `target=pg`, `schoolIds=["oxford"]`, `gpa`, `lang`, `langScore`, `regions`, 学生背景 | Oxford 预选 + GPA/IELTS 已填 |
| 2 | 本科 · 单专业申请 | `ref`, `target=ug`, `schoolIds=["ucl"]`, `programIds=["ucl-ug-cs"]`, `curriculum`, `alevelGrades` | UCL CS 预选 + A-Level 成绩已填 |
| 3 | 批量收藏（跨学校） | `programIds` ≥ 2 条,覆盖 ≥ 2 所学校 | 多项申请流程一次填完 |
| 4 | 伪造/删掉 `ref` | 无 `ref=yingqu` | **不预填、不计归因、不影响正常访问** |

ioffer 端 `/apply`（或其他指定入口）写好后通知 yingqu,约 30 分钟联调跑完这 4 条。

---

## 8. 版本管理

- 当前 v1.1（无 `v` 参数,即视为 ≤ v1）
- 破坏性变更会引入 `v=2` 等,解析时先读 `v`,未知版本仅显示基础归因页
- 新增可选字段不视为破坏性变更,不会升版本号

---

## 9. 不做的事（明确边界）

- ❌ yingqu 不发 webhook
- ❌ yingqu 不调用 ioffer 的 API
- ❌ yingqu **不传** 用户 PII（邮箱/手机/姓名） — 这些我们没收集
- ❌ 不共享数据库 / session
- ❌ 每次点击都是新 URL,用户返回再点等价于全新跳转

---

## 10. 商业/结算（技术对齐的关键点）

1. 结算基于 **`ref=yingqu` 的付费转化**,不按点击付费
2. ioffer 每月提供漏斗报表,双方各自在自己侧也留数据对账
3. yingqu 侧可观察「跳转点击数」,ioffer 侧观察「落地 session 数」,差异应 >90% 吻合
4. yingqu 保留**随时切流量/切合作方**的能力（只是改一个 env var）

具体分成比例单独聊,不在本技术文档范围。

---

## 附录 A — 完整 Full 模式 URL 示例

**可读版（decoded）**:

```
https://student.i-offer.ai/
  ?ref=yingqu
  &utm_source=yingqu
  &utm_medium=referral
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

**实际传输格式（encoded）**:

```
https://student.i-offer.ai/?ref=yingqu&utm_source=yingqu&utm_medium=referral&target=pg&schoolIds=%5B%22oxford%22%2C%22cambridge%22%2C%22ucl%22%5D&programIds=%5B%22ox-ug-cs%22%2C%22cam-ug-maths%22%2C%22ucl-ug-economics%22%5D&regions=%5B%22UK%22%5D&lang=IELTS&langScore=7.5&gpa=3.85&gpaScale=gpa4&userTier=211&currentCategoryId=engineering&targetSubMajorId=cs-ai
```

---

## 附录 B — Simple 模式 URL（当前 Phase 1）

这是**现在线上每次点击都在发的**格式,最精简:

```
https://student.i-offer.ai/?ref=yingqu&utm_source=yingqu&utm_medium=referral
```

就三个参数。你们现在只需要保证：
1. 这个 URL 能正常打开（已验证 HTTP 200 ✅）
2. 分析工具里能按 `utm_source=yingqu` 过滤出来

---

## 附录 C — ID 参考

- **学校列表**（~145 所，覆盖 UK/US/AU/CA/NZ/HK/SG/IE/NL/JP/KR 等）
- **项目列表**（~2100 本科 + ~2200 硕士）
- ID 稳定,变更提前 30 天通知
- 源代码: https://github.com/liushenpeng1-cmyk/yingqu-selector/blob/main/src/data/schools.ts

---

## 11. 联系

- yingqu 技术对接：[caleb] — 1 个工作日内响应
- 文档 / 代码实现参考：https://github.com/liushenpeng1-cmyk/yingqu-selector
  - 打包逻辑：`src/lib/referral.ts`
  - 收藏夹逻辑：`src/lib/favorites.ts`
  - 前端挂载点：`src/app/page.tsx`

---

**快速启动清单（给 ioffer 工程师 5 分钟自查）**

- [ ] 打开 https://student.i-offer.ai/?ref=yingqu&utm_source=yingqu&utm_medium=referral,确认 HTTP 200 ✅
- [ ] 在分析工具建立 `utm_source=yingqu` 仪表盘（Phase 1 收归因流量够用）
- [ ] （可选,Phase 2 再做）实现 `parseYingqu()` 函数和表单预填
- [ ] （可选,Phase 2 再做）联调 §7 的 4 个 E2E 场景
- [ ] 通知 yingqu：Phase 2 何时切换
