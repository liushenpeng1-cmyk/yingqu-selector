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
      { id: "hospitality", name: "酒店管理/旅游管理", nameEn: "Hospitality & Tourism Management", crossMajorFriendly: true },
      { id: "fintech", name: "金融科技", nameEn: "Financial Technology", crossMajorFriendly: false, typicalBackgrounds: ["商科", "计算机", "理学"] },
      { id: "luxury-management", name: "奢侈品管理", nameEn: "Luxury Brand Management", crossMajorFriendly: true },
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
      { id: "film-tv", name: "影视制作", nameEn: "Film & Television Production", crossMajorFriendly: true },
      { id: "film-studies", name: "电影研究", nameEn: "Film / Cinema Studies", crossMajorFriendly: true },
      { id: "screenwriting", name: "编剧", nameEn: "Screenwriting", crossMajorFriendly: true },
      { id: "documentary", name: "纪录片", nameEn: "Documentary Film", crossMajorFriendly: true },
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
      { id: "landscape-architecture", name: "景观设计", nameEn: "Landscape Architecture", crossMajorFriendly: false, typicalBackgrounds: ["艺术设计", "工程"] },
      { id: "music-production", name: "音乐制作/音乐科技", nameEn: "Music Production / Music Technology", crossMajorFriendly: false },
      { id: "music-performance", name: "音乐表演", nameEn: "Music Performance", crossMajorFriendly: false },
      { id: "music-composition", name: "作曲", nameEn: "Composition", crossMajorFriendly: false },
      { id: "musicology", name: "音乐学/音乐史", nameEn: "Musicology / Music History", crossMajorFriendly: false },
      { id: "sound-design", name: "声音设计/音频工程", nameEn: "Sound Design / Audio Engineering", crossMajorFriendly: false },
      { id: "film-scoring", name: "影视配乐/作曲", nameEn: "Film Scoring / Composition for Screen", crossMajorFriendly: false },
      { id: "music-business", name: "音乐商业/音乐产业", nameEn: "Music Business / Music Industry", crossMajorFriendly: true },
      { id: "music-therapy", name: "音乐治疗", nameEn: "Music Therapy", crossMajorFriendly: false, typicalBackgrounds: ["艺术设计", "医学"] },
      { id: "music-education", name: "音乐教育", nameEn: "Music Education", crossMajorFriendly: false, typicalBackgrounds: ["艺术设计", "教育"] },
      { id: "vfx", name: "视觉特效/后期制作", nameEn: "VFX / Post-production", crossMajorFriendly: false, typicalBackgrounds: ["艺术设计", "计算机"] },
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
      { id: "environmental-science", name: "环境科学", nameEn: "Environmental Science", crossMajorFriendly: false },
      { id: "food-science", name: "食品科学", nameEn: "Food Science", crossMajorFriendly: false },
      { id: "actuarial-science", name: "精算科学", nameEn: "Actuarial Science", crossMajorFriendly: false, typicalBackgrounds: ["理学", "商科"] },
    ],
  },
  {
    id: "medicine",
    name: "医学",
    subMajors: [
      { id: "clinical-medicine", name: "临床医学", nameEn: "Clinical Medicine", crossMajorFriendly: false },
      { id: "dentistry", name: "口腔医学", nameEn: "Dentistry / Stomatology", crossMajorFriendly: false },
      { id: "traditional-chinese-medicine", name: "中医学", nameEn: "Traditional Chinese Medicine", crossMajorFriendly: false },
      { id: "nursing", name: "护理学", nameEn: "Nursing", crossMajorFriendly: false },
      { id: "pharmacy", name: "药学", nameEn: "Pharmacy", crossMajorFriendly: false, typicalBackgrounds: ["医学", "理学"] },
      { id: "public-health", name: "公共卫生", nameEn: "Public Health", crossMajorFriendly: true },
      { id: "epidemiology", name: "流行病学/全球健康", nameEn: "Epidemiology / Global Health", crossMajorFriendly: false, typicalBackgrounds: ["医学", "理学"] },
      { id: "biomedical-science", name: "生物医学/临床科学", nameEn: "Biomedical Sciences / Clinical Science", crossMajorFriendly: false, typicalBackgrounds: ["医学", "理学"] },
      { id: "nutrition", name: "营养学", nameEn: "Nutrition / Dietetics", crossMajorFriendly: false, typicalBackgrounds: ["医学", "理学"] },
      { id: "preventive-medicine", name: "预防医学", nameEn: "Preventive Medicine", crossMajorFriendly: false },
      { id: "rehabilitation", name: "康复治疗", nameEn: "Rehabilitation Science", crossMajorFriendly: false },
      { id: "medical-imaging", name: "医学影像", nameEn: "Medical Imaging", crossMajorFriendly: false },
      { id: "basic-medicine", name: "基础医学", nameEn: "Basic Medical Sciences", crossMajorFriendly: false },
      { id: "forensic-medicine", name: "法医学", nameEn: "Forensic Medicine", crossMajorFriendly: false },
      { id: "anesthesiology", name: "麻醉学", nameEn: "Anesthesiology", crossMajorFriendly: false },
      { id: "medical-lab", name: "医学检验技术", nameEn: "Medical Laboratory Technology", crossMajorFriendly: false },
      { id: "psychiatry", name: "精神医学", nameEn: "Psychiatry / Mental Health", crossMajorFriendly: false },
      { id: "chinese-pharmacology", name: "中药学", nameEn: "Chinese Pharmacology", crossMajorFriendly: false },
      { id: "acupuncture", name: "针灸推拿学", nameEn: "Acupuncture and Tuina", crossMajorFriendly: false },
      { id: "integrated-medicine", name: "中西医临床医学", nameEn: "Integrated Chinese-Western Medicine", crossMajorFriendly: false },
      { id: "optometry", name: "眼视光医学", nameEn: "Optometry", crossMajorFriendly: false },
      { id: "radiation-medicine", name: "放射医学", nameEn: "Radiation Medicine", crossMajorFriendly: false },
      { id: "pediatrics", name: "儿科学", nameEn: "Pediatrics", crossMajorFriendly: false },
      { id: "audiology", name: "听力与言语康复", nameEn: "Audiology and Speech Rehabilitation", crossMajorFriendly: false },
      { id: "health-inspection", name: "卫生检验与检疫", nameEn: "Health Inspection and Quarantine", crossMajorFriendly: false },
      { id: "biopharmaceutics", name: "生物制药", nameEn: "Biopharmaceutics", crossMajorFriendly: false, typicalBackgrounds: ["医学", "理学"] },
      { id: "veterinary", name: "动物医学/兽医", nameEn: "Veterinary Medicine", crossMajorFriendly: false },
      { id: "medical-informatics", name: "医学信息工程", nameEn: "Medical Informatics / Health IT", crossMajorFriendly: false, typicalBackgrounds: ["医学", "计算机"] },
    ],
  },
  {
    id: "psychology",
    name: "心理学",
    subMajors: [
      { id: "psychology", name: "心理学", nameEn: "Psychology", crossMajorFriendly: false },
      { id: "applied-psychology", name: "应用心理学", nameEn: "Applied Psychology", crossMajorFriendly: false },
      { id: "clinical-psychology", name: "临床心理学", nameEn: "Clinical Psychology", crossMajorFriendly: false, typicalBackgrounds: ["心理学", "医学"] },
      { id: "counseling-psychology", name: "心理咨询/咨询心理学", nameEn: "Counselling Psychology", crossMajorFriendly: false, typicalBackgrounds: ["心理学", "教育"] },
      { id: "organizational-psychology", name: "组织心理学/工业心理学", nameEn: "Organizational / Occupational Psychology", crossMajorFriendly: true, typicalBackgrounds: ["心理学", "商科"] },
      { id: "health-psychology", name: "健康心理学", nameEn: "Health Psychology", crossMajorFriendly: false, typicalBackgrounds: ["心理学", "医学"] },
      { id: "forensic-psychology", name: "犯罪心理学/法医心理学", nameEn: "Forensic Psychology", crossMajorFriendly: false, typicalBackgrounds: ["心理学", "社科", "法律"] },
      { id: "developmental-psychology", name: "发展心理学", nameEn: "Developmental Psychology", crossMajorFriendly: false, typicalBackgrounds: ["心理学", "教育"] },
      { id: "cognitive-neuroscience", name: "认知神经科学", nameEn: "Cognitive Neuroscience", crossMajorFriendly: false, typicalBackgrounds: ["心理学", "理学", "医学"] },
      { id: "educational-psychology", name: "教育心理学", nameEn: "Educational Psychology", crossMajorFriendly: false, typicalBackgrounds: ["心理学", "教育"] },
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
      { id: "sports-management", name: "体育管理/运动科学", nameEn: "Sport Management / Sport Science", crossMajorFriendly: true },
      { id: "sports-analytics", name: "体育数据分析/赛事分析", nameEn: "Sports Analytics / Performance Analysis", crossMajorFriendly: true, typicalBackgrounds: ["社科", "计算机", "理学"] },
      { id: "criminology", name: "犯罪学", nameEn: "Criminology", crossMajorFriendly: true },
      { id: "museum-studies", name: "博物馆学/策展", nameEn: "Museum Studies / Curating", crossMajorFriendly: true },
      { id: "sustainability", name: "可持续发展/环境管理", nameEn: "Sustainability / Environmental Management", crossMajorFriendly: true },
      { id: "cultural-industries", name: "文化创意产业", nameEn: "Creative & Cultural Industries", crossMajorFriendly: true },
      { id: "urban-planning", name: "城市规划/城市设计", nameEn: "Urban Planning / Urban Design", crossMajorFriendly: true, typicalBackgrounds: ["社科", "艺术设计", "工程"] },
      { id: "health-management", name: "健康管理/医疗管理", nameEn: "Health Management / Healthcare Administration", crossMajorFriendly: true },
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
  medicine: "医学",
  psychology: "心理学",
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
