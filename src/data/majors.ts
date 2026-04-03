export type MajorCategory = {
  id: string;
  name: string;
  subMajors: SubMajor[];
};

export type SubMajor = {
  id: string;
  name: string;
  nameEn: string;
  // Can this be applied to from unrelated backgrounds?
  crossMajorFriendly: boolean;
  // What undergraduate backgrounds are typically required?
  typicalBackgrounds?: string[];
};

export const majorCategories: MajorCategory[] = [
  {
    id: "business",
    name: "商科",
    subMajors: [
      { id: "finance", name: "金融", nameEn: "Finance", crossMajorFriendly: false, typicalBackgrounds: ["商科", "理学", "工程"] },
      { id: "accounting", name: "会计", nameEn: "Accounting", crossMajorFriendly: false, typicalBackgrounds: ["商科"] },
      { id: "management", name: "管理学", nameEn: "Management", crossMajorFriendly: true },
      { id: "marketing", name: "市场营销", nameEn: "Marketing", crossMajorFriendly: true },
      { id: "mba", name: "MBA", nameEn: "MBA", crossMajorFriendly: true, typicalBackgrounds: ["任何背景，需工作经验"] },
      { id: "business-analytics", name: "商业分析", nameEn: "Business Analytics", crossMajorFriendly: false, typicalBackgrounds: ["商科", "计算机", "理学"] },
      { id: "international-business", name: "国际商务", nameEn: "International Business", crossMajorFriendly: true },
      { id: "supply-chain", name: "供应链管理", nameEn: "Supply Chain Management", crossMajorFriendly: true },
      { id: "hr", name: "人力资源管理", nameEn: "Human Resource Management", crossMajorFriendly: true },
      { id: "economics", name: "经济学", nameEn: "Economics", crossMajorFriendly: false, typicalBackgrounds: ["商科", "理学"] },
      { id: "real-estate", name: "房地产/金融地产", nameEn: "Real Estate", crossMajorFriendly: false, typicalBackgrounds: ["商科", "工程"] },
      { id: "entrepreneurship", name: "创业学", nameEn: "Entrepreneurship", crossMajorFriendly: true },
    ],
  },
  {
    id: "cs",
    name: "计算机",
    subMajors: [
      { id: "computer-science", name: "计算机科学", nameEn: "Computer Science", crossMajorFriendly: false, typicalBackgrounds: ["计算机", "理学"] },
      { id: "data-science", name: "数据科学", nameEn: "Data Science", crossMajorFriendly: false, typicalBackgrounds: ["计算机", "理学", "商科"] },
      { id: "ai-ml", name: "人工智能/机器学习", nameEn: "AI / Machine Learning", crossMajorFriendly: false, typicalBackgrounds: ["计算机", "理学"] },
      { id: "software-engineering", name: "软件工程", nameEn: "Software Engineering", crossMajorFriendly: false, typicalBackgrounds: ["计算机", "工程"] },
      { id: "cybersecurity", name: "网络安全", nameEn: "Cybersecurity", crossMajorFriendly: false, typicalBackgrounds: ["计算机", "工程"] },
      { id: "information-systems", name: "信息系统", nameEn: "Information Systems", crossMajorFriendly: true, typicalBackgrounds: ["计算机", "商科"] },
      { id: "hci", name: "人机交互", nameEn: "HCI / UX Design", crossMajorFriendly: true, typicalBackgrounds: ["计算机", "艺术设计", "社科"] },
    ],
  },
  {
    id: "engineering",
    name: "工程",
    subMajors: [
      { id: "electrical-engineering", name: "电子电气工程", nameEn: "Electrical & Electronic Engineering", crossMajorFriendly: false },
      { id: "mechanical-engineering", name: "机械工程", nameEn: "Mechanical Engineering", crossMajorFriendly: false },
      { id: "civil-engineering", name: "土木工程", nameEn: "Civil Engineering", crossMajorFriendly: false },
      { id: "chemical-engineering", name: "化学工程", nameEn: "Chemical Engineering", crossMajorFriendly: false },
      { id: "biomedical-engineering", name: "生物医学工程", nameEn: "Biomedical Engineering", crossMajorFriendly: false },
      { id: "environmental-engineering", name: "环境工程", nameEn: "Environmental Engineering", crossMajorFriendly: false },
      { id: "materials-science", name: "材料科学", nameEn: "Materials Science", crossMajorFriendly: false },
      { id: "aerospace-engineering", name: "航空航天工程", nameEn: "Aerospace Engineering", crossMajorFriendly: false },
      { id: "engineering-management", name: "工程管理", nameEn: "Engineering Management", crossMajorFriendly: true, typicalBackgrounds: ["工程", "商科"] },
    ],
  },
  {
    id: "media",
    name: "传媒",
    subMajors: [
      { id: "journalism", name: "新闻学", nameEn: "Journalism", crossMajorFriendly: true },
      { id: "public-relations", name: "公共关系", nameEn: "Public Relations", crossMajorFriendly: true },
      { id: "digital-media", name: "数字媒体", nameEn: "Digital Media", crossMajorFriendly: true },
      { id: "advertising", name: "广告学", nameEn: "Advertising", crossMajorFriendly: true },
      { id: "film-tv", name: "影视制作", nameEn: "Film & Television", crossMajorFriendly: true },
      { id: "media-studies", name: "媒体研究", nameEn: "Media Studies", crossMajorFriendly: true },
      { id: "strategic-communication", name: "战略传播", nameEn: "Strategic Communication", crossMajorFriendly: true },
    ],
  },
  {
    id: "education",
    name: "教育",
    subMajors: [
      { id: "tesol", name: "TESOL/对外英语教学", nameEn: "TESOL", crossMajorFriendly: true },
      { id: "education-studies", name: "教育学", nameEn: "Education Studies", crossMajorFriendly: true },
      { id: "educational-psychology", name: "教育心理学", nameEn: "Educational Psychology", crossMajorFriendly: false, typicalBackgrounds: ["教育", "社科"] },
      { id: "educational-tech", name: "教育技术", nameEn: "Educational Technology", crossMajorFriendly: true },
      { id: "higher-education", name: "高等教育", nameEn: "Higher Education", crossMajorFriendly: true },
      { id: "early-childhood", name: "学前教育", nameEn: "Early Childhood Education", crossMajorFriendly: true },
    ],
  },
  {
    id: "law",
    name: "法律",
    subMajors: [
      { id: "llm-general", name: "法学硕士 (LLM)", nameEn: "LLM", crossMajorFriendly: false, typicalBackgrounds: ["法律"] },
      { id: "international-law", name: "国际法", nameEn: "International Law", crossMajorFriendly: false, typicalBackgrounds: ["法律"] },
      { id: "commercial-law", name: "商法", nameEn: "Commercial Law", crossMajorFriendly: false, typicalBackgrounds: ["法律", "商科"] },
      { id: "ip-law", name: "知识产权法", nameEn: "Intellectual Property Law", crossMajorFriendly: false, typicalBackgrounds: ["法律"] },
      { id: "human-rights-law", name: "人权法", nameEn: "Human Rights Law", crossMajorFriendly: false, typicalBackgrounds: ["法律", "社科"] },
    ],
  },
  {
    id: "art-design",
    name: "艺术设计",
    subMajors: [
      { id: "graphic-design", name: "平面设计", nameEn: "Graphic Design", crossMajorFriendly: false },
      { id: "industrial-design", name: "工业设计", nameEn: "Industrial Design", crossMajorFriendly: false },
      { id: "fashion-design", name: "服装设计", nameEn: "Fashion Design", crossMajorFriendly: false },
      { id: "interior-design", name: "室内设计", nameEn: "Interior Design", crossMajorFriendly: false },
      { id: "architecture", name: "建筑学", nameEn: "Architecture", crossMajorFriendly: false },
      { id: "fine-art", name: "纯艺术", nameEn: "Fine Art", crossMajorFriendly: true },
      { id: "animation", name: "动画/游戏设计", nameEn: "Animation & Game Design", crossMajorFriendly: false },
      { id: "ux-ui", name: "交互设计/UI", nameEn: "Interaction Design / UI", crossMajorFriendly: true, typicalBackgrounds: ["艺术设计", "计算机"] },
    ],
  },
  {
    id: "science",
    name: "理学",
    subMajors: [
      { id: "mathematics", name: "数学", nameEn: "Mathematics", crossMajorFriendly: false },
      { id: "physics", name: "物理学", nameEn: "Physics", crossMajorFriendly: false },
      { id: "chemistry", name: "化学", nameEn: "Chemistry", crossMajorFriendly: false },
      { id: "biology", name: "生物学", nameEn: "Biology", crossMajorFriendly: false },
      { id: "statistics", name: "统计学", nameEn: "Statistics", crossMajorFriendly: false, typicalBackgrounds: ["理学", "商科"] },
      { id: "psychology", name: "心理学", nameEn: "Psychology", crossMajorFriendly: false, typicalBackgrounds: ["理学", "社科"] },
      { id: "environmental-science", name: "环境科学", nameEn: "Environmental Science", crossMajorFriendly: false },
      { id: "food-science", name: "食品科学", nameEn: "Food Science", crossMajorFriendly: false },
      { id: "pharmacy", name: "药学", nameEn: "Pharmacy", crossMajorFriendly: false },
      { id: "public-health", name: "公共卫生", nameEn: "Public Health", crossMajorFriendly: true },
    ],
  },
  {
    id: "social-science",
    name: "社科",
    subMajors: [
      { id: "international-relations", name: "国际关系", nameEn: "International Relations", crossMajorFriendly: true },
      { id: "sociology", name: "社会学", nameEn: "Sociology", crossMajorFriendly: true },
      { id: "political-science", name: "政治学", nameEn: "Political Science", crossMajorFriendly: true },
      { id: "public-policy", name: "公共政策", nameEn: "Public Policy", crossMajorFriendly: true },
      { id: "social-work", name: "社会工作", nameEn: "Social Work", crossMajorFriendly: true },
      { id: "linguistics", name: "语言学", nameEn: "Linguistics", crossMajorFriendly: true },
      { id: "translation", name: "翻译/口译", nameEn: "Translation & Interpreting", crossMajorFriendly: false, typicalBackgrounds: ["社科", "教育"] },
      { id: "anthropology", name: "人类学", nameEn: "Anthropology", crossMajorFriendly: true },
      { id: "history", name: "历史学", nameEn: "History", crossMajorFriendly: true },
      { id: "philosophy", name: "哲学", nameEn: "Philosophy", crossMajorFriendly: true },
      { id: "geography", name: "地理学", nameEn: "Geography", crossMajorFriendly: true },
    ],
  },
];

