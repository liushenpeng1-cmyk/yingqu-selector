# yingqu-selector ⇄ i-offer.ai 对接规范

**Version**: 1.4
**Last Updated**: 2026-04-14
**yingqu 线上**: https://yingqu-selector.vercel.app
**ioffer 接收端**: https://student.i-offer.ai/
**源码**: https://github.com/liushenpeng1-cmyk/yingqu-selector/blob/main/src/lib/referral.ts

---

## 0. TL;DR

```
┌──────────────────────┐  GET + ?payload=<JSON>  ┌────────────────────────┐
│ yingqu-selector      │ ─────────────────────▶  │ student.i-offer.ai     │
│ 用户筛完/收藏/点击申请 │                          │ JSON.parse → My Schools │
└──────────────────────┘                          └────────────────────────┘
       已上线 ✅                                   Phase 1 生效中 / Phase 2 待接入
```

整个协议就是**一次 URL 跳转,数据装在 `payload=` 参数里的 JSON 字符串**。
无 API、无 webhook、无共享数据库。

---

## 1. 两阶段上线

yingqu 侧有个 `NEXT_PUBLIC_PARTNER_MODE` 开关,控制发送信息的详细程度:

| 模式 | URL 长什么样 | 适用时机 | 当前状态 |
|---|---|---|---|
| **`simple`** | `?ref=yingqu&utm_source=yingqu&utm_medium=referral` | Phase 1 — 立即归因,不传数据 | ✅ 生产默认 |
| **`full`** | 上面 + `&payload=<encoded JSON>` | Phase 2 — ioffer 解 JSON 写入 My Schools | ⏳ 待 ioffer 端预填逻辑就绪 |

**重要**:Phase 1 下你们只拿到 `ref`/`utm_*` 归因,不会收到 `payload`,代码按「URL 无 payload 则走常规流程」即可。一旦 yingqu 侧翻 env var 到 `full`,同一个着陆 URL 开始多一个 `payload` 参数,你们端就地启动预填即可。

---

## 2. JSON Payload Schema

### 2.1 顶层

```ts
type JsonPayload = {
  v: 1;                         // 版本号,破坏性变更升版
  ref: "yingqu";                // 归因识别
  generatedAt: string;          // ISO-8601 时间戳
  target: "ug" | "pg";          // 本科 or 硕士
  user: JsonUserProfile;        // 用户在 yingqu 已填资料
  schools: JsonSchoolEntry[];   // 用户选中/收藏的学校列表
};
```

### 2.2 用户画像 `user`

```ts
type JsonUserProfile = {
  // 共用
  lang?: "IELTS" | "TOEFL";
  langScore?: string;           // "7.0"
  langExempt?: boolean;         // 英语国家豁免
  regions?: string[];           // ["UK","HK"]

  // 硕士独有
  gpa?: string;                 // "3.85" 或 "85"
  gpaScale?: "gpa4" | "percentage";
  tier?: string;                // "985" | "211" | "双一流" | "双非" | "overseas"
  currentCategoryId?: string;   // 学生本科专业类别
  targetSubMajorId?: string;    // 目标硕士专业
  ukClassification?: "first" | "2:1" | "2:2";
  auClassification?: "hd" | "d" | "c" | "p";
  isOverseasUndergrad?: boolean;
  isJointUniversity?: boolean;
  jointUniType?: "uk-partner" | "us-partner" | "hk-partner";

  // 本科独有
  curriculum?: "alevel" | "ib" | "gaokao" | "ap";   // v1.4 新增 "ap"
  alevelGrades?: { subject: string; grade: string }[];
  apGrades?: { subject: string; score: string }[];  // v1.4 新增,AP 科目 + 1–5 分
  ibScore?: string;             // "42"
  gaokaoScore?: string;
  gaokaoTotal?: string;         // "750"
  subjectArea?: string;         // 如 "economics"
};
```

### 2.3 学校条目 `schools[i]`

```ts
type JsonSchoolEntry = {
  id: string;                   // yingqu 内部稳定 ID,如 "oxford"
  name: string;                 // 中文名
  nameEn: string;
  country: string;              // "UK" / "US" / "AU" 等
  qsRank?: number;
  programs: JsonProgramEntry[];
};
```

