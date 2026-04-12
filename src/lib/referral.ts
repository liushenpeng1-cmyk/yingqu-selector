/**
 * Referral / Lead-Gen 对接合约
 *
 * yingqu-selector 作为流量方，用户完成筛选后可把「申请意向 + 已填资料」
 * 以 URL query string 打包跳转到合作方的 AI 申请平台（默认占位域名，
 * 线上通过环境变量 NEXT_PUBLIC_PARTNER_URL 配置真实目标）。
 *
 * 参数编码约定（给合作方接入方参考）：
 *   - 标量字段：字符串/数字，直接 encodeURIComponent
 *   - 数组字段（schoolIds / programIds / regions / alevelGrades）：
 *     JSON.stringify 后再 encodeURIComponent
 *   - 归因字段：ref=yingqu 固定
 *
 * 合作方只需 URL.search → URLSearchParams.get(key) 读出，
 * 对数组字段执行 JSON.parse 即可预填表单，无需 yingqu 端任何后端。
 */

import type { Region } from "@/data/schools";

export const PARTNER_BASE_URL: string =
  process.env.NEXT_PUBLIC_PARTNER_URL ?? "https://partner.example.com/apply";

/**
 * 跳转模式:
 *  - "simple"(默认): 只跳转到 PARTNER_BASE_URL + ref/utm 归因参数,
 *    合作方未完成 /apply 接入时用,先让按钮可点击引流。
 *  - "full": 发送完整筛选 payload,合作方 /apply 端就绪后切换到此模式。
 * 通过 NEXT_PUBLIC_PARTNER_MODE 环境变量控制,无需改代码。
 */
export type PartnerMode = "simple" | "full";
export const PARTNER_MODE: PartnerMode =
  (process.env.NEXT_PUBLIC_PARTNER_MODE as PartnerMode) === "full"
    ? "full"
    : "simple";

export type ReferralPayload = {
  /** 归因标识，固定 yingqu */
  ref: "yingqu";
  /** 本科 or 硕士 */
  target?: "ug" | "pg";
  /** 用户意向申请的学校（至少 1 个，批量申请时多个） */
  schoolIds: string[];
  /** 可选：意向具体项目 id */
  programIds?: string[];

  /** 语言考试（两 tab 共用） */
  lang?: "IELTS" | "TOEFL";
  langScore?: string;

  /** 地区筛选 */
  regions?: Region[];

  // === 硕士 ===
  gpa?: string;
  gpaScale?: "percentage" | "gpa4";
  userTier?: string; // 985 / 211 / 双一流 / 双非 etc.
  currentCategoryId?: string;
  targetSubMajorId?: string;
  ukClassification?: "first" | "2:1" | "2:2" | "";
  auClassification?: "hd" | "d" | "c" | "p" | "";
  langExempt?: boolean;

  // === 本科 ===
  curriculum?: "alevel" | "ib" | "gaokao";
  alevelGrades?: { subject: string; grade: string }[];
  ibScore?: string;
  gaokaoScore?: string;
  gaokaoTotal?: string;
  subjectArea?: string;
  isOverseasUndergrad?: boolean;
  isJointUniversity?: boolean;
  jointUniType?: "uk-partner" | "us-partner" | "hk-partner" | "";
};

const ARRAY_KEYS = new Set<keyof ReferralPayload>([
  "schoolIds",
  "programIds",
  "regions",
  "alevelGrades",
]);

/** 只带归因参数的精简 URL(simple 模式用) */
export function buildSimpleReferralUrl(): string {
  const params = new URLSearchParams({
    ref: "yingqu",
    utm_source: "yingqu",
    utm_medium: "referral",
  });
  return `${PARTNER_BASE_URL}?${params.toString()}`;
}

/** 完整 payload URL(full 模式用,合作方 /apply 接入后启用) */
export function buildReferralUrl(payload: ReferralPayload): string {
  const params = new URLSearchParams();
  params.set("utm_source", "yingqu");
  params.set("utm_medium", "referral");
  (Object.keys(payload) as (keyof ReferralPayload)[]).forEach((key) => {
    const value = payload[key];
    if (value === undefined || value === null || value === "") return;
    if (ARRAY_KEYS.has(key)) {
      const arr = value as unknown[];
      if (!Array.isArray(arr) || arr.length === 0) return;
      params.set(key, JSON.stringify(arr));
    } else if (typeof value === "boolean") {
      params.set(key, value ? "1" : "0");
    } else {
      params.set(key, String(value));
    }
  });
  return `${PARTNER_BASE_URL}?${params.toString()}`;
}

export function openReferral(payload: ReferralPayload): void {
  if (typeof window === "undefined") return;
  const url = PARTNER_MODE === "full"
    ? buildReferralUrl(payload)
    : buildSimpleReferralUrl();
  window.open(url, "_blank", "noopener,noreferrer");
}