// Flat list of all sub-majors for search
export const allSubMajors: (SubMajor & { categoryId: string; categoryName: string })[] =
  majorCategories.flatMap((cat) =>
    cat.subMajors.map((sub) => ({ ...sub, categoryId: cat.id, categoryName: cat.name }))
  );

// Get parent category ID from sub-major ID
export function getCategoryIdFromSubMajor(subMajorId: string): string | null {
  for (const cat of majorCategories) {
    if (cat.subMajors.some((s) => s.id === subMajorId)) {
      return cat.id;
    }
  }
  return null;
}

// Map category ID to the old category name used in school data
export const categoryIdToName: Record<string, string> = {
  business: "商科",
  cs: "计算机",
  engineering: "工程",
  media: "传媒",
  education: "教育",
  law: "法律",
  "art-design": "艺术设计",
  science: "理学",
  "social-science": "社科",
};

// Check cross-major compatibility
export function checkCrossMajor(
  currentCategoryId: string,
  targetSubMajor: SubMajor & { categoryId: string }
): { compatible: boolean; note: string } {
  // Same category = always fine
  if (currentCategoryId === targetSubMajor.categoryId) {
    return { compatible: true, note: "" };
  }

  // Target is cross-major friendly
  if (targetSubMajor.crossMajorFriendly) {
    return {
      compatible: true,
      note: `${targetSubMajor.name} 接受跨专业申请`,
    };
  }

  // Check if current background is in typical backgrounds
  const currentName = categoryIdToName[currentCategoryId];
  if (targetSubMajor.typicalBackgrounds?.includes(currentName)) {
    return {
      compatible: true,
      note: `${targetSubMajor.name} 接受${currentName}背景申请`,
    };
  }

  return {
    compatible: false,
    note: `${targetSubMajor.name} 通常要求相关本科背景，跨专业申请难度较大`,
  };
}
