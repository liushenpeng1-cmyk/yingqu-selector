// GPA requirements differ by whether the student's university is on the school's "preferred" list
export type GpaByTier = {
  preferred: number; // 985/211/双一流 or on school's specific list
  other: number;     // 双非 / not on list
};

export type Region =
  | "UK" | "AU" | "HK" | "SG" | "US" | "CA" | "JP" | "KR" | "DE" | "CH" | "NL" | "FR"
  | "SE" | "DK" | "FI" | "NO" | "IE" | "IT" | "ES" | "BE" | "AT" | "NZ"
  | "MY" | "RU" | "SA" | "QA" | "IN" | "AR" | "BR" | "CL" | "MX" | "CO" | "KZ" | "ZA";

export const regionLabels: Record<Region, string> = {
  UK: "🇬🇧 英国",
  AU: "🇦🇺 澳洲",
  HK: "🇭🇰 香港",
  SG: "🇸🇬 新加坡",
  US: "🇺🇸 美国",
  CA: "🇨🇦 加拿大",
  JP: "🇯🇵 日本",
  KR: "🇰🇷 韩国",
  DE: "🇩🇪 德国",
  CH: "🇨🇭 瑞士",
  NL: "🇳🇱 荷兰",
  FR: "🇫🇷 法国",
  SE: "🇸🇪 瑞典",
  DK: "🇩🇰 丹麦",
  FI: "🇫🇮 芬兰",
  NO: "🇳🇴 挪威",
  IE: "🇮🇪 爱尔兰",
  IT: "🇮🇹 意大利",
  ES: "🇪🇸 西班牙",
  BE: "🇧🇪 比利时",
  AT: "🇦🇹 奥地利",
  NZ: "🇳🇿 新西兰",
  MY: "🇲🇾 马来西亚",
  RU: "🇷🇺 俄罗斯",
  SA: "🇸🇦 沙特",
  QA: "🇶🇦 卡塔尔",
  IN: "🇮🇳 印度",
  AR: "🇦🇷 阿根廷",
  BR: "🇧🇷 巴西",
  CL: "🇨🇱 智利",
  MX: "🇲🇽 墨西哥",
  CO: "🇨🇴 哥伦比亚",
  KZ: "🇰🇿 哈萨克斯坦",
  ZA: "🇿🇦 南非",
};

export const regionInfo: Record<Region, { gpaSystem: string; keyFactors: string }> = {
  UK: { gpaSystem: "百分制", keyFactors: "GPA + IELTS + 院校 List" },
  AU: { gpaSystem: "百分制", keyFactors: "GPA + IELTS + 985/211 分层" },
  HK: { gpaSystem: "百分制/4.0", keyFactors: "GPA + IELTS + 面试(部分)" },
  SG: { gpaSystem: "百分制/4.0", keyFactors: "GPA + IELTS/TOEFL + GRE(部分)" },
  US: { gpaSystem: "4.0 制", keyFactors: "GPA + TOEFL/IELTS + GRE/GMAT" },
  CA: { gpaSystem: "百分制/4.0", keyFactors: "GPA + IELTS/TOEFL" },
  JP: { gpaSystem: "百分制/4.0", keyFactors: "GPA + JLPT/TOEFL + 研究计划书" },
  KR: { gpaSystem: "百分制/4.0", keyFactors: "GPA + TOPIK/IELTS + 面试" },
  DE: { gpaSystem: "百分制", keyFactors: "GPA + 德语/英语 + APS审核" },
  CH: { gpaSystem: "百分制", keyFactors: "GPA + IELTS/TOEFL + GRE(部分)" },
  NL: { gpaSystem: "百分制", keyFactors: "GPA + IELTS/TOEFL" },
  FR: { gpaSystem: "百分制", keyFactors: "GPA + 法语/英语 + 面试(部分)" },
  SE: { gpaSystem: "百分制", keyFactors: "GPA + IELTS/TOEFL" },
  DK: { gpaSystem: "百分制", keyFactors: "GPA + IELTS/TOEFL" },
  FI: { gpaSystem: "百分制", keyFactors: "GPA + IELTS/TOEFL" },
  NO: { gpaSystem: "百分制", keyFactors: "GPA + IELTS/TOEFL" },
  IE: { gpaSystem: "百分制", keyFactors: "GPA + IELTS/TOEFL" },
  IT: { gpaSystem: "百分制", keyFactors: "GPA + IELTS/TOEFL + 作品集(部分)" },
  ES: { gpaSystem: "百分制", keyFactors: "GPA + IELTS/西语 + 学历认证" },
  BE: { gpaSystem: "百分制", keyFactors: "GPA + IELTS/TOEFL" },
  AT: { gpaSystem: "百分制", keyFactors: "GPA + 德语/英语" },
  NZ: { gpaSystem: "百分制", keyFactors: "GPA + IELTS" },
  MY: { gpaSystem: "百分制/4.0", keyFactors: "GPA + IELTS/TOEFL" },
  RU: { gpaSystem: "百分制", keyFactors: "GPA + 俄语/英语" },
  SA: { gpaSystem: "百分制/4.0", keyFactors: "GPA + IELTS/TOEFL" },
  QA: { gpaSystem: "百分制/4.0", keyFactors: "GPA + IELTS/TOEFL" },
  IN: { gpaSystem: "百分制", keyFactors: "GPA + GATE/GRE" },
  AR: { gpaSystem: "百分制", keyFactors: "GPA + 西语/英语" },
  BR: { gpaSystem: "百分制", keyFactors: "GPA + 葡语/英语" },
  CL: { gpaSystem: "百分制", keyFactors: "GPA + 西语/英语" },
  MX: { gpaSystem: "百分制", keyFactors: "GPA + 西语/英语" },
  CO: { gpaSystem: "百分制", keyFactors: "GPA + 西语/英语" },
  KZ: { gpaSystem: "百分制", keyFactors: "GPA + 俄语/英语" },
  ZA: { gpaSystem: "百分制", keyFactors: "GPA + IELTS/TOEFL" },
};

export type School = {
  id: string;
  name: string;
  nameEn: string;
  country: Region;
  qsRank: number;
  ieltsMin: number;
  toeflMin: number;
  // GPA requirements — for US/CA schools using 4.0 scale, these are 4.0-scale numbers
  // For UK/AU/HK/SG, these are percentage numbers (百分制)
  gpaRequirements: GpaByTier;
  gpaScale: "percentage" | "gpa4"; // which scale gpaRequirements uses
  listPolicy: "strict" | "tiered" | "open";
  preferredTiers: string[];
  majorCategories: string[];
  // Extra requirements for US/SG (GRE, GMAT, etc.)
  extraRequirements?: string;
  // Application fee in local currency string, e.g. "£80", "A$150", "HK$600", "US$125"
  applicationFee?: string;
  // Pre-sessional / language course URL
  languageCourseUrl?: string;
  notes?: string;
  source?: string;
};

// Language course suggestion based on IELTS gap
export type LanguageCourseSuggestion = {
  weeks: number;
  estimatedFee: string;
  note: string;
};

export function getLanguageCourseSuggestion(
  school: School,
  langGap: number,
  langTest: "IELTS" | "TOEFL"
): LanguageCourseSuggestion | null {
  // Normalize gap to IELTS scale for language course logic
  const ieltsGap = langTest === "TOEFL" ? langGap / 10 : langGap;
  if (ieltsGap <= 0) return null;

  // Only UK and AU commonly offer pre-sessional courses
  // HK/SG/US/CA generally don't have this pathway
  // Most countries outside UK/AU/HK/SG don't commonly offer pre-sessional language courses
  if (school.country !== "UK" && school.country !== "AU" && school.country !== "HK" && school.country !== "SG") {
    return null;
  }

  if (school.country === "HK" || school.country === "SG") {
    return ieltsGap <= 1.0
      ? { weeks: 0, estimatedFee: "", note: "港校/新加坡一般不提供语言班，需达到 IELTS 要求" }
      : null;
  }

  // UK pre-sessional patterns
  if (school.country === "UK") {
    if (ieltsGap <= 0.5) {
      return { weeks: 6, estimatedFee: "£3,000-4,000", note: "6 周语言班（大部分英国大学提供）" };
    } else if (ieltsGap <= 1.0) {
      return { weeks: 10, estimatedFee: "£5,000-6,000", note: "10 周语言班" };
    } else if (ieltsGap <= 1.5) {
      return { weeks: 20, estimatedFee: "£8,000-10,000", note: "20 周语言班（部分学校提供）" };
    } else {
      return { weeks: 0, estimatedFee: "", note: "差距较大，建议先提升 IELTS 成绩再申请" };
    }
  }

  // AU pre-sessional patterns
  if (school.country === "AU") {
    if (ieltsGap <= 0.5) {
      return { weeks: 10, estimatedFee: "A$5,000-6,000", note: "10 周语言直升班" };
    } else if (ieltsGap <= 1.0) {
      return { weeks: 15, estimatedFee: "A$7,000-9,000", note: "15 周语言直升班" };
    } else if (ieltsGap <= 1.5) {
      return { weeks: 20, estimatedFee: "A$10,000-12,000", note: "20 周语言直升班" };
    } else {
      return { weeks: 0, estimatedFee: "", note: "差距较大，建议先提升 IELTS 成绩" };
    }
  }

  return null;
}