### 2.4 专业条目 `programs[i]`

```ts
type JsonProgramEntry = {
  id: string;                   // yingqu 稳定 ID,如 "ox-ug-cs"
  name: string;                 // 中文名
  nameEn: string;               // 英文名
  department?: string;          // 院系,可选
  matchLevel?: "high" | "medium" | "low" | "excluded";
  duration?: string;            // "3 years" 等
  tuitionFee?: string;          // "£39,010/year" 等
  source?: string;              // 官方 URL,便于对方 linkout 或核对
};
```

### 2.5 完整示例

```json
{
  "v": 1,
  "ref": "yingqu",
  "generatedAt": "2026-04-13T01:00:00.000Z",
  "target": "pg",
  "user": {
    "lang": "IELTS",
    "langScore": "7.0",
    "regions": ["UK", "HK"],
    "gpa": "3.85",
    "gpaScale": "gpa4",
    "tier": "985",
    "currentCategoryId": "engineering",
    "targetSubMajorId": "cs-ai",
    "isOverseasUndergrad": false,
    "isJointUniversity": false
  },
  "schools": [
    {
      "id": "oxford",
      "name": "牛津大学",
      "nameEn": "University of Oxford",
      "country": "UK",
      "qsRank": 3,
      "programs": [
        {
          "id": "ox-pg-cs",
          "name": "计算机科学 MSc",
          "nameEn": "MSc in Computer Science",
          "department": "Department of Computer Science",
          "matchLevel": "high",
          "duration": "1 year",
          "tuitionFee": "£39,010",
          "source": "https://www.ox.ac.uk/admissions/graduate/courses/msc-computer-science"
        }
      ]
    }
  ]
}
```

---

## 3. URL 格式

```
https://student.i-offer.ai/
  ?ref=yingqu
  &utm_source=yingqu
  &utm_medium=referral
  &payload=<encodeURIComponent(JSON.stringify(data))>
```

- 编码:**先 `JSON.stringify` 再 `encodeURIComponent`**,整个 JSON 字符串作为单个 query 参数
- 长度:典型 1–5KB(10 个学校 × 3 专业约 3-4KB),远低于浏览器 8KB 上限
- 极端情况:超过 30 所学校触发 `MAX_FAVORITES` 限制,不会超长
- 打开方式:`window.open(url, "_blank", "noopener,noreferrer")`

---

## 4. ioffer 侧实现（Jocelyn 这边要做的）

### 4.1 落地页（必须尽早存 payload!）

用户落地时 payload 还在 URL,但**点击注册会离开这个 URL**,必须第一时间存:

```ts
// 任意客户端初始化位置(例如 _app.tsx / layout.tsx)
(function captureYingquPayload() {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const raw = url.searchParams.get("payload");
    if (!raw) return;
    const data = JSON.parse(decodeURIComponent(raw));
    if (data?.ref !== "yingqu") return;   // 防伪造
    sessionStorage.setItem("yingquPayload", JSON.stringify(data));
    // 可选:UI 上显示 banner「已从 yingqu 导入 N 所学校,登录/注册后自动加入 My Schools」
  } catch {
    /* malformed payload, skip */
  }
})();
```

### 4.2 注册/登录成功后

```ts
async function importYingquOnAuth() {
  const raw = sessionStorage.getItem("yingquPayload");
  if (!raw) return;
  const data = JSON.parse(raw);
  // 调你们自己的后端,把学校列表和用户画像写入当前用户账号
  await fetch("/api/me/my-schools/import", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw,     // 直接原样转发
  });
  sessionStorage.removeItem("yingquPayload");
  // 跳到 My Schools 页面即可看到导入的列表
}
```

### 4.3 已登录用户

如果用户已登录 + 携带 payload 落地,可直接合并进 My Schools(按 `school.id` 去重),跳过注册。

### 4.4 去重建议

同一个 `school.id`(如 `"oxford"`)若已在 My Schools,建议:
- 合并 `programs` 数组,按 `program.id` 去重
- 保留用户已有的状态(如 "已申请" 标记)
- 新加入的专业默认状态 "草稿"

