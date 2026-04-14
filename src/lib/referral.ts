/**
 * Referral / Lead-Gen 对接合约 (v1.2)
 *
 * yingqu-selector → 合作方 (i-offer.ai) 的单向 URL 跳转。
 *
 * 两种模式,由 NEXT_PUBLIC_PARTNER_MODE 环境变量控制:
 *
 *   • simple — 只发 ref/utm 归因,合作方未上线预填端点前用。
 *
 *   • full   — 发完整 JSON 包(学校 + 专业 + 用户画像),
 *              URL 形如 ?ref=yingqu&utm_source=yingqu&utm_medium=referral
 *                      &payload=<encodeURIComponent(JSON.stringify(data))>
 *              合作方端:
 *                const data = JSON.parse(
 *                  decodeURIComponent(new URL(location.href).searchParams.get("payload")!)
 *                );
 *
 * 详情见 docs/partner-integration-spec.md
 */

import type { Region } from "@/data/schools";

export const PARTNER_BASE_URL: string =
  process.env.NEXT_PUBLIC_PARTNER_URL ?? "https://partner.example.com/apply";

export type PartnerMode = "simple" | "full";
export const PARTNER_MODE: PartnerMode =
  (process.env.NEXT_PUBLIC_PARTNER_MODE as PartnerMode) === "full"
    ? "full"
    : "simple";

// ═══════════════════════ JSON payload schema (Phase 2) ═══════════════════════

export type JsonMatchLevel = "high" | "medium" | "low" | "excluded";

export type JsonProgramEntry = {
  id: string;
  name: string;
  nameEn: string;
  department?: string;
  matchLevel?: JsonMatchLevel;
  duration?: string;
  tuitionFee?: string;
  source?: string;
};

export type JsonSchoolEntry = {
  id: string;
  name: string;
  nameEn: string;
  country: Region;
  qsRank?: number;
  programs: JsonProgramEntry[];
};

export type JsonUserProfile = {
  // shared
  lang?: "IELTS" | "TOEFL";
  langScore?: string;
  langExempt?: boolean;       // 英语国家本科免试
  langNoScore?: boolean;      // 暂无语言成绩(test-optional 学校仍需展示)
  regions?: Region[];

  // postgrad
  gpa?: string;
  gpaScale?: "percentage" | "gpa4";
  tier?: string;
  currentCategoryId?: string;
  targetSubMajorId?: string;
  ukClassification?: string;
  auClassification?: string;
  isOverseasUndergrad?: boolean;
  isJointUniversity?: boolean;
  jointUniType?: string;

  // undergrad
  curriculum?: "alevel" | "ib" | "gaokao" | "ap";
  alevelGrades?: { subject: string; grade: string }[];
  apGrades?: { subject: string; score: string }[];
  ibScore?: string;
  gaokaoScore?: string;
  gaokaoTotal?: string;
  subjectArea?: string;
};

export type JsonPayload = {
  /** schema version; bump on breaking changes */
  v: 1;
  /** attribution */
  ref: "yingqu";
  /** ISO timestamp (for dedup / auditing) */
  generatedAt: string;
  /** undergrad vs postgrad */
  target: "ug" | "pg";
  /** user-filled profile (for pre-filling partner forms) */
  user: JsonUserProfile;
  /** selected/favorited schools with programs */
  schools: JsonSchoolEntry[];
};

// ═══════════════════════ URL builders ═══════════════════════

/** simple 模式: 只带归因参数 */
export function buildSimpleReferralUrl(): string {
  const p = new URLSearchParams({
    ref: "yingqu",
    utm_source: "yingqu",
    utm_medium: "referral",
  });
  return `${PARTNER_BASE_URL}?${p.toString()}`;
}

/** full 模式: 完整 JSON 包 */
export function buildJsonReferralUrl(data: JsonPayload): string {
  const p = new URLSearchParams({
    ref: "yingqu",
    utm_source: "yingqu",
    utm_medium: "referral",
  });
  const encoded = encodeURIComponent(JSON.stringify(data));
  return `${PARTNER_BASE_URL}?${p.toString()}&payload=${encoded}`;
}

/** 统一跳转入口：按 PARTNER_MODE 自动选格式 */
export function openReferral(payload: JsonPayload): void {
  if (typeof window === "undefined") return;
  const url =
    PARTNER_MODE === "full" ? buildJsonReferralUrl(payload) : buildSimpleReferralUrl();
  window.open(url, "_blank", "noopener,noreferrer");
}