export const schools: School[] = [
  // ═══════════════ UK ═══════════════
  {
    id: "ucl",
    name: "UCL 伦敦大学学院",
    nameEn: "University College London",
    country: "UK",
    qsRank: 9,
    ieltsMin: 7.0, toeflMin: 94,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 85, other: 90 },
    applicationFee: "£80",
    listPolicy: "tiered",
    preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "艺术设计", "理学", "社科"],
    notes: "UCL Approved List 内 85%，List 外 90%。双非可申但门槛显著更高",
    source: "https://www.ucl.ac.uk/prospective-students/international/china",
  },
  {
    id: "edinburgh",
    name: "爱丁堡大学",
    nameEn: "University of Edinburgh",
    country: "UK",
    qsRank: 27,
    ieltsMin: 7.0, toeflMin: 94,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 80, other: 85  },
    listPolicy: "tiered",
    preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "艺术设计", "理学", "社科"],
    notes: "Priority List 内 80-85%（按 Band），Band C/D 接受非 List 学生（85%/80%）",
    source: "https://www.ed.ac.uk/studying/international/postgraduate-entry/asia/china",
  },
  {
    id: "manchester",
    name: "曼彻斯特大学",
    nameEn: "University of Manchester",
    country: "UK",
    qsRank: 34,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 80, other: 80  },
    listPolicy: "open",
    preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "不分院校层级，统一要求 80%+。双非可申",
    languageCourseUrl: "https://www.ucae.manchester.ac.uk/study/pre-sessional-courses/dates-and-fees/",
    source: "https://www.manchester.ac.uk/study/international/country-specific-information/china-mainland/entry-requirements/",
  },
  {
    id: "kcl",
    name: "伦敦国王学院",
    nameEn: "King's College London",
    country: "UK",
    qsRank: 40,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 80, other: 85  },
    listPolicy: "tiered",
    preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "传媒", "教育", "法律", "理学", "社科"],
    notes: "Prestigious (211/双一流) 80%，其他 85%。商学院部分专业仅接受 Prestigious 院校",
    source: "https://www.kcl.ac.uk/study-legacy/postgraduate/apply/entry-requirements/international",
  },
  {
    id: "bristol",
    name: "布里斯托大学",
    nameEn: "University of Bristol",
    country: "UK",
    qsRank: 54,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 78, other: 85  },
    listPolicy: "tiered",
    preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "有 Accepted List，GPA 78-87% 按院校和项目不同",
    source: "https://www.bristol.ac.uk/international/countries/china.html",
  },
  {
    id: "warwick",
    name: "华威大学",
    nameEn: "University of Warwick",
    country: "UK",
    qsRank: 69,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 80, other: 85  },
    listPolicy: "tiered",
    preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "理学", "社科"],
    notes: "按项目不同要求不同。WBS 商学院要求更高",
  },
  {
    id: "leeds",
    name: "利兹大学",
    nameEn: "University of Leeds",
    country: "UK",
    qsRank: 75,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 75, other: 80  },
    listPolicy: "tiered",
    preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "艺术设计", "理学", "社科"],
    notes: "有 Accepted Institution List，双非可申部分专业",
  },
  {
    id: "glasgow",
    name: "格拉斯哥大学",
    nameEn: "University of Glasgow",
    country: "UK",
    qsRank: 78,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 75, other: 80  },
    listPolicy: "tiered",
    preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    notes: "有认可院校名单，双非 GPA 要求更高",
  },
  {
    id: "birmingham",
    name: "伯明翰大学",
    nameEn: "University of Birmingham",
    country: "UK",
    qsRank: 84,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 75, other: 80  },
    listPolicy: "open",
    preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "对中国院校较友好，双非可申",
  },
  {
    id: "sheffield",
    name: "谢菲尔德大学",
    nameEn: "University of Sheffield",
    country: "UK",
    qsRank: 92,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 75, other: 78  },
    listPolicy: "open",
    preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "艺术设计", "理学", "社科"],
    notes: "对双非友好，GPA 要求相对宽松",
  },
  // ═══════════════ AU ═══════════════
  {
    id: "melbourne",
    name: "墨尔本大学",
    nameEn: "University of Melbourne",
    country: "AU",
    qsRank: 14,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 83, other: 90 },
    applicationFee: "A$150",
    listPolicy: "tiered",
    preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "艺术设计", "理学", "社科"],
    notes: "C9/Tier1 80%，985/211 83-85%，双非 90%。商科要求更高",
    source: "https://study.unimelb.edu.au/how-to-apply/graduate-coursework-study/international-applications/entry-requirements",
  },
  {
    id: "sydney",
    name: "悉尼大学",
    nameEn: "University of Sydney",
    country: "AU",
    qsRank: 19,
    ieltsMin: 7.0, toeflMin: 94,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 75, other: 87  },
    listPolicy: "tiered",
    preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "艺术设计", "理学", "社科"],
    notes: "985/211 均分 75%，双非均分 87%（2024年底涨分）。C9 低至 65%",
    source: "https://www.sydney.edu.au/study/how-to-apply/international-students.html",
  },
  {
    id: "unsw",
    name: "新南威尔士大学",
    nameEn: "UNSW Sydney",
    country: "AU",
    qsRank: 24,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 75, other: 88 },
    applicationFee: "A$150",
    listPolicy: "tiered",
    preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "理学", "社科"],
    notes: "商科：非211需88%。工程：非211需70%。差异大，按专业查",
    source: "https://www.unsw.edu.au/study/how-to-apply/international/entry-requirements",
  },
  {
    id: "anu",
    name: "澳大利亚国立大学",
    nameEn: "Australian National University",
    country: "AU",
    qsRank: 30,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 75, other: 80  },
    listPolicy: "tiered",
    preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科"],
    notes: "211: 75% → GPA 5.0/7。非211: 80% → GPA 5.0/7",
    source: "https://study.anu.edu.au/apply/postgraduate-program-indicative-entry-requirements/china",
  },
  {
    id: "monash",
    name: "蒙纳士大学",
    nameEn: "Monash University",
    country: "AU",
    qsRank: 37,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 75, other: 80  },
    listPolicy: "tiered",
    preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认，建议查官网",
    source: "https://www.monash.edu/study/courses/entry-requirements",
  },
  {
    id: "queensland",
    name: "昆士兰大学",
    nameEn: "University of Queensland",
    country: "AU",
    qsRank: 40,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 75, other: 80  },
    listPolicy: "tiered",
    preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认，建议查官网",
    source: "https://future-students.uq.edu.au/apply/postgraduate/international/entry-requirements",
  },
  {
    id: "adelaide",
    name: "阿德莱德大学",
    nameEn: "University of Adelaide",
    country: "AU",
    qsRank: 82,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 75, other: 80  },
    listPolicy: "open",
    preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "法律", "传媒", "理学", "社科"],
    notes: "⚠️ 数据待确认。2026 年与南澳大学合并为 Adelaide University",
    source: "https://adelaide.edu.au/study/international-students/how-to-apply/entry-requirements/",
  },
  {
    id: "rmit",
    name: "皇家墨尔本理工大学",
    nameEn: "RMIT University",
    country: "AU",
    qsRank: 123,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 68, other: 73  },
    listPolicy: "open",
    preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "艺术设计", "理学"],
    notes: "⚠️ 数据待确认，建议查官网",
    source: "https://www.rmit.edu.au/study-with-us/international-students/apply-to-rmit-international-students/entry-requirements",
  },
  {
    id: "macquarie",
    name: "麦考瑞大学",
    nameEn: "Macquarie University",
    country: "AU",
    qsRank: 130,
    ieltsMin: 6.5, toeflMin: 79,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 65, other: 73  },
    listPolicy: "open",
    preferredTiers: [],
    majorCategories: ["商科", "计算机", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认，建议查官网",
    source: "https://www.mq.edu.au/study/how-to-apply/international/entry-requirements",
  },// ═══════════════ Imperial / Oxford / Cambridge ═══════════════
  {
    id: "imperial", name: "帝国理工学院", nameEn: "Imperial College London", country: "UK", qsRank: 2,
    ieltsMin: 7.0, toeflMin: 100, gpaScale: "percentage" as const, gpaRequirements: { preferred: 85, other: 90 },
    applicationFee: "£80", listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "理学"],
    notes: "工科/理科为主，商学院极其竞争。Business School UK/国际同一学费。211 要求 85%+，非 211 要求 88-90%+。工程类 IELTS 6.5/6.0，商学院 7.0/6.5",
    source: "https://www.imperial.ac.uk/study/apply/postgraduate-taught/entry-requirements/accepted-qualifications/",
  },
  {
    id: "oxford", name: "牛津大学", nameEn: "University of Oxford", country: "UK", qsRank: 3,
    ieltsMin: 7.0, toeflMin: 110, gpaScale: "percentage" as const, gpaRequirements: { preferred: 90, other: 95 },
    applicationFee: "£75", listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "教育", "法律", "理学", "社科"],
    notes: "竞争极其激烈，GPA 仅为最低门槛。985/211 一等学位 90%+，非 211 一等学位 95%+。IELTS 分 Standard(7.0/6.5) 和 Higher(7.5/7.0)。从 2026.1.21 起不接受 TOEFL",
    source: "https://www.ox.ac.uk/admissions/graduate/international-applicants/international-qualifications",
  },
  {
    id: "cambridge", name: "剑桥大学", nameEn: "University of Cambridge", country: "UK", qsRank: 5,
    ieltsMin: 7.5, toeflMin: 110, gpaScale: "percentage" as const, gpaRequirements: { preferred: 90, other: 95 },
    applicationFee: "£85", listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "教育", "法律", "理学", "社科"],
    notes: "要求极高，985 建议 90%+。百分制直接看平均分。IELTS 统一 7.5/7.0。Judge Business School UK/国际同一学费。经济学/金融需 GRE",
    source: "https://www.postgraduate.study.cam.ac.uk/apply/before/international-qualifications",
  },
  {
    id: "lse", name: "伦敦政治经济学院", nameEn: "London School of Economics", country: "UK", qsRank: 50,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "percentage" as const, gpaRequirements: { preferred: 85, other: 90 },
    applicationFee: "£80", listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "传媒", "法律", "社科"],
    notes: "⚠️ 数据待确认。偏社科/商科，竞争极强",
    source: "https://www.lse.ac.uk/study-at-lse/Graduate/prospective-students/how-to-apply",
  },
  {
    id: "southampton", name: "南安普顿大学", nameEn: "University of Southampton", country: "UK", qsRank: 80,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 80  }, listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "艺术设计", "理学", "社科"],
    notes: "⚠️ 数据待确认",
    source: "https://www.southampton.ac.uk/international/entry-qualification-equivalencies/china",
  },
  {
    id: "durham", name: "杜伦大学", nameEn: "Durham University", country: "UK", qsRank: 89,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 85  }, listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。商学院有独立 List",
    source: "https://www.durham.ac.uk/international/country-information/asia/china/",
  },
  {
    id: "standrews", name: "圣安德鲁斯大学", nameEn: "University of St Andrews", country: "UK", qsRank: 104,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 85  }, listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "传媒", "理学", "社科"],
    notes: "⚠️ 数据待确认",
    source: "https://www.st-andrews.ac.uk/subjects/entry/",
  },
  {
    id: "nottingham", name: "诺丁汉大学", nameEn: "University of Nottingham", country: "UK", qsRank: 97,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 80  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。对双非相对友好",
    source: "https://www.nottingham.ac.uk/studywithus/international-applicants/country-info/countryinformation/china.aspx",
  },
  {
    id: "qmul", name: "伦敦玛丽女王大学", nameEn: "Queen Mary University of London", country: "UK", qsRank: 120,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 80  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认",
    source: "https://www.qmul.ac.uk/international-students/countries/china/",
  },
  {
    id: "newcastle", name: "纽卡斯尔大学", nameEn: "Newcastle University", country: "UK", qsRank: 129,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 73, other: 78  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认。对双非友好",
    source: "https://www.ncl.ac.uk/international/country/china/",
  },
  {
    id: "lancaster", name: "兰卡斯特大学", nameEn: "Lancaster University", country: "UK", qsRank: 141,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 80  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认",
    source: "https://www.lancaster.ac.uk/study/international-students/find-your-country/china/",
  },
  {
    id: "bath", name: "巴斯大学", nameEn: "University of Bath", country: "UK", qsRank: 150,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 83  }, listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科"],
    notes: "⚠️ 数据待确认。商科竞争强",
    source: "https://www.bath.ac.uk/guides/applying-for-a-taught-postgraduate-course/",
  },// ═══════════════ NEW AU (QS top 300, not yet verified) ═══════════════
  {
    id: "western-australia", name: "西澳大学", nameEn: "University of Western Australia", country: "AU", qsRank: 77,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 70, other: 78  }, listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "教育", "法律", "理学", "社科"],
    notes: "八大之一。标准 IELTS 6.5/6.0，法律 7.0/6.5，教育 7.5/6.5+",
    source: "https://www.uwa.edu.au/study/how-to-apply/international-applicants",
  },
  {
    id: "uts", name: "悉尼科技大学", nameEn: "University of Technology Sydney", country: "AU", qsRank: 88,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 72, other: 78  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "教育", "传媒", "艺术设计", "理学", "社科"],
    notes: "⚠️ 数据待确认。IT 和传媒强",
    source: "https://www.uts.edu.au/study/international/essential-information/entry-requirements",
  },// ═══════════════ HK 香港 ═══════════════
  {
    id: "hku", name: "香港大学", nameEn: "University of Hong Kong", country: "HK", qsRank: 17,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 85, other: 88 },
    applicationFee: "HK$600", listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。商科/法律竞争极强，面试常见",
    source: "https://admissions.hku.hk/tpg/international",
  },
  {
    id: "cuhk", name: "香港中文大学", nameEn: "Chinese University of Hong Kong", country: "HK", qsRank: 36,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 82, other: 87  }, listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认",
    source: "https://www.gs.cuhk.edu.hk/admissions/programme/",
  },
  {
    id: "hkust", name: "香港科技大学", nameEn: "Hong Kong University of Science and Technology", country: "HK", qsRank: 47,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 83, other: 87  }, listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科"],
    notes: "⚠️ 数据待确认。理工和商科极强",
    source: "https://pg.ust.hk/prospective-students/admissions/general-requirements",
  },
  {
    id: "cityu-hk", name: "香港城市大学", nameEn: "City University of Hong Kong", country: "HK", qsRank: 62,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 83  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。对双非相对友好",
    source: "https://www.cityu.edu.hk/pg/taught-postgraduate-programmes",
  },
  {
    id: "polyu", name: "香港理工大学", nameEn: "Hong Kong Polytechnic University", country: "HK", qsRank: 57,
    ieltsMin: 6.0, toeflMin: 80, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 83  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "艺术设计", "理学", "社科"],
    notes: "酒店管理全球第一，设计亚洲顶尖。商学院 IELTS 6.5+，其他多数 6.0",
    source: "https://www.polyu.edu.hk/study/pg/taught-postgraduate",
  },// ═══════════════ SG 新加坡 ═══════════════
  {
    id: "nus", name: "新加坡国立大学", nameEn: "National University of Singapore", country: "SG", qsRank: 8,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 85, other: 88  }, listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "法律", "理学", "社科"],
    extraRequirements: "部分专业需 GRE/GMAT",
    notes: "⚠️ 数据待确认。亚洲顶尖，竞争极强",
    source: "https://nusgs.nus.edu.sg/admissions/",
  },
  {
    id: "ntu-sg", name: "南洋理工大学", nameEn: "Nanyang Technological University", country: "SG", qsRank: 15,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 83, other: 87  }, listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    extraRequirements: "工科部分需 GRE",
    notes: "⚠️ 数据待确认。工科和传媒极强",
    source: "https://www.ntu.edu.sg/admissions/graduate/radmissionguide",
  },// ═══════════════ CA 加拿大 ═══════════════
  {
    id: "toronto", name: "多伦多大学", nameEn: "University of Toronto", country: "CA", qsRank: 25,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "percentage" as const, gpaRequirements: { preferred: 83, other: 85  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。加拿大第一，要求 B+ 以上",
    source: "https://www.sgs.utoronto.ca/future-students/admission-application-requirements/",
  },
  {
    id: "mcgill", name: "麦吉尔大学", nameEn: "McGill University", country: "CA", qsRank: 29,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 83, other: 85  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。要求 CGPA 3.0/4.0+",
    source: "https://www.mcgill.ca/gradapplicants/how-apply",
  },
  {
    id: "ubc", name: "不列颠哥伦比亚大学", nameEn: "University of British Columbia", country: "CA", qsRank: 38,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 83  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。要求 B+ 以上（76%+）",
    source: "https://www.grad.ubc.ca/prospective-students/application-admission",
  },
  {
    id: "alberta", name: "阿尔伯塔大学", nameEn: "University of Alberta", country: "CA", qsRank: 96,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认",
    source: "https://www.ualberta.ca/en/graduate-studies/prospective-students/international-admissions-protocol.html",
  },
  {
    id: "waterloo", name: "滑铁卢大学", nameEn: "University of Waterloo", country: "CA", qsRank: 112,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 83  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学"],
    extraRequirements: "CS 和工程极其竞争",
    notes: "⚠️ 数据待确认。CS 和工程全球顶尖",
    source: "https://uwaterloo.ca/graduate-studies-postdoctoral-affairs/future-students",
  },
  {
    id: "western", name: "西安大略大学", nameEn: "Western University", country: "CA", qsRank: 114,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认。Ivey 商学院极强",
    source: "https://grad.uwo.ca/admissions/index.html",
  },// ═══════════════ US 美国 (QS top 100) ═══════════════
  {
    id: "mit", name: "麻省理工学院", nameEn: "MIT", country: "US", qsRank: 1,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.8, other: 3.8 },
    applicationFee: "$90", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学"],
    extraRequirements: "GRE（部分）, 强科研背景",
    notes: "⚠️ 数据待确认。全球第一，极其竞争",
    source: "https://gradadmissions.mit.edu/admissions",
  },
  {
    id: "harvard", name: "哈佛大学", nameEn: "Harvard University", country: "US", qsRank: 4,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.8, other: 3.8 },
    applicationFee: "$105", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    extraRequirements: "GRE/GMAT（按项目）",
    notes: "⚠️ 数据待确认",
    source: "https://gsas.harvard.edu/apply",
  },
  {
    id: "stanford", name: "斯坦福大学", nameEn: "Stanford University", country: "US", qsRank: 6,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.7, other: 3.7 },
    applicationFee: "$125", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    extraRequirements: "GRE（部分项目取消）",
    notes: "⚠️ 数据待确认",
    source: "https://gradadmissions.stanford.edu/applying",
  },
  {
    id: "caltech", name: "加州理工学院", nameEn: "Caltech", country: "US", qsRank: 10,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.8, other: 3.8  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "理学"],
    extraRequirements: "GRE（推荐）",
    notes: "⚠️ 数据待确认。纯理工，规模极小",
    source: "https://www.gradoffice.caltech.edu/admissions",
  },
  {
    id: "upenn", name: "宾夕法尼亚大学", nameEn: "University of Pennsylvania", country: "US", qsRank: 11,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.6, other: 3.6  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    extraRequirements: "GRE/GMAT（按项目）",
    notes: "⚠️ 数据待确认。沃顿商学院",
    source: "https://provost.upenn.edu/for-students/graduate-and-professional-education/graduate-admissions/",
  },
  {
    id: "columbia", name: "哥伦比亚大学", nameEn: "Columbia University", country: "US", qsRank: 23,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.5, other: 3.5 },
    applicationFee: "$120", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科", "艺术设计"],
    extraRequirements: "GRE（部分项目）",
    notes: "⚠️ 数据待确认。中国学生较多",
    source: "https://www.columbia.edu/content/admissions",
  },
  {
    id: "cornell", name: "康奈尔大学", nameEn: "Cornell University", country: "US", qsRank: 16,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.5, other: 3.5  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "教育", "法律", "理学", "社科"],
    extraRequirements: "GRE（部分）",
    notes: "⚠️ 数据待确认",
    source: "https://gradschool.cornell.edu/admissions/",
  },
  {
    id: "uchicago", name: "芝加哥大学", nameEn: "University of Chicago", country: "US", qsRank: 21,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.6, other: 3.6  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "传媒", "教育", "法律", "理学", "社科"],
    extraRequirements: "GRE（部分项目要求）",
    notes: "⚠️ 数据待确认。Booth 商学院",
    source: "https://grad.uchicago.edu/admissions/",
  },
  {
    id: "jhu", name: "约翰霍普金斯大学", nameEn: "Johns Hopkins University", country: "US", qsRank: 28,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.5, other: 3.5  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    extraRequirements: "GRE（按项目）",
    notes: "⚠️ 数据待确认。公共卫生和工程强",
    source: "https://www.jhu.edu/admissions/graduate-admissions/",
  },
  {
    id: "nyu", name: "纽约大学", nameEn: "New York University", country: "US", qsRank: 38,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.3, other: 3.3 },
    applicationFee: "$115", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "艺术设计", "理学", "社科"],
    extraRequirements: "GRE/GMAT（按项目）",
    notes: "⚠️ 数据待确认。中国学生多，Stern 商学院",
    source: "https://www.nyu.edu/admissions/graduate-admissions.html",
  },
  {
    id: "ucla", name: "加州大学洛杉矶分校", nameEn: "UCLA", country: "US", qsRank: 42,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.5, other: 3.5 },
    applicationFee: "$155", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    extraRequirements: "GRE（部分项目）",
    notes: "⚠️ 数据待确认",
    source: "https://grad.ucla.edu/admissions/",
  },
  {
    id: "ucberkeley", name: "加州大学伯克利分校", nameEn: "UC Berkeley", country: "US", qsRank: 12,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.5, other: 3.5 },
    applicationFee: "$155", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    extraRequirements: "GRE（按项目），CS 极其竞争",
    notes: "⚠️ 数据待确认",
    source: "https://grad.berkeley.edu/admissions/",
  },
  {
    id: "umich", name: "密歇根大学", nameEn: "University of Michigan", country: "US", qsRank: 33,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.5, other: 3.5  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    extraRequirements: "GRE（部分项目）",
    notes: "⚠️ 数据待确认。Ross 商学院",
    source: "https://rackham.umich.edu/admissions/",
  },
  {
    id: "cmu", name: "卡内基梅隆大学", nameEn: "Carnegie Mellon University", country: "US", qsRank: 52,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.5, other: 3.5  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "艺术设计", "理学"],
    extraRequirements: "GRE（SCS 要求 CS GRE Subject）",
    notes: "⚠️ 数据待确认。CS 全球顶尖",
    source: "https://www.cmu.edu/graduate/prospective/",
  },
  {
    id: "uiuc", name: "伊利诺伊大学厄巴纳-香槟", nameEn: "UIUC", country: "US", qsRank: 64,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.2, other: 3.2  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    extraRequirements: "GRE（工程和 CS）",
    notes: "⚠️ 数据待确认。工程和 CS 极强",
    source: "https://grad.illinois.edu/admissions",
  },
  {
    id: "gatech", name: "佐治亚理工学院", nameEn: "Georgia Tech", country: "US", qsRank: 85,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.3, other: 3.3  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学"],
    extraRequirements: "GRE",
    notes: "⚠️ 数据待确认。工程和 CS 性价比极高",
    source: "https://grad.gatech.edu/admissions",
  },
  {
    id: "purdue", name: "普渡大学", nameEn: "Purdue University", country: "US", qsRank: 99,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.2, other: 3.2  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "教育", "理学"],
    extraRequirements: "GRE（工程）",
    notes: "⚠️ 数据待确认。工程强校",
    source: "https://www.purdue.edu/gradschool/admissions/",
  },
  {
    id: "yale", name: "耶鲁大学", nameEn: "Yale University", country: "US", qsRank: 21,
    ieltsMin: 7.0, toeflMin: 100, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.8, other: 3.6 },
    applicationFee: "US$105", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "社科", "法律", "理学", "艺术设计", "教育"],
    extraRequirements: "SOM MBA 要求 GMAT/GRE；部分项目要求 GRE",
    notes: "GSAS 不设最低语言成绩要求，由各系自行决定。YSE 要求 TOEFL 100/IELTS 7.0",
    source: "https://gsas.yale.edu/admissions/phdmasters-application-process/standardized-testing-requirements",
  },
  {
    id: "princeton", name: "普林斯顿大学", nameEn: "Princeton University", country: "US", qsRank: 25,
    ieltsMin: 7.0, toeflMin: 100, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.8, other: 3.6 },
    applicationFee: "US$90", listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "社科", "理学", "商科"],
    extraRequirements: "GRE 要求因项目而异；SPIA 不要求 GRE",
    notes: "硕士项目较少，以 PhD 为主。TOEFL 口语最低 28 分，IELTS 口语最低 8.0",
    source: "https://gradschool.princeton.edu/admission-onboarding/prepare/english-proficiency",
  },
  {
    id: "northwestern", name: "西北大学", nameEn: "Northwestern University", country: "US", qsRank: 42,
    ieltsMin: 7.0, toeflMin: 100, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.6, other: 3.4 },
    applicationFee: "US$95", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "社科", "法律"],
    extraRequirements: "Kellogg 要求 GMAT/GRE；McCormick 工程项目 GRE 可选",
    notes: "TGS 最低 GPA 3.0/4.0。Kellogg MBA 申请费 US$250。Medill 传媒学院知名",
    source: "https://www.tgs.northwestern.edu/admission/application-procedures/application-requirements/",
  },
  {
    id: "duke", name: "杜克大学", nameEn: "Duke University", country: "US", qsRank: 25,
    ieltsMin: 7.0, toeflMin: 100, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.7, other: 3.5 },
    applicationFee: "US$105", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "法律", "理学", "社科"],
    extraRequirements: "GRE/GMAT（按项目要求）",
    notes: "Fuqua 商学院、Pratt 工程学院、Sanford 公共政策学院均为顶尖。录取竞争激烈",
    source: "https://gradschool.duke.edu/admissions/",
  },
  {
    id: "ut-austin", name: "德克萨斯大学奥斯汀分校", nameEn: "University of Texas at Austin", country: "US", qsRank: 58,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.5, other: 3.3 },
    applicationFee: "US$90", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "理学", "社科"],
    extraRequirements: "GRE（按项目要求，McCombs 接受 GMAT）",
    notes: "McCombs 商学院、Cockrell 工程学院、Moody 传媒学院均为全美顶尖。性价比高",
    source: "https://gradschool.utexas.edu/admissions/apply",
  },
  {
    id: "ucsd", name: "加州大学圣地亚哥分校", nameEn: "UC San Diego", country: "US", qsRank: 62,
    ieltsMin: 7.0, toeflMin: 85, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.5, other: 3.3 },
    applicationFee: "US$155", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科"],
    extraRequirements: "GRE（多数项目 2026 年可选提交）",
    notes: "Jacobs 工程学院和 Rady 商学院实力强。STEM 专业优势突出",
    source: "https://grad.ucsd.edu/admissions/requirements/index.html",
  },
  {
    id: "brown", name: "布朗大学", nameEn: "Brown University", country: "US", qsRank: 73,
    ieltsMin: 7.0, toeflMin: 100, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.5, other: 3.3 },
    applicationFee: "US$75", listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "教育", "理学", "社科"],
    extraRequirements: "GRE（部分项目要求）",
    notes: "常春藤盟校，以本科教育闻名。研究生项目精而少，公共卫生学院和工程学院有硕士项目",
    source: "https://www.brown.edu/admission/graduate",
  },
  {
    id: "uw-madison", name: "威斯康星大学麦迪逊分校", nameEn: "University of Wisconsin-Madison", country: "US", qsRank: 83,
    ieltsMin: 6.5, toeflMin: 80, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.3, other: 3.0 },
    applicationFee: "US$75", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "理学", "社科"],
    extraRequirements: "GRE/GMAT（按项目要求）",
    notes: "公立常春藤，商学院、工程学院和计算机科学均为全美前列。性价比极高",
    source: "https://grad.wisc.edu/admissions/",
  },
  {
    id: "boston-u", name: "波士顿大学", nameEn: "Boston University", country: "US", qsRank: 93,
    ieltsMin: 7.0, toeflMin: 90, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.3, other: 3.0 },
    applicationFee: "US$85", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "法律", "理学", "社科"],
    extraRequirements: "GRE/GMAT（按项目要求）",
    notes: "Questrom 商学院、传媒学院和法学院实力强。位于波士顿，实习资源丰富",
    source: "https://www.bu.edu/grad/admission-funding/graduate-admission/",
  },
  {
    id: "rice", name: "莱斯大学", nameEn: "Rice University", country: "US", qsRank: 96,
    ieltsMin: 7.0, toeflMin: 90, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.5, other: 3.3 },
    applicationFee: "US$85", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科"],
    extraRequirements: "GRE（2026 年多数项目可选提交）",
    notes: "Jones 商学院 MBA 性价比高（96%学生获奖学金）。工程和理学强。位于休斯顿，能源/医疗资源丰富",
    source: "https://graduate.rice.edu/admissions/how-to-apply",
  },
  {
    id: "uw", name: "华盛顿大学", nameEn: "University of Washington", country: "US", qsRank: 81,
    ieltsMin: 7.0, toeflMin: 92, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.5, other: 3.3 },
    applicationFee: "US$85", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "教育", "理学", "社科"],
    extraRequirements: "GRE（部分项目要求）",
    notes: "CS 全美顶尖，Foster 商学院竞争激烈。位于西雅图，科技公司资源丰富",
    source: "https://grad.uw.edu/admissions/",
  },
  {
    id: "penn-state", name: "宾夕法尼亚州立大学", nameEn: "Pennsylvania State University", country: "US", qsRank: 82,
    ieltsMin: 6.5, toeflMin: 80, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.3, other: 3.0 },
    applicationFee: "US$65", listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "教育", "理学", "社科"],
    extraRequirements: "GRE（部分项目要求）",
    notes: "工程和商科强势，Smeal 商学院认可度高。主校区 University Park",
    source: "https://gradschool.psu.edu/admissions/",
  },
  // ═══════════════ CH (瑞士) ═══════════════
  {
    id: "eth-zurich", name: "苏黎世联邦理工学院", nameEn: "ETH Zurich", country: "CH", qsRank: 7,
    ieltsMin: 7.0, toeflMin: 100, gpaScale: "percentage" as const, gpaRequirements: { preferred: 85, other: 88 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "理学"],
    notes: "欧陆第一理工校，工程和自然科学全球顶尖。学费极低（约 CHF 730/学期）",
    source: "https://ethz.ch/en/studies/master.html",
  },
  {
    id: "epfl", name: "洛桑联邦理工学院", nameEn: "EPFL", country: "CH", qsRank: 18,
    ieltsMin: 7.0, toeflMin: 100, gpaScale: "percentage" as const, gpaRequirements: { preferred: 83, other: 85 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "理学"],
    notes: "瑞士法语区顶尖理工校，AI 和生物工程强。学费极低（约 CHF 780/学期）",
    source: "https://www.epfl.ch/education/master/",
  },
  // ═══════════════ JP (日本) ═══════════════
  {
    id: "u-tokyo", name: "东京大学", nameEn: "University of Tokyo", country: "JP", qsRank: 32,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 83 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科"],
    extraRequirements: "部分项目需要日语 N1，英文授课项目(PEAK/GSP)免日语",
    notes: "亚洲顶尖，英文授课项目竞争激烈。研究型为主，需提前联系导师",
    source: "https://www.u-tokyo.ac.jp/en/prospective-students/grad_admissions.html",
  },
  {
    id: "kyoto-u", name: "京都大学", nameEn: "Kyoto University", country: "JP", qsRank: 50,
    ieltsMin: 6.5, toeflMin: 85, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "理学", "社科"],
    extraRequirements: "部分项目需要日语，英文授课项目可免",
    notes: "日本第二名校，学术自由氛围浓。理工科强势",
    source: "https://www.kyoto-u.ac.jp/en/education-campus/education-and-admissions/graduate-degree-programs",
  },
  // ═══════════════ KR (韩国) ═══════════════
  {
    id: "snu", name: "首尔国立大学", nameEn: "Seoul National University", country: "KR", qsRank: 31,
    ieltsMin: 6.0, toeflMin: 80, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 83 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科"],
    extraRequirements: "韩语 TOPIK 4 级或英语成绩",
    notes: "韩国第一学府，学费低廉，奖学金丰富。中国留学生较多",
    source: "https://en.snu.ac.kr/admission/graduate/application",
  },
  {
    id: "kaist", name: "韩国科学技术院", nameEn: "KAIST", country: "KR", qsRank: 39,
    ieltsMin: 6.5, toeflMin: 83, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 83 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "理学", "商科"],
    notes: "韩国顶尖理工校，全英文授课，全额奖学金覆盖率高",
    source: "https://admission.kaist.ac.kr/graduate/",
  },
  {
    id: "yonsei", name: "延世大学", nameEn: "Yonsei University", country: "KR", qsRank: 50,
    ieltsMin: 6.0, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "社科"],
    extraRequirements: "韩语 TOPIK 4 级或英语成绩",
    notes: "SKY 名校之一，商科和传媒强势。首尔市中心校区",
    source: "https://www.yonsei.ac.kr/en_sc/admission/graduate.jsp",
  },
  // ═══════════════ DE (德国) ═══════════════
  {
    id: "tum", name: "慕尼黑工业大学", nameEn: "Technical University of Munich", country: "DE", qsRank: 28,
    ieltsMin: 6.5, toeflMin: 88, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "理学", "商科"],
    extraRequirements: "需要 APS 审核证书",
    notes: "德国第一理工校，学费免费（仅收学期注册费约 €150）。工程和 CS 全球顶尖",
    source: "https://www.tum.de/en/studies/application/",
  },
  {
    id: "lmu", name: "慕尼黑大学", nameEn: "Ludwig Maximilian University of Munich", country: "DE", qsRank: 50,
    ieltsMin: 6.5, toeflMin: 85, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "理学", "社科", "法律"],
    extraRequirements: "需要 APS 审核证书",
    notes: "德国综合排名第一，人文社科强。学费免费",
    source: "https://www.lmu.de/en/study/all-degrees-and-programs/",
  },
  // ═══════════════ NL (荷兰) ═══════════════
  {
    id: "tu-delft", name: "代尔夫特理工大学", nameEn: "Delft University of Technology", country: "NL", qsRank: 47,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "理学"],
    notes: "欧洲顶尖理工校，建筑和工程全球领先。学费约 €18,750/年",
    source: "https://www.tudelft.nl/en/education/programmes/masters",
  },
  {
    id: "uva", name: "阿姆斯特丹大学", nameEn: "University of Amsterdam", country: "NL", qsRank: 53,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "传媒", "社科", "理学"],
    notes: "传媒和商科欧洲顶尖。位于阿姆斯特丹市中心",
    source: "https://www.uva.nl/en/education/master-s/master-s-programmes/masters-programmes.html",
  },
  // ═══════════════ FR (法国) ═══════════════
  {
    id: "psl", name: "巴黎文理研究大学", nameEn: "Paris Sciences et Lettres University", country: "FR", qsRank: 24,
    ieltsMin: 6.5, toeflMin: 85, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 83 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "理学", "社科", "艺术设计"],
    notes: "法国第一，联合体大学（含巴黎高师、巴黎九大等）。部分项目法语授课",
    source: "https://psl.eu/en/education",
  },
  {
    id: "paris-saclay", name: "巴黎萨克雷大学", nameEn: "Université Paris-Saclay", country: "FR", qsRank: 68,
    ieltsMin: 6.5, toeflMin: 85, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "理学", "商科"],
    notes: "法国理工科强校，数学和物理全球领先。部分项目有英文授课选项",
    source: "https://www.universite-paris-saclay.fr/en/education/master",
  },
  // ═══════════════ FR (补充) ═══════════════
  {
    id: "ip-paris", name: "巴黎综合理工学院", nameEn: "Institut Polytechnique de Paris", country: "FR", qsRank: 46,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 82, other: 85 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "理学", "商科"],
    notes: "法国顶尖理工联盟（含 École Polytechnique、ENSTA 等）。英文授课硕士项目丰富",
    source: "https://www.ip-paris.fr/en/education/admissions",
  },
  {
    id: "sorbonne", name: "索邦大学", nameEn: "Sorbonne University", country: "FR", qsRank: 63,
    ieltsMin: 6.5, toeflMin: 85, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["理学", "社科", "法律", "传媒", "计算机", "工程"],
    notes: "法国历史名校，理学和人文全球领先。部分英文授课，学费极低（约€250/年注册费）",
    source: "https://www.sorbonne-universite.fr/en/education",
  },// ═══════════════ US (补充) ═══════════════
  {
    id: "usc", name: "南加州大学", nameEn: "University of Southern California", country: "US", qsRank: 125,
    ieltsMin: 7.0, toeflMin: 90, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.3, other: 3.3 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "艺术设计", "理学", "社科"],
    extraRequirements: "部分项目需 GRE/GMAT",
    applicationFee: "US$90",
    notes: "传媒和电影全美顶尖，CS 和商科也很强。位于洛杉矶",
    source: "https://gradadm.usc.edu/prospective-international-students/",
  },
  {
    id: "uc-davis", name: "加州大学戴维斯分校", nameEn: "University of California, Davis", country: "US", qsRank: 130,
    ieltsMin: 7.0, toeflMin: 80, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.3, other: 3.0 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科", "教育"],
    extraRequirements: "部分项目需 GRE",
    applicationFee: "US$155",
    notes: "UC 系统名校，农业和生物科学全球顶尖。位于加州萨克拉门托附近",
    source: "https://grad.ucdavis.edu/admissions",
  },// ═══════════════ JP (补充) ═══════════════
  {
    id: "tokyo-tech", name: "东京工业大学", nameEn: "Tokyo Institute of Technology", country: "JP", qsRank: 84,
    ieltsMin: 6.5, toeflMin: 80, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "理学"],
    extraRequirements: "需要研究计划书，部分项目需联系导师。2024年与医科牙科大合并为东京科学大学(Institute of Science Tokyo)",
    notes: "日本理工科顶尖，IGPE 英文项目丰富。已与东京医科牙科大合并",
    source: "https://www.isct.ac.jp/en/admissions",
  },
  {
    id: "osaka-u", name: "大阪大学", nameEn: "Osaka University", country: "JP", qsRank: 86,
    ieltsMin: 6.5, toeflMin: 80, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "理学", "社科", "商科"],
    extraRequirements: "需要研究计划书，部分项目需提前联系导师",
    notes: "旧帝大之一，工学和理学实力强。SGU 英文项目（CEED等）",
    source: "https://www.osaka-u.ac.jp/en/admissions/graduate",
  },
  {
    id: "tohoku-u", name: "东北大学", nameEn: "Tohoku University", country: "JP", qsRank: 107,
    ieltsMin: 6.0, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "理学", "计算机", "社科"],
    extraRequirements: "需要研究计划书，建议提前联系导师",
    notes: "旧帝大，材料科学全球领先。IGPAS/FGL 英文项目。仙台生活成本低",
    source: "https://www.tohoku.ac.jp/en/admissions/admission_graduate.html",
  },// ═══════════════ KR (补充) ═══════════════
  {
    id: "korea-u", name: "高丽大学", nameEn: "Korea University", country: "KR", qsRank: 67,
    ieltsMin: 6.0, toeflMin: 80, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 83 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "法律", "传媒", "社科", "理学"],
    extraRequirements: "部分项目需 TOPIK 4级 或 IELTS 6.0+",
    notes: "韩国 SKY 三校之一，商科和法学强。英文授课项目多",
    source: "https://www.korea.edu/en/1032/subview.do",
  },
  {
    id: "postech", name: "浦项科技大学", nameEn: "POSTECH", country: "KR", qsRank: 98,
    ieltsMin: 6.0, toeflMin: 80, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 82 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "理学"],
    notes: "韩国理工科顶尖小型精英校，科研实力强。全英文授课，学费全免+奖学金",
    source: "https://adm-g.postech.ac.kr/ENG/",
  },
  {
    id: "skku", name: "成均馆大学", nameEn: "Sungkyunkwan University", country: "KR", qsRank: 123,
    ieltsMin: 6.0, toeflMin: 80, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "社科", "理学"],
    extraRequirements: "部分项目需 TOPIK 4级",
    notes: "三星深度合作校，半导体和商科强。有英文授课项目",
    source: "https://www.skku.edu/eng/edu/graduateSchool/graduate_school.do",
  },// ═══════════════ CA (补充) ═══════════════// ═══════════════ NZ (新西兰) ═══════════════
  {
    id: "auckland", name: "奥克兰大学", nameEn: "University of Auckland", country: "NZ", qsRank: 65,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "教育", "法律", "理学", "社科", "艺术设计"],
    notes: "新西兰第一，南半球顶尖综合大学。毕业可获工签，移民友好",
    source: "https://www.auckland.ac.nz/en/study/applications-and-admissions/entry-requirements/postgraduate-entry-requirements.html",
  },
  // ═══════════════ DE (补充) ═══════════════
  {
    id: "heidelberg", name: "海德堡大学", nameEn: "Heidelberg University", country: "DE", qsRank: 84,
    ieltsMin: 6.5, toeflMin: 85, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["理学", "社科", "法律", "计算机"],
    extraRequirements: "需要 APS 审核证书",
    notes: "德国最古老大学，医学和自然科学全球领先。学费免费（仅学期注册费）",
    source: "https://www.uni-heidelberg.de/en/study/all-subjects",
  },
  {
    id: "fu-berlin", name: "柏林自由大学", nameEn: "Freie Universität Berlin", country: "DE", qsRank: 97,
    ieltsMin: 6.5, toeflMin: 85, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["社科", "理学", "法律", "传媒"],
    extraRequirements: "需要 APS 审核证书",
    notes: "柏林三大名校之一，人文社科强。学费免费",
    source: "https://www.fu-berlin.de/en/studium/studienangebot/master/index.html",
  },
  {
    id: "rwth-aachen", name: "亚琛工业大学", nameEn: "RWTH Aachen University", country: "DE", qsRank: 99,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "计算机", "理学"],
    extraRequirements: "需要 APS 审核证书。工程类可能需德语",
    notes: "德国工科第一（TU9成员），机械和电气工程全球领先。学费免费",
    source: "https://www.rwth-aachen.de/cms/root/studium/vor-dem-studium/studiengaenge/~csei/internationale-masterprogramme/?lidx=1",
  },
  {
    id: "kit", name: "卡尔斯鲁厄理工学院", nameEn: "Karlsruhe Institute of Technology", country: "DE", qsRank: 102,
    ieltsMin: 6.5, toeflMin: 85, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "计算机", "理学"],
    extraRequirements: "需要 APS 审核证书。巴登-符腾堡州非欧盟学生学费 €1,500/学期",
    notes: "TU9 成员，计算机和工程强。注意：该州对非欧盟学生收学费",
    source: "https://www.sle.kit.edu/english/vorstudium/1019.php",
  },
  {
    id: "hu-berlin", name: "柏林洪堡大学", nameEn: "Humboldt-Universität zu Berlin", country: "DE", qsRank: 126,
    ieltsMin: 6.5, toeflMin: 85, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["社科", "理学", "法律", "传媒"],
    extraRequirements: "需要 APS 审核证书",
    notes: "柏林三大名校之一，29位诺贝尔奖。学费免费",
    source: "https://www.hu-berlin.de/en/studies/counselling/course-catalogue",
  },
  {
    id: "tu-berlin", name: "柏林工业大学", nameEn: "Technische Universität Berlin", country: "DE", qsRank: 147,
    ieltsMin: 6.5, toeflMin: 85, gpaScale: "percentage" as const, gpaRequirements: { preferred: 76, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "计算机", "理学", "商科"],
    extraRequirements: "需要 APS 审核证书。部分项目英文授课",
    notes: "TU9 成员，位于柏林。创新和创业生态好。学费免费",
    source: "https://www.tu.berlin/en/studying/study-programs/all-programs-offered",
  },// ═══════════════ CH (补充) ═══════════════
  {
    id: "uzh", name: "苏黎世大学", nameEn: "University of Zurich", country: "CH", qsRank: 109,
    ieltsMin: 7.0, toeflMin: 100, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 82 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "理学", "社科", "法律"],
    notes: "瑞士最大综合大学，金融和经济学强。学费约 CHF 1,500/学期",
    source: "https://www.uzh.ch/en/studies/application.html",
  },
  {
    id: "basel", name: "巴塞尔大学", nameEn: "University of Basel", country: "CH", qsRank: 131,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["理学", "社科"],
    notes: "瑞士最古老大学，医药和化学强（诺华、罗氏总部所在地）。学费约 CHF 1,700/学期",
    source: "https://www.unibas.ch/en/Studies/Application-Admission.html",
  },// ═══════════════ NL (补充) ═══════════════
  {
    id: "utrecht", name: "乌特勒支大学", nameEn: "Utrecht University", country: "NL", qsRank: 105,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["理学", "社科", "教育", "法律"],
    notes: "荷兰综合排名领先，地球科学和可持续发展强。学费约 €18k/年",
    source: "https://www.uu.nl/en/masters/general-information/application-and-admission",
  },
  {
    id: "tue", name: "埃因霍温理工大学", nameEn: "Eindhoven University of Technology", country: "NL", qsRank: 136,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "计算机", "理学"],
    notes: "荷兰理工名校，与 ASML/飞利浦等高科技企业紧密合作。学费约 €18k/年",
    source: "https://www.tue.nl/en/education/graduate-school/master-programs",
  },
  {
    id: "leiden", name: "莱顿大学", nameEn: "Leiden University", country: "NL", qsRank: 141,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["社科", "法律", "理学"],
    notes: "荷兰最古老大学，国际法和人文强。学费约 €18k/年",
    source: "https://www.universiteitleiden.nl/en/education/masters",
  },// ═══════════════ SE (瑞典) ═══════════════
  {
    id: "kth", name: "瑞典皇家理工学院", nameEn: "KTH Royal Institute of Technology", country: "SE", qsRank: 74,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "理学"],
    notes: "北欧理工第一。学费约 SEK 155k/年（约€14k）。斯德哥尔摩",
    source: "https://www.kth.se/en/studies/master",
  },
  {
    id: "lund", name: "隆德大学", nameEn: "Lund University", country: "SE", qsRank: 75,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科", "法律"],
    notes: "瑞典综合排名最高，北欧顶尖。学费约 SEK 140k-290k/年",
    source: "https://www.lunduniversity.lu.se/admissions/bachelors-and-masters-studies",
  },
  {
    id: "uppsala", name: "乌普萨拉大学", nameEn: "Uppsala University", country: "SE", qsRank: 103,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["理学", "社科", "法律", "工程"],
    notes: "北欧最古老大学（1477年），科研实力强。学费约 SEK 100k-250k/年",
    source: "https://www.uu.se/en/admissions/master",
  },
  {
    id: "stockholm-u", name: "斯德哥尔摩大学", nameEn: "Stockholm University", country: "SE", qsRank: 128,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 76, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["理学", "社科", "法律"],
    notes: "瑞典首都名校，环境科学和社会科学强。学费约 SEK 90k-250k/年",
    source: "https://www.su.se/english/education/how-to-apply",
  },
  {
    id: "chalmers", name: "查尔姆斯理工大学", nameEn: "Chalmers University of Technology", country: "SE", qsRank: 139,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "计算机", "理学"],
    notes: "瑞典工科名校，汽车工程和可持续能源强。哥德堡（沃尔沃总部）。学费约 SEK 160k/年",
    source: "https://www.chalmers.se/en/education/find-masters-programme/",
  },// ═══════════════ DK (丹麦) ═══════════════
  {
    id: "copenhagen", name: "哥本哈根大学", nameEn: "University of Copenhagen", country: "DK", qsRank: 100,
    ieltsMin: 6.5, toeflMin: 83, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 82 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["理学", "社科", "法律", "计算机"],
    notes: "北欧顶尖综合大学，多位诺贝尔奖。学费约 DKK 75k-110k/年（约€10k-15k）",
    source: "https://studies.ku.dk/masters/",
  },
  {
    id: "dtu", name: "丹麦技术大学", nameEn: "Technical University of Denmark", country: "DK", qsRank: 109,
    ieltsMin: 6.5, toeflMin: 88, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "计算机", "理学"],
    notes: "北欧工科顶尖，可持续能源和生物技术强。学费约 DKK 110k/年（约€15k）",
    source: "https://www.dtu.dk/english/education/graduate/admission-and-deadlines",
  },
  {
    id: "aarhus", name: "奥胡斯大学", nameEn: "Aarhus University", country: "DK", qsRank: 144,
    ieltsMin: 6.5, toeflMin: 83, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "理学", "社科", "工程"],
    notes: "丹麦第二大学，政治学和商科强。学费约 DKK 75k-110k/年",
    source: "https://international.au.dk/education/admissions/master",
  },
  // ═══════════════ FI (芬兰) ═══════════════
  {
    id: "aalto", name: "阿尔托大学", nameEn: "Aalto University", country: "FI", qsRank: 113,
    ieltsMin: 6.5, toeflMin: 92, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "商科", "艺术设计"],
    notes: "芬兰理工+商+艺术三合一名校，设计和CS强。学费约€15k/年，奖学金丰厚",
    source: "https://www.aalto.fi/en/study-options",
  },
  {
    id: "helsinki", name: "赫尔辛基大学", nameEn: "University of Helsinki", country: "FI", qsRank: 117,
    ieltsMin: 6.5, toeflMin: 92, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["理学", "社科", "教育", "法律"],
    notes: "芬兰第一名校，教育学和大气科学全球领先。学费约€13k-18k/年",
    source: "https://www.helsinki.fi/en/admissions-and-education/apply-bachelors-and-masters-programmes/apply-international-masters-programmes",
  },
  // ═══════════════ NO (挪威) ═══════════════
  {
    id: "oslo", name: "奥斯陆大学", nameEn: "University of Oslo", country: "NO", qsRank: 119,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["理学", "社科", "法律"],
    notes: "挪威第一，公立大学学费全免（含国际生）！仅需学期注册费约 NOK 600",
    source: "https://www.uio.no/english/studies/programmes/",
  },
  // ═══════════════ IE (爱尔兰) ═══════════════
  {
    id: "trinity-dublin", name: "都柏林圣三一学院", nameEn: "Trinity College Dublin", country: "IE", qsRank: 87,
    ieltsMin: 6.5, toeflMin: 88, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科", "法律"],
    notes: "爱尔兰第一名校，CS 和商科强。位于都柏林（欧洲科技中心）。学费约€18k-25k/年",
    source: "https://www.tcd.ie/study/apply/admission-requirements/postgraduate/",
  },
  {
    id: "ucd", name: "都柏林大学", nameEn: "University College Dublin", country: "IE", qsRank: 126,
    ieltsMin: 6.5, toeflMin: 90, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科", "法律"],
    notes: "爱尔兰最大大学，商学院有三重认证。毕业可获两年工签。学费约€18k-24k/年",
    source: "https://www.ucd.ie/global/study-at-ucd/postgraduate/",
  },
  // ═══════════════ IT (意大利) ═══════════════
  {
    id: "polimi", name: "米兰理工大学", nameEn: "Politecnico di Milano", country: "IT", qsRank: 111,
    ieltsMin: 6.0, toeflMin: 78, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "计算机", "艺术设计"],
    notes: "意大利理工第一，建筑和设计全球顶尖。英文授课硕士多。学费约€3,900/年（按收入分级）",
    source: "https://www.polimi.it/en/programmes/laurea-magistrale-equivalent-to-master-of-science",
  },
  {
    id: "sapienza", name: "罗马大学", nameEn: "Sapienza University of Rome", country: "IT", qsRank: 132,
    ieltsMin: 6.0, toeflMin: 78, gpaScale: "percentage" as const, gpaRequirements: { preferred: 76, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "理学", "社科", "法律", "艺术设计"],
    notes: "欧洲最大大学之一，考古学和物理强。学费极低（约€1k-3k/年）",
    source: "https://www.uniroma1.it/en/admissions",
  },
  {
    id: "bologna", name: "博洛尼亚大学", nameEn: "University of Bologna", country: "IT", qsRank: 133,
    ieltsMin: 6.0, toeflMin: 78, gpaScale: "percentage" as const, gpaRequirements: { preferred: 76, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "工程", "理学", "社科", "法律"],
    notes: "西方最古老大学（1088年），法学和人文传统深厚。学费低（约€2k-4k/年）",
    source: "https://www.unibo.it/en/study/phd-professional-masters-specialisation-schools-and-other-programmes/professional-master",
  },
  // ═══════════════ ES (西班牙) ═══════════════// ═══════════════ BE (比利时) ═══════════════
  {
    id: "ku-leuven", name: "鲁汶大学", nameEn: "KU Leuven", country: "BE", qsRank: 63,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 83 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科", "法律", "教育"],
    notes: "比利时第一，欧洲创新排名常年第一。英文授课硕士多。学费约€6k-12k/年",
    source: "https://www.kuleuven.be/english/prospective-students/admissions",
  },// ═══════════════ AT (奥地利) ═══════════════
  {
    id: "vienna", name: "维也纳大学", nameEn: "University of Vienna", country: "AT", qsRank: 137,
    ieltsMin: 6.5, toeflMin: 88, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["社科", "理学", "法律"],
    notes: "奥地利最大最古老大学，心理学和物理强。学费约€726/学期（非欧盟€1,452）",
    source: "https://studieren.univie.ac.at/en/",
  },// ═══════════════ MY (马来西亚) ═══════════════
  {
    id: "um", name: "马来亚大学", nameEn: "Universiti Malaya", country: "MY", qsRank: 60,
    ieltsMin: 6.0, toeflMin: 80, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "教育", "法律", "理学", "社科"],
    notes: "马来西亚第一，英语授课。学费极低（约 RM 20k-40k/年，约¥3-6万）",
    source: "https://aasc.um.edu.my/faq-postgraduate-admission",
  },
  {
    id: "ukm", name: "马来西亚国民大学", nameEn: "Universiti Kebangsaan Malaysia", country: "MY", qsRank: 138,
    ieltsMin: 6.0, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "工程", "理学", "社科", "教育"],
    notes: "马来西亚综合名校，马来语和英语授课。学费低",
    source: "https://www.ukm.my/pusatsiswazah/general-info/",
  },
  {
    id: "usm", name: "马来西亚理科大学", nameEn: "Universiti Sains Malaysia", country: "MY", qsRank: 146,
    ieltsMin: 6.0, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "理学", "计算机", "社科"],
    notes: "马来西亚理科强校，位于槟城。学费低",
    source: "https://admission.usm.my/",
  },
  {
    id: "upm", name: "马来西亚博特拉大学", nameEn: "Universiti Putra Malaysia", country: "MY", qsRank: 148,
    ieltsMin: 6.0, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "理学", "商科", "社科"],
    notes: "农业和食品科学强。吉隆坡附近。学费低",
    source: "https://www.upm.edu.my/admission/",
  },// ═══════════════ IN (印度) ═══════════════
  {
    id: "iit-bombay", name: "印度理工学院孟买", nameEn: "IIT Bombay", country: "IN", qsRank: 118,
    ieltsMin: 6.0, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 82 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "理学"],
    extraRequirements: "国际生可通过 GRE 申请（无需 GATE）",
    notes: "印度理工科顶尖，CS 和工程全球知名。学费极低。竞争激烈",
    source: "https://www.iitb.ac.in/newacadhome/international.jsp",
  },
  {
    id: "iit-delhi", name: "印度理工学院德里", nameEn: "IIT Delhi", country: "IN", qsRank: 150,
    ieltsMin: 6.0, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 82 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["计算机", "工程", "理学"],
    extraRequirements: "国际生需 GRE 成绩",
    notes: "印度顶尖理工，工程和CS全球认可。学费极低",
    source: "https://home.iitd.ac.in/pg-admissions.php",
  },
  // ═══════════════ SA (沙特) ═══════════════
  {
    id: "kfupm", name: "法赫德国王石油矿产大学", nameEn: "King Fahd University of Petroleum & Minerals", country: "SA", qsRank: 101,
    ieltsMin: 6.0, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "计算机", "理学", "商科"],
    notes: "石油工程全球领先。全额奖学金+住宿（国际生）。英语授课",
    source: "https://admissions.kfupm.edu.sa/en",
  },
  {
    id: "kau", name: "阿卜杜勒阿齐兹国王大学", nameEn: "King Abdulaziz University", country: "SA", qsRank: 149,
    ieltsMin: 5.5, toeflMin: 72, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "理学", "商科", "社科"],
    notes: "沙特综合大学，海洋科学强。部分项目提供奖学金。位于吉达",
    source: "https://kau.edu.sa/en/page/admission-to-postgraduate-studies",
  },// ═══════════════ QA (卡塔尔) ═══════════════
  {
    id: "qu", name: "卡塔尔大学", nameEn: "Qatar University", country: "QA", qsRank: 122,
    ieltsMin: 6.0, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "商科", "理学", "社科"],
    notes: "卡塔尔最大公立大学，英语授课。学费低+奖学金机会",
    source: "https://www.qu.edu.qa/admission/graduate",
  },// ═══════════════ RU (俄罗斯) ═══════════════
  {
    id: "msu", name: "莫斯科国立大学", nameEn: "Lomonosov Moscow State University", country: "RU", qsRank: 94,
    ieltsMin: 6.0, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["理学", "计算机", "工程", "社科", "法律"],
    notes: "俄罗斯第一名校，数学和物理全球领先。学费低（约 $4k-8k/年）。需注意签证政策",
    source: "https://msu.ru/en/admissions/",
  },
  // ═══════════════ ZA (南非) ═══════════════// ═══════════════ AR (阿根廷) ═══════════════
  {
    id: "uba", name: "布宜诺斯艾利斯大学", nameEn: "Universidad de Buenos Aires", country: "AR", qsRank: 71,
    ieltsMin: 6.0, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 75 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科", "法律", "教育"],
    notes: "阿根廷第一，公立大学学费极低甚至免费。西班牙语授课为主",
    source: "https://www.uba.ar/internacionales/contenido.php?id=192",
  },
  // ═══════════════ BR (巴西) ═══════════════
  {
    id: "usp", name: "圣保罗大学", nameEn: "Universidade de São Paulo", country: "BR", qsRank: 92,
    ieltsMin: 6.0, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 75 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "理学", "商科", "社科", "计算机", "法律", "教育"],
    notes: "拉丁美洲第一，公立免学费。葡萄牙语授课为主，部分英文项目",
    source: "https://www5.usp.br/en/education/graduate-studies/",
  },
  // ═══════════════ CL (智利) ═══════════════
  {
    id: "puc-chile", name: "智利天主教大学", nameEn: "Pontificia Universidad Católica de Chile", country: "CL", qsRank: 93,
    ieltsMin: 6.5, toeflMin: 85, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "工程", "理学", "社科"],
    notes: "拉美私立名校，商学院和工程强。西语授课，部分英文项目",
    source: "https://www.uc.cl/en",
  },
  {
    id: "uchile", name: "智利大学", nameEn: "Universidad de Chile", country: "CL", qsRank: 139,
    ieltsMin: 6.0, toeflMin: 80, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["工程", "理学", "社科", "法律"],
    notes: "智利最古老公立大学。学费低。西语授课",
    source: "https://www.uchile.cl/postgrados",
  },
  // ═══════════════ MX (墨西哥) ═══════════════
  {
    id: "unam", name: "墨西哥国立自治大学", nameEn: "Universidad Nacional Autónoma de México", country: "MX", qsRank: 94,
    ieltsMin: 6.0, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 80 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科", "法律", "艺术设计"],
    notes: "拉美顶尖巨型大学（35万学生），世界遗产校园。公立免学费。西语授课",
    source: "https://www.posgrado.unam.mx/",
  },// ═══════════════ CO (哥伦比亚) ═══════════════// ═══════════════ KZ (哈萨克斯坦) ═══════════════// ═══════════════ 艺术设计专排名校 ═══════════════
  {
    id: "rca", name: "皇家艺术学院", nameEn: "Royal College of Art", country: "UK", qsRank: 301,
    ieltsMin: 6.5, toeflMin: 88, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["艺术设计"],
    notes: "QS 艺术设计专排全球第1。纯研究生院（仅授硕士和博士）。需作品集。学费约£34k-37k/年",
    source: "https://www.rca.ac.uk/study/apply/",
  },
  {
    id: "ual", name: "伦敦艺术大学", nameEn: "University of the Arts London", country: "UK", qsRank: 245,
    ieltsMin: 6.5, toeflMin: 88, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["艺术设计", "传媒"],
    notes: "QS 艺术设计专排全球第2。含中央圣马丁(CSM)、伦敦时装学院(LCF)等六大学院。需作品集。学费约£24k-30k/年",
    source: "https://www.arts.ac.uk/study-at-ual/apply/",
  },
  {
    id: "parsons", name: "帕森斯设计学院", nameEn: "Parsons School of Design", country: "US", qsRank: 401,
    ieltsMin: 7.0, toeflMin: 92, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.0, other: 3.0 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["艺术设计"],
    notes: "QS 艺术设计专排全球第3。隶属 The New School。时装和工业设计全美顶尖。需作品集。位于纽约",
    source: "https://www.newschool.edu/parsons/admission/",
  },
  {
    id: "risd", name: "罗德岛设计学院", nameEn: "Rhode Island School of Design", country: "US", qsRank: 401,
    ieltsMin: 6.5, toeflMin: 93, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.0, other: 3.0 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["艺术设计"],
    extraRequirements: "需作品集 + 绘画考试（部分专业）",
    notes: "QS 艺术设计专排全球第4。美国艺术类最高学府之一。工业设计和平面设计全美领先",
    source: "https://www.risd.edu/admissions/graduate",
  },
  {
    id: "pratt", name: "普瑞特艺术学院", nameEn: "Pratt Institute", country: "US", qsRank: 401,
    ieltsMin: 6.5, toeflMin: 82, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.0, other: 3.0 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["艺术设计"],
    extraRequirements: "需作品集",
    notes: "纽约老牌艺术名校。室内设计全美第1，工业设计和建筑也很强",
    source: "https://www.pratt.edu/admissions/graduate-admissions/apply/",
  },
  {
    id: "saic", name: "芝加哥艺术学院", nameEn: "School of the Art Institute of Chicago", country: "US", qsRank: 401,
    ieltsMin: 6.5, toeflMin: 82, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.0, other: 3.0 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["艺术设计"],
    extraRequirements: "需作品集",
    notes: "美国纯艺术和当代艺术顶尖，博物馆资源丰富。MFA 全美领先",
    source: "https://www.saic.edu/admissions/graduate",
  },
  {
    id: "scad", name: "萨凡纳艺术设计学院", nameEn: "Savannah College of Art and Design", country: "US", qsRank: 501,
    ieltsMin: 6.5, toeflMin: 85, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.0, other: 3.0 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["艺术设计", "传媒"],
    extraRequirements: "需作品集（部分专业）",
    notes: "全美最大艺术设计校。动画、游戏设计、交互设计全美领先。中国学生多",
    source: "https://www.scad.edu/admission/graduate",
  },
  {
    id: "goldsmiths", name: "伦敦大学金史密斯学院", nameEn: "Goldsmiths, University of London", country: "UK", qsRank: 382,
    ieltsMin: 6.5, toeflMin: 88, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 78 },
    listPolicy: "open", preferredTiers: [],
    majorCategories: ["艺术设计", "传媒", "社科"],
    notes: "纯艺术和当代艺术英国顶尖（多位 Turner Prize 得主）。设计、传媒也很强",
    source: "https://www.gold.ac.uk/pg/",
  },
];