---

## 5. 归因

### 5.1 UTM

`utm_source=yingqu` + `utm_medium=referral` 是标准 UTM,GA4 / Posthog / Mixpanel / Plausible 等**自动识别**。无需代码。

### 5.2 全链路归因

在你们的转化漏斗打点时携带 `source: "yingqu"`:
- 落地
- 注册
- 付费
- 续订

每月用这个字段过滤,给 yingqu 一份漏斗报表,用于分成结算。

### 5.3 防作弊

- 落地时校验 `HTTP Referer` 包含 `yingqu-selector.vercel.app`;否则标 `unverified_referer`
- 校验 `payload.ref === "yingqu"` 再 import,防御 URL 篡改

---

## 6. 联调 checklist

| # | 场景 | yingqu 侧发出什么 | ioffer 侧应做什么 |
|---|---|---|---|
| 1 | 硕士 · 单校申请 | `payload.schools` 1 条,`programs` 为该校全部匹配专业 | 未登录 → 存 sessionStorage + 显示 banner |
| 2 | 本科 · 单专业申请 | `payload.schools[0].programs` 只含 1 条 | 同上,但 My Schools 只加这 1 专业 |
| 3 | 批量收藏(跨校) | `payload.schools.length >= 2` | 全部 import 到 My Schools |
| 4 | 已登录用户落地 | 同上 | 跳过注册直接合并 + 去重 |
| 5 | 伪造(改或删 `ref`) | `payload.ref !== "yingqu"` | 不 import,照常展示首页 |

建议我们先用 Phase 1 的 simple 模式跑一周产流量 + 归因,Phase 2 ioffer 端 OK 后约 30 分钟联调跑完 5 条。

---

## 7. 示例 Demo URL

Phase 2 模拟(可直接点):

```
https://student.i-offer.ai/?ref=yingqu&utm_source=yingqu&utm_medium=referral&payload=%7B%22v%22%3A1%2C%22ref%22%3A%22yingqu%22%2C%22generatedAt%22%3A%222026-04-13T01%3A00%3A00.000Z%22%2C%22target%22%3A%22pg%22%2C%22user%22%3A%7B%22lang%22%3A%22IELTS%22%2C%22langScore%22%3A%227.0%22%2C%22gpa%22%3A%223.85%22%2C%22gpaScale%22%3A%22gpa4%22%2C%22tier%22%3A%22985%22%2C%22regions%22%3A%5B%22UK%22%5D%7D%2C%22schools%22%3A%5B%7B%22id%22%3A%22oxford%22%2C%22name%22%3A%22%E7%89%9B%E6%B4%A5%E5%A4%A7%E5%AD%A6%22%2C%22nameEn%22%3A%22University%20of%20Oxford%22%2C%22country%22%3A%22UK%22%2C%22qsRank%22%3A3%2C%22programs%22%3A%5B%7B%22id%22%3A%22ox-pg-cs%22%2C%22name%22%3A%22%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6%20MSc%22%2C%22nameEn%22%3A%22MSc%20in%20Computer%20Science%22%2C%22matchLevel%22%3A%22high%22%7D%5D%7D%5D%7D
```

浏览器 console 跑一下:
```js
JSON.parse(decodeURIComponent(new URL(location.href).searchParams.get("payload")))
```
能看到完整对象,字段对齐 §2。

---

## 7.5 学校/专业目录对齐（重要）

你们那边如果想先把 yingqu 的学校/专业列表导入自己的库,做 ID 映射 —— yingqu 暴露两个只读 API,CORS 开放,直接 fetch 即可。

### 7.5.1 学校目录

```
GET https://yingqu-selector.vercel.app/api/catalog/schools
```

返回示例:
```json
{
  "version": 1,
  "generatedAt": "2026-04-13T01:30:00.000Z",
  "count": 194,
  "schools": [
    {
      "id": "mit",
      "name": "麻省理工学院",
      "nameEn": "MIT",
      "country": "US",
      "qsRank": 1,
      "ieltsMin": 7.0,
      "toeflMin": 100,
      "supports": ["pg", "ug"]
    },
    ...
  ]
}
```

