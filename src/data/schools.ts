// GPA requirements differ by whether the student's university is on the school's "preferred" list
export type GpaByTier = {
  preferred: number; // 985/211/双一流 or on school's specific list
  other: number;     // 双非 / not on list
};

export type Region = "UK" | "AU" | "HK" | "SG" | "US" | "CA";

export const regionLabels: Record<Region, string> = {
  UK: "🇬🇧 英国",
  AU: "🇦🇺 澳洲",
  HK: "🇭🇰 香港",
  SG: "🇸🇬 新加坡",
  US: "🇺🇸 美国",
  CA: "🇨🇦 加拿大",
};

export const regionInfo: Record<Region, { gpaSystem: string; keyFactors: string }> = {
  UK: { gpaSystem: "百分制", keyFactors: "GPA + IELTS + 院校 List" },
  AU: { gpaSystem: "百分制", keyFactors: "GPA + IELTS + 985/211 分层" },
  HK: { gpaSystem: "百分制/4.0", keyFactors: "GPA + IELTS + 面试(部分)" },
  SG: { gpaSystem: "百分制/4.0", keyFactors: "GPA + IELTS/TOEFL + GRE(部分)" },
  US: { gpaSystem: "4.0 制", keyFactors: "GPA + TOEFL/IELTS + GRE/GMAT" },
  CA: { gpaSystem: "百分制/4.0", keyFactors: "GPA + IELTS/TOEFL" },
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
  if (school.country === "US" || school.country === "CA") {
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
    qsRank: 105,
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
  },
  {
    id: "deakin",
    name: "迪肯大学",
    nameEn: "Deakin University",
    country: "AU",
    qsRank: 185,
    ieltsMin: 6.0, toeflMin: 60,
    gpaScale: "percentage" as const,
    gpaRequirements: { preferred: 63, other: 70  },
    listPolicy: "open",
    preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认，建议查官网",
    source: "https://www.deakin.edu.au/courses/entry-requirements/international",
  },
  // ═══════════════ NEW UK (QS top 300, not yet verified) ═══════════════
  {
    id: "imperial", name: "帝国理工学院", nameEn: "Imperial College London", country: "UK", qsRank: 2,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "percentage" as const, gpaRequirements: { preferred: 85, other: 90 },
    applicationFee: "£80", listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "理学"],
    notes: "⚠️ 数据待确认。工科/理科为主，商学院极其竞争",
    source: "https://www.imperial.ac.uk/study/apply/postgraduate-taught/entry-requirements/",
  },
  {
    id: "oxford", name: "牛津大学", nameEn: "University of Oxford", country: "UK", qsRank: 3,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "percentage" as const, gpaRequirements: { preferred: 87, other: 90 },
    applicationFee: "£75", listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。竞争极其激烈，GPA 仅为最低门槛",
    source: "https://www.ox.ac.uk/admissions/graduate/international-applicants/country-specific-guidance/",
  },
  {
    id: "cambridge", name: "剑桥大学", nameEn: "University of Cambridge", country: "UK", qsRank: 5,
    ieltsMin: 7.5, toeflMin: 102, gpaScale: "percentage" as const, gpaRequirements: { preferred: 87, other: 90 },
    applicationFee: "£85", listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。要求极高，建议 90%+",
    source: "https://www.graduate.study.cam.ac.uk/international-students",
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
    source: "https://www.southampton.ac.uk/uni-life/international/your-country/china.page",
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
    source: "https://www.st-andrews.ac.uk/subjects/entry-requirements/",
  },
  {
    id: "nottingham", name: "诺丁汉大学", nameEn: "University of Nottingham", country: "UK", qsRank: 108,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 80  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。对双非相对友好",
    source: "https://www.nottingham.ac.uk/studywithus/international-applicants/country-specific-information/china.aspx",
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
    source: "https://www.lancaster.ac.uk/study/international-students/your-country/china/",
  },
  {
    id: "bath", name: "巴斯大学", nameEn: "University of Bath", country: "UK", qsRank: 150,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 83  }, listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科"],
    notes: "⚠️ 数据待确认。商科竞争强",
    source: "https://www.bath.ac.uk/study/pg/apply/international/",
  },
  {
    id: "liverpool", name: "利物浦大学", nameEn: "University of Liverpool", country: "UK", qsRank: 165,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 73, other: 78  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认。对双非友好",
    source: "https://www.liverpool.ac.uk/study/international/countries/china/",
  },
  {
    id: "exeter", name: "埃克塞特大学", nameEn: "University of Exeter", country: "UK", qsRank: 169,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 80  }, listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认",
    source: "https://www.exeter.ac.uk/study/international/your-country/china/",
  },
  {
    id: "reading", name: "雷丁大学", nameEn: "University of Reading", country: "UK", qsRank: 172,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 73, other: 78  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认",
    source: "https://www.reading.ac.uk/international/countries/china/",
  },
  {
    id: "york", name: "约克大学", nameEn: "University of York", country: "UK", qsRank: 184,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 73, other: 78  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认",
    source: "https://www.york.ac.uk/study/international/your-country/china/",
  },
  {
    id: "cardiff", name: "卡迪夫大学", nameEn: "Cardiff University", country: "UK", qsRank: 186,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 73, other: 78  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认",
    source: "https://www.cardiff.ac.uk/international/your-country/china",
  },
  {
    id: "queens-belfast", name: "贝尔法斯特女王大学", nameEn: "Queen's University Belfast", country: "UK", qsRank: 206,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 70, other: 75  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。门槛较低，对双非友好",
    source: "https://www.qub.ac.uk/International/international-students/your-country/china/",
  },
  {
    id: "loughborough", name: "拉夫堡大学", nameEn: "Loughborough University", country: "UK", qsRank: 224,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 73, other: 78  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "艺术设计", "理学", "社科"],
    notes: "⚠️ 数据待确认。体育和设计专业强",
    source: "https://www.lboro.ac.uk/international/your-country/china/",
  },
  {
    id: "aberdeen", name: "阿伯丁大学", nameEn: "University of Aberdeen", country: "UK", qsRank: 236,
    ieltsMin: 6.0, toeflMin: 60, gpaScale: "percentage" as const, gpaRequirements: { preferred: 70, other: 75  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。门槛较低",
    source: "https://www.abdn.ac.uk/study/international/country-information-289.php",
  },
  {
    id: "sussex", name: "萨塞克斯大学", nameEn: "University of Sussex", country: "UK", qsRank: 246,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 70, other: 75  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认",
    source: "https://www.sussex.ac.uk/study/international-students/your-country/china",
  },
  {
    id: "heriot-watt", name: "赫瑞瓦特大学", nameEn: "Heriot-Watt University", country: "UK", qsRank: 256,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 70, other: 75  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学"],
    notes: "⚠️ 数据待确认。精算和石油工程强",
    source: "https://www.hw.ac.uk/study/international/country/china.htm",
  },
  {
    id: "strathclyde", name: "思克莱德大学", nameEn: "University of Strathclyde", country: "UK", qsRank: 281,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 70, other: 75  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "理学", "社科"],
    notes: "⚠️ 数据待确认。商学院三重认证",
    source: "https://www.strath.ac.uk/studywithus/internationalstudents/yourcountry/china/",
  },
  {
    id: "leicester", name: "莱斯特大学", nameEn: "University of Leicester", country: "UK", qsRank: 285,
    ieltsMin: 6.0, toeflMin: 60, gpaScale: "percentage" as const, gpaRequirements: { preferred: 70, other: 75  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认",
    source: "https://le.ac.uk/international/countries/china",
  },
  {
    id: "surrey", name: "萨里大学", nameEn: "University of Surrey", country: "UK", qsRank: 285,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 70, other: 75  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "理学", "社科"],
    notes: "⚠️ 数据待确认。酒店管理强",
    source: "https://www.surrey.ac.uk/international/country/china",
  },
  {
    id: "swansea", name: "斯旺西大学", nameEn: "Swansea University", country: "UK", qsRank: 298,
    ieltsMin: 6.0, toeflMin: 60, gpaScale: "percentage" as const, gpaRequirements: { preferred: 68, other: 73  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "理学", "社科"],
    notes: "⚠️ 数据待确认。门槛较低",
    source: "https://www.swansea.ac.uk/international/students/your-country/china/",
  },
  // ═══════════════ NEW AU (QS top 300, not yet verified) ═══════════════
  {
    id: "western-australia", name: "西澳大学", nameEn: "University of Western Australia", country: "AU", qsRank: 77,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 70, other: 78  }, listPolicy: "tiered", preferredTiers: ["985", "211", "双一流"],
    majorCategories: ["商科", "计算机", "工程", "教育", "法律", "理学", "社科"],
    notes: "八大之一。标准 IELTS 6.5/6.0，法律 7.0/6.5，教育 7.5/6.5+",
    source: "https://www.uwa.edu.au/study/how-to-apply/international-students/entry-requirements",
  },
  {
    id: "uts", name: "悉尼科技大学", nameEn: "University of Technology Sydney", country: "AU", qsRank: 88,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 72, other: 78  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "教育", "传媒", "艺术设计", "理学", "社科"],
    notes: "⚠️ 数据待确认。IT 和传媒强",
    source: "https://www.uts.edu.au/study/international/essential-information/entry-requirements",
  },
  {
    id: "wollongong", name: "伍伦贡大学", nameEn: "University of Wollongong", country: "AU", qsRank: 167,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 68, other: 73  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认",
    source: "https://www.uow.edu.au/study/international/apply/",
  },
  {
    id: "curtin", name: "科廷大学", nameEn: "Curtin University", country: "AU", qsRank: 174,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 68, other: 73  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "理学", "社科"],
    notes: "⚠️ 数据待确认。矿业和石油工程强",
    source: "https://www.curtin.edu.au/study/international-students/",
  },
  {
    id: "newcastle-au", name: "纽卡斯尔大学(澳)", nameEn: "University of Newcastle (AU)", country: "AU", qsRank: 179,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 68, other: 73  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认",
    source: "https://www.newcastle.edu.au/international/study-with-us",
  },
  {
    id: "qut", name: "昆士兰科技大学", nameEn: "Queensland University of Technology", country: "AU", qsRank: 189,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 68, other: 73  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "艺术设计", "理学", "社科"],
    notes: "⚠️ 数据待确认。传媒和创意产业强",
    source: "https://www.qut.edu.au/study/international/applying",
  },
  {
    id: "la-trobe", name: "乐卓博大学", nameEn: "La Trobe University", country: "AU", qsRank: 217,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 65, other: 70  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认",
    source: "https://www.latrobe.edu.au/international/how-to-apply",
  },
  {
    id: "griffith", name: "格里菲斯大学", nameEn: "Griffith University", country: "AU", qsRank: 243,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 65, other: 70  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认。酒店管理和旅游强",
    source: "https://www.griffith.edu.au/international/apply",
  },
  {
    id: "tasmania", name: "塔斯马尼亚大学", nameEn: "University of Tasmania", country: "AU", qsRank: 293,
    ieltsMin: 6.0, toeflMin: 60, gpaScale: "percentage" as const, gpaRequirements: { preferred: 63, other: 68  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认。门槛较低，偏远地区加分",
    source: "https://www.utas.edu.au/international/study",
  },
  // ═══════════════ HK 香港 ═══════════════
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
    ieltsMin: 6.0, toeflMin: 60, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 83  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "艺术设计", "理学", "社科"],
    notes: "⚠️ 数据待确认。酒店管理和设计全球顶尖",
    source: "https://www.polyu.edu.hk/study/pg/taught-postgraduate",
  },
  {
    id: "hkbu", name: "香港浸会大学", nameEn: "Hong Kong Baptist University", country: "HK", qsRank: 252,
    ieltsMin: 6.0, toeflMin: 60, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 80  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "传媒", "教育", "艺术设计", "理学", "社科"],
    notes: "⚠️ 数据待确认。传媒专业强",
    source: "https://gs.hkbu.edu.hk/admission/taught-postgraduate-programmes",
  },
  // ═══════════════ SG 新加坡 ═══════════════
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
  },
  {
    id: "smu", name: "新加坡管理大学", nameEn: "Singapore Management University", country: "SG", qsRank: 162,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 80, other: 85  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "法律", "社科"],
    extraRequirements: "商科需 GMAT/GRE",
    notes: "⚠️ 数据待确认。商科和金融专精",
    source: "https://admissions.smu.edu.sg/postgraduate",
  },
  // ═══════════════ CA 加拿大 ═══════════════
  {
    id: "toronto", name: "多伦多大学", nameEn: "University of Toronto", country: "CA", qsRank: 25,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "percentage" as const, gpaRequirements: { preferred: 83, other: 85  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。加拿大第一，要求 B+ 以上",
    source: "https://www.sgs.utoronto.ca/admissions/",
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
  },
  {
    id: "montreal", name: "蒙特利尔大学", nameEn: "Université de Montréal", country: "CA", qsRank: 159,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。法语授课为主，部分英语项目",
    source: "https://admission.umontreal.ca/en/",
  },
  {
    id: "ottawa", name: "渥太华大学", nameEn: "University of Ottawa", country: "CA", qsRank: 189,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 75, other: 78  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。英法双语大学",
    source: "https://www.uottawa.ca/graduate-studies/programs-admission",
  },
  {
    id: "queens-ca", name: "女王大学", nameEn: "Queen's University", country: "CA", qsRank: 197,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "教育", "法律", "理学", "社科"],
    notes: "⚠️ 数据待确认。Smith 商学院知名",
    source: "https://www.queensu.ca/sgs/prospective-students/applying",
  },
  {
    id: "mcmaster", name: "麦克马斯特大学", nameEn: "McMaster University", country: "CA", qsRank: 176,
    ieltsMin: 6.5, toeflMin: 79, gpaScale: "percentage" as const, gpaRequirements: { preferred: 78, other: 80  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "教育", "理学", "社科"],
    notes: "⚠️ 数据待确认。工程和健康科学强",
    source: "https://gs.mcmaster.ca/admissions/",
  },
  // ═══════════════ US 美国 (QS top 100) ═══════════════
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
    source: "https://www.caltech.edu/admissions/graduate-admissions",
  },
  {
    id: "upenn", name: "宾夕法尼亚大学", nameEn: "University of Pennsylvania", country: "US", qsRank: 11,
    ieltsMin: 7.0, toeflMin: 94, gpaScale: "gpa4" as const, gpaRequirements: { preferred: 3.6, other: 3.6  }, listPolicy: "open", preferredTiers: [],
    majorCategories: ["商科", "计算机", "工程", "传媒", "教育", "法律", "理学", "社科"],
    extraRequirements: "GRE/GMAT（按项目）",
    notes: "⚠️ 数据待确认。沃顿商学院",
    source: "https://www.upenn.edu/admissions/grad",
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
    source: "https://www.cmu.edu/admission/graduate/index.html",
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