export const majorCategories = [
  "商科", "计算机", "工程", "传媒", "教育", "法律", "艺术设计", "理学", "社科",
] as const;

// Convert TOEFL to IELTS equivalent (ETS official mapping)
export function toeflToIelts(toefl: number): number {
  if (toefl >= 114) return 9.0;
  if (toefl >= 110) return 8.5;
  if (toefl >= 102) return 8.0;
  if (toefl >= 94) return 7.5;
  if (toefl >= 79) return 7.0;
  if (toefl >= 60) return 6.5;
  if (toefl >= 46) return 6.0;
  if (toefl >= 35) return 5.5;
  if (toefl >= 32) return 5.0;
  return 4.5;
}

// Convert IELTS to TOEFL equivalent
export function ieltsToToefl(ielts: number): number {
  if (ielts >= 9.0) return 118;
  if (ielts >= 8.5) return 113;
  if (ielts >= 8.0) return 110;
  if (ielts >= 7.5) return 102;
  if (ielts >= 7.0) return 94;
  if (ielts >= 6.5) return 79;
  if (ielts >= 6.0) return 60;
  if (ielts >= 5.5) return 46;
  if (ielts >= 5.0) return 35;
  return 32;
}

// Convert Chinese percentage GPA (百分制) to US 4.0 scale (approximate)
export function percentageToGpa4(pct: number): number {
  if (pct >= 90) return 3.7 + (pct - 90) * 0.03; // 90→3.7, 100→4.0
  if (pct >= 80) return 3.0 + (pct - 80) * 0.07; // 80→3.0, 90→3.7
  if (pct >= 70) return 2.0 + (pct - 70) * 0.10; // 70→2.0, 80→3.0
  if (pct >= 60) return 1.0 + (pct - 60) * 0.10; // 60→1.0, 70→2.0
  return 0;
}