共 194 所学校,覆盖 UK/US/AU/CA/NZ/HK/SG/IE/NL/JP/KR 等 11 个地区。
`supports` 表示该学校在 yingqu 这边有 `pg` / `ug` 哪种数据(或两者都有)。
字段 `id` 是 yingqu 稳定 ID,就是 Phase 2 JSON payload 里 `schools[i].id` 的来源 —— 你们按这个 id 做映射表即可。

### 7.5.2 专业目录

```
GET https://yingqu-selector.vercel.app/api/catalog/programs           # 全部
GET https://yingqu-selector.vercel.app/api/catalog/programs?target=pg  # 仅硕士
GET https://yingqu-selector.vercel.app/api/catalog/programs?target=ug  # 仅本科
```

全部约 5461 条(硕士 3344 + 本科 2117)。返回示例:
```json
{
  "version": 1,
  "count": 5461,
  "programs": [
    {
      "id": "ucl-management",
      "schoolId": "ucl",
      "target": "pg",
      "name": "MSc Management",
      "nameEn": "MSc Management",
      "department": "UCL School of Management",
      "category": "business",
      "source": "https://www.ucl.ac.uk/..."
    }
  ]
}
```

### 7.5.3 建议接入方式

1. **一次性 import**:你们启动脚本拉两个 endpoint,按 `id` 建映射表(yingqu_id → 你们内部 id),写进 DB
2. **定期同步**(推荐每周):设个 cron 拉最新版,diff 出新增/修改的学校和专业
3. **实时 fallback**:用户 payload 里出现你们 DB 没有的 `school.id`,直接用 payload 里的 `name`/`nameEn`/`country` 等元数据兜底显示(Phase 2 JSON 已经包含这些字段)

### 7.5.4 CDN 缓存

两个 endpoint 响应头都带 `Cache-Control: s-maxage=600`,10 分钟 CDN 缓存。yingqu 侧数据更新会在 10 分钟内全球生效。

---

## 8. 版本管理

- 当前 **v1.3**(JSON schema + catalog API)
- 破坏性变更 → `v: 2` + 文档升版
- 追加字段 → 不升版本,对方旧代码仍能 `JSON.parse`

---

## 9. 我们明确不做的事

- ❌ webhook
- ❌ API calls
- ❌ 传姓名/邮箱/手机(yingqu 不收集 PII)
- ❌ 共享 DB / session
- ❌ 页面 postMessage(坚持纯 URL)

---

## 10. 商业对齐

1. 分成基于 `ref=yingqu` 付费转化,非点击
2. 每月 ioffer 出漏斗报表;yingqu 侧有点击数,双侧差应 >90% 吻合
3. yingqu 可随时切换 `NEXT_PUBLIC_PARTNER_URL` / `NEXT_PUBLIC_PARTNER_MODE`,不改代码

具体比例单独谈。

---

## 附录 A — ioffer 工程师 5 分钟自查清单

- [ ] 打开 `https://student.i-offer.ai/?ref=yingqu&utm_source=yingqu&utm_medium=referral` HTTP 200 ✅
- [ ] 分析工具新增 `utm_source=yingqu` 仪表盘(Phase 1 就用得上)
- [ ] 拉一次 `https://yingqu-selector.vercel.app/api/catalog/schools` 存进你们 DB(§7.5)
- [ ] 拉一次 `https://yingqu-selector.vercel.app/api/catalog/programs?target=pg` 和 `?target=ug`(§7.5)
- [ ] 实现 §4.1 的 payload 捕获 + sessionStorage
- [ ] 实现 §4.2 的注册回调 import
- [ ] 按 §4.4 实现 My Schools 去重
- [ ] 按 §6 联调 5 条场景
- [ ] 通知 yingqu:Phase 2 可以切 `full` 模式了

---

## 联络

- yingqu 侧 Tech:[Caleb]
- 源码 + 最新文档:https://github.com/liushenpeng1-cmyk/yingqu-selector
- 本规范 gist(国内更稳):https://gist.github.com/liushenpeng1-cmyk/7bd1d6cdbb0ddde1118d71a40520a4e5