export type MatchLevel = "high" | "medium" | "low" | "excluded";

export function matchSchool(
  school: School,
  userTier: string,
  gpa: number,
  langScore: number,
  langTest: "IELTS" | "TOEFL",
  major: string
): { level: MatchLevel; reasons: string[] } {
  const reasons: string[] = [];

  // Check major
  if (!school.majorCategories.includes(major)) {
    return { level: "excluded", reasons: [`该校暂无${major}方向的硕士项目`] };
  }

  // Determine if user is in preferred tier
  const isPreferred = school.preferredTiers.length === 0 || school.preferredTiers.includes(userTier);
  const requiredGpa = isPreferred ? school.gpaRequirements.preferred : school.gpaRequirements.other;

  // Convert user's GPA if the school uses a different scale
  // User always inputs percentage (百分制), but US schools use 4.0
  const userGpaForComparison = school.gpaScale === "gpa4" ? percentageToGpa4(gpa) : gpa;
  const gpaGap = Math.round((requiredGpa - userGpaForComparison) * 10) / 10;
  const requiredLang = langTest === "TOEFL" ? school.toeflMin : school.ieltsMin;
  const langGap = langTest === "TOEFL"
    ? Math.round(requiredLang - langScore)
    : Math.round((requiredLang - langScore) * 10) / 10;

  // For strict list policy, exclude 双非 entirely
  if (school.listPolicy === "strict" && userTier === "双非") {
    return { level: "excluded", reasons: [`该校不接受双非院校申请`] };
  }

  // GPA check — handle different scales
  if (school.gpaScale === "gpa4") {
    const userGpa4 = Math.round(userGpaForComparison * 100) / 100;
    if (userGpaForComparison >= requiredGpa) {
      reasons.push(`GPA ${requiredGpa}/4.0+ ✓ (你: ~${userGpa4}/4.0, 即${gpa}%)`);
    } else {
      reasons.push(`GPA ${requiredGpa}/4.0+ (你: ~${userGpa4}/4.0, 即${gpa}%)`);
    }
  } else {
    if (gpa >= requiredGpa) {
      reasons.push(`GPA ${requiredGpa}%+ ✓ (你: ${gpa}%)`);
    } else {
      reasons.push(`GPA ${requiredGpa}%+ (你: ${gpa}%, 差${gpaGap})`);
    }
  }

  // Language check
  if (langScore >= requiredLang) {
    reasons.push(`${langTest} ${requiredLang}+ ✓`);
  } else {
    reasons.push(`${langTest} ${requiredLang}+ (你: ${langScore}, 差${langGap})`);
  }

  // List/tier status
  if (school.listPolicy === "open") {
    reasons.push("无院校限制 ✓");
  } else if (isPreferred) {
    reasons.push("在优先名单内 ✓");
  } else {
    reasons.push(`非优先名单 (${userTier}，GPA 要求更高)`);
  }

  // Determine match level
  const gpaPassed = userGpaForComparison >= requiredGpa;
  const langPassed = langScore >= requiredLang;
  const gpaCloseThreshold = school.gpaScale === "gpa4" ? 0.3 : 5;
  const gpaClose = gpaGap > 0 && gpaGap <= gpaCloseThreshold;
  const langCloseThreshold = langTest === "TOEFL" ? 5 : 0.5;
  const langClose = langGap > 0 && langGap <= langCloseThreshold;

  if (gpaPassed && langPassed) {
    return { level: "high", reasons };
  } else if ((gpaPassed && langClose) || (gpaClose && langPassed)) {
    return { level: "medium", reasons };
  } else {
    return { level: "low", reasons };
  }
}
