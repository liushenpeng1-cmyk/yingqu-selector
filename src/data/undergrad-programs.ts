// ═══════════════ Undergraduate Programs Data & Matching ═══════════════

export type ALevelGrade = "A*" | "A" | "B" | "C" | "D" | "E";

export type UndergradProgram = {
  id: string;
  schoolId: string;
  name: string;
  nameEn: string;
  subjectArea: string;
  alpiLevel: string; // e.g. "A*A*A", "AAA", "ABB"
  requiredSubjects?: string[]; // A-Level subjects that must be included
  ibScore?: number;
  gaokaoPercent?: number; // minimum % of gaokao total; undefined = not accepted
  ieltsOverall: number;
  duration: string;
  tuitionFee?: string;
  notes?: string;
  source?: string;
};

export type UndergradMatchLevel = "high" | "medium" | "low" | "excluded";

export type UndergradMatchResult = {
  program: UndergradProgram;
  level: UndergradMatchLevel;
  reason: string;
};

export type UndergradSchoolResult = {
  schoolId: string;
  schoolName: string;
  schoolNameEn: string;
  programs: UndergradMatchResult[];
  bestLevel: UndergradMatchLevel | "excluded";
};

// ── Subject areas ──
export const undergradSubjectAreas = [
  { id: "mathematics", name: "数学", nameEn: "Mathematics" },
  { id: "computer-science", name: "计算机科学", nameEn: "Computer Science" },
  { id: "engineering", name: "工程", nameEn: "Engineering" },
  { id: "physics", name: "物理", nameEn: "Physics" },
  { id: "chemistry", name: "化学", nameEn: "Chemistry" },
  { id: "biology", name: "生物", nameEn: "Biology" },
  { id: "medicine", name: "医学", nameEn: "Medicine" },
  { id: "economics", name: "经济学", nameEn: "Economics" },
  { id: "business", name: "商业管理", nameEn: "Business & Management" },
  { id: "accounting-finance", name: "会计与金融", nameEn: "Accounting & Finance" },
  { id: "law", name: "法律", nameEn: "Law" },
  { id: "psychology", name: "心理学", nameEn: "Psychology" },
  { id: "architecture", name: "建筑", nameEn: "Architecture" },
];

// ── A-Level subject list ──
export const alevelSubjects = [
  "Mathematics", "Further Mathematics", "Physics", "Chemistry", "Biology",
  "Computer Science", "Economics", "Business Studies", "Accounting",
  "Psychology", "Sociology", "History", "Geography", "English Literature",
  "Art & Design", "Music", "Drama & Theatre", "Politics", "Philosophy",
  "Design & Technology", "French", "Spanish", "German", "Chinese",
];

// ── Grade conversion ──
const gradeValue: Record<string, number> = { "A*": 6, "A": 5, "B": 4, "C": 3, "D": 2, "E": 1 };

function parseRequirement(req: string): number[] {
  const grades: number[] = [];
  let i = 0;
  while (i < req.length) {
    if (req[i] === "A" && req[i + 1] === "*") {
      grades.push(6);
      i += 2;
    } else {
      grades.push(gradeValue[req[i]] || 0);
      i++;
    }
  }
  return grades.sort((a, b) => b - a);
}

// ── School info for display (only schools not in main schools.ts) ──
export const undergradOnlySchools: Record<string, { name: string; nameEn: string }> = {
  "exeter": { name: "埃克塞特大学", nameEn: "University of Exeter" },
  "st-andrews": { name: "圣安德鲁斯大学", nameEn: "University of St Andrews" },
};

// ═══════════════ PROGRAMS DATA ═══════════════

export const undergradPrograms: UndergradProgram[] = [

  // ── Oxford ──
  { id: "ox-maths", schoolId: "oxford", name: "数学", nameEn: "Mathematics BA", subjectArea: "mathematics", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics", "Further Mathematics"], ibScore: 39, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£39,010", notes: "需 MAT 入学考试" },
  { id: "ox-cs", schoolId: "oxford", name: "计算机科学", nameEn: "Computer Science BA", subjectArea: "computer-science", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 39, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£39,010", notes: "需 MAT 入学考试" },
  { id: "ox-engineering", schoolId: "oxford", name: "工程科学", nameEn: "Engineering Science MEng", subjectArea: "engineering", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics", "Physics"], ibScore: 40, ieltsOverall: 7.0, duration: "4 years", tuitionFee: "£39,010", notes: "需 PAT 入学考试" },
  { id: "ox-physics", schoolId: "oxford", name: "物理", nameEn: "Physics BA", subjectArea: "physics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 39, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£39,010", notes: "需 PAT 入学考试" },
  { id: "ox-chemistry", schoolId: "oxford", name: "化学", nameEn: "Chemistry MChem", subjectArea: "chemistry", alpiLevel: "A*AA", requiredSubjects: ["Chemistry", "Mathematics"], ibScore: 39, ieltsOverall: 7.0, duration: "4 years", tuitionFee: "£39,010" },
  { id: "ox-economics", schoolId: "oxford", name: "经济与管理", nameEn: "Economics and Management BA", subjectArea: "economics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 39, ieltsOverall: 7.5, duration: "3 years", tuitionFee: "£35,080", notes: "需 TSA 入学考试" },
  { id: "ox-law", schoolId: "oxford", name: "法律", nameEn: "Law (Jurisprudence) BA", subjectArea: "law", alpiLevel: "AAA", ibScore: 38, ieltsOverall: 7.5, duration: "3 years", tuitionFee: "£35,080", notes: "需 LNAT 入学考试" },
  { id: "ox-psychology", schoolId: "oxford", name: "心理学", nameEn: "Psychology (Experimental) BA", subjectArea: "psychology", alpiLevel: "A*AA", ibScore: 39, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£39,010", notes: "需 TSA 入学考试" },
  { id: "ox-medicine", schoolId: "oxford", name: "医学", nameEn: "Medicine (Pre-clinical) BA", subjectArea: "medicine", alpiLevel: "A*AA", requiredSubjects: ["Chemistry"], ibScore: 39, ieltsOverall: 7.0, duration: "6 years", tuitionFee: "£39,010", notes: "需 BMAT + 面试" },
  { id: "ox-biology", schoolId: "oxford", name: "生物科学", nameEn: "Biology BA", subjectArea: "biology", alpiLevel: "A*AA", requiredSubjects: ["Biology"], ibScore: 38, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£39,010" },

  // ── Cambridge ──
  { id: "cam-maths", schoolId: "cambridge", name: "数学", nameEn: "Mathematics BA", subjectArea: "mathematics", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics", "Further Mathematics"], ibScore: 41, ieltsOverall: 7.5, duration: "3 years", tuitionFee: "£37,293", notes: "需 STEP 入学考试" },
  { id: "cam-cs", schoolId: "cambridge", name: "计算机科学", nameEn: "Computer Science BA", subjectArea: "computer-science", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics"], ibScore: 41, ieltsOverall: 7.5, duration: "3 years", tuitionFee: "£37,293", notes: "需 TMUA 入学考试" },
  { id: "cam-engineering", schoolId: "cambridge", name: "工程", nameEn: "Engineering MEng", subjectArea: "engineering", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics", "Physics"], ibScore: 41, ieltsOverall: 7.5, duration: "4 years", tuitionFee: "£40,212", notes: "需 ENGAA 入学考试" },
  { id: "cam-physics", schoolId: "cambridge", name: "自然科学(物理方向)", nameEn: "Natural Sciences (Physical)", subjectArea: "physics", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics", "Physics"], ibScore: 41, ieltsOverall: 7.5, duration: "3 years", tuitionFee: "£40,212", notes: "需 NSAA 入学考试" },
  { id: "cam-chemistry", schoolId: "cambridge", name: "自然科学(化学方向)", nameEn: "Natural Sciences (Chemistry)", subjectArea: "chemistry", alpiLevel: "A*A*A", requiredSubjects: ["Chemistry"], ibScore: 41, ieltsOverall: 7.5, duration: "3 years", tuitionFee: "£40,212" },
  { id: "cam-economics", schoolId: "cambridge", name: "经济学", nameEn: "Economics BA", subjectArea: "economics", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics"], ibScore: 41, ieltsOverall: 7.5, duration: "3 years", tuitionFee: "£37,293", notes: "需 TMUA 入学考试" },
  { id: "cam-law", schoolId: "cambridge", name: "法律", nameEn: "Law BA", subjectArea: "law", alpiLevel: "A*AA", ibScore: 40, ieltsOverall: 7.5, duration: "3 years", tuitionFee: "£37,293" },
  { id: "cam-psychology", schoolId: "cambridge", name: "心理与行为科学", nameEn: "Psychological and Behavioural Sciences BA", subjectArea: "psychology", alpiLevel: "A*AA", ibScore: 40, ieltsOverall: 7.5, duration: "3 years", tuitionFee: "£37,293" },
  { id: "cam-medicine", schoolId: "cambridge", name: "医学", nameEn: "Medicine MB", subjectArea: "medicine", alpiLevel: "A*A*A", requiredSubjects: ["Chemistry"], ibScore: 41, ieltsOverall: 7.5, duration: "6 years", tuitionFee: "£40,212", notes: "需 BMAT + 面试" },

  // ── Imperial ──
  { id: "ic-maths", schoolId: "imperial", name: "数学", nameEn: "Mathematics BSc", subjectArea: "mathematics", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics", "Further Mathematics"], ibScore: 39, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£38,200" },
  { id: "ic-cs", schoolId: "imperial", name: "计算", nameEn: "Computing BEng", subjectArea: "computer-science", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics"], ibScore: 39, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£38,200", notes: "需 MAT/TMUA" },
  { id: "ic-mech", schoolId: "imperial", name: "机械工程", nameEn: "Mechanical Engineering MEng", subjectArea: "engineering", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics", "Physics"], ibScore: 39, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£40,940" },
  { id: "ic-eee", schoolId: "imperial", name: "电子电气工程", nameEn: "Electrical and Electronic Engineering MEng", subjectArea: "engineering", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics", "Physics"], ibScore: 39, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£40,940" },
  { id: "ic-civil", schoolId: "imperial", name: "土木工程", nameEn: "Civil Engineering MEng", subjectArea: "engineering", alpiLevel: "A*AA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 38, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£40,940" },
  { id: "ic-physics", schoolId: "imperial", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics", "Physics"], ibScore: 39, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£40,940" },
  { id: "ic-chemistry", schoolId: "imperial", name: "化学", nameEn: "Chemistry BSc", subjectArea: "chemistry", alpiLevel: "AAA", requiredSubjects: ["Chemistry", "Mathematics"], ibScore: 38, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£40,940" },
  { id: "ic-biology", schoolId: "imperial", name: "生物科学", nameEn: "Biological Sciences BSc", subjectArea: "biology", alpiLevel: "AAA", requiredSubjects: ["Biology", "Chemistry"], ibScore: 38, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£40,940" },
  { id: "ic-medicine", schoolId: "imperial", name: "医学", nameEn: "Medicine MBBS", subjectArea: "medicine", alpiLevel: "AAA", requiredSubjects: ["Chemistry", "Biology"], ibScore: 38, ieltsOverall: 7.0, duration: "6 years", tuitionFee: "£49,050", notes: "需 BMAT + 面试" },

  // ── UCL ──
  { id: "ucl-ug-maths", schoolId: "ucl", name: "数学", nameEn: "Mathematics BSc", subjectArea: "mathematics", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics", "Further Mathematics"], ibScore: 39, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£35,000" },
  { id: "ucl-ug-cs", schoolId: "ucl", name: "计算机科学", nameEn: "Computer Science BSc", subjectArea: "computer-science", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 38, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£38,000" },
  { id: "ucl-ug-engineering", schoolId: "ucl", name: "工程(机械)", nameEn: "Mechanical Engineering MEng", subjectArea: "engineering", alpiLevel: "A*AA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 38, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£38,000" },
  { id: "ucl-ug-physics", schoolId: "ucl", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 38, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£35,000" },
  { id: "ucl-ug-chemistry", schoolId: "ucl", name: "化学", nameEn: "Chemistry BSc", subjectArea: "chemistry", alpiLevel: "AAA", requiredSubjects: ["Chemistry"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£35,000" },
  { id: "ucl-ug-economics", schoolId: "ucl", name: "经济学", nameEn: "Economics BSc", subjectArea: "economics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 38, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£30,000" },
  { id: "ucl-ug-law", schoolId: "ucl", name: "法律", nameEn: "Law LLB", subjectArea: "law", alpiLevel: "AAA", ibScore: 38, ieltsOverall: 7.5, duration: "3 years", tuitionFee: "£28,500", notes: "需 LNAT" },
  { id: "ucl-ug-psychology", schoolId: "ucl", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 38, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£35,000" },
  { id: "ucl-ug-architecture", schoolId: "ucl", name: "建筑", nameEn: "Architecture BSc", subjectArea: "architecture", alpiLevel: "AAB", ibScore: 34, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£35,000", notes: "需作品集" },
  { id: "ucl-ug-medicine", schoolId: "ucl", name: "医学", nameEn: "Medicine MBBS", subjectArea: "medicine", alpiLevel: "A*AA", requiredSubjects: ["Chemistry", "Biology"], ibScore: 39, ieltsOverall: 7.5, duration: "6 years", tuitionFee: "£40,000", notes: "需 UCAT + 面试" },
  { id: "ucl-ug-biology", schoolId: "ucl", name: "生物科学", nameEn: "Biological Sciences BSc", subjectArea: "biology", alpiLevel: "AAA", requiredSubjects: ["Biology"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£35,000" },

  // ── LSE ──
  { id: "lse-ug-economics", schoolId: "lse", name: "经济学", nameEn: "Economics BSc", subjectArea: "economics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 38, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£28,896" },
  { id: "lse-ug-finance", schoolId: "lse", name: "金融", nameEn: "Finance BSc", subjectArea: "accounting-finance", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 38, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£28,896" },
  { id: "lse-ug-law", schoolId: "lse", name: "法律", nameEn: "Law LLB", subjectArea: "law", alpiLevel: "A*AA", ibScore: 38, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£28,896", notes: "需 LNAT" },
  { id: "lse-ug-management", schoolId: "lse", name: "管理学", nameEn: "Management BSc", subjectArea: "business", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 37, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£28,896" },
  { id: "lse-ug-math-econ", schoolId: "lse", name: "数学与经济", nameEn: "Mathematics and Economics BSc", subjectArea: "mathematics", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics"], ibScore: 38, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£28,896" },
  { id: "lse-ug-psychology", schoolId: "lse", name: "心理与行为科学", nameEn: "Psychological and Behavioural Science BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 37, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£28,896" },

  // ── Edinburgh ──
  { id: "ed-ug-maths", schoolId: "edinburgh", name: "数学", nameEn: "Mathematics BSc", subjectArea: "mathematics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 37, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£30,400", notes: "苏格兰4年制" },
  { id: "ed-ug-cs", schoolId: "edinburgh", name: "计算机科学", nameEn: "Computer Science BSc", subjectArea: "computer-science", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 37, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£33,600", notes: "苏格兰4年制" },
  { id: "ed-ug-engineering", schoolId: "edinburgh", name: "工程", nameEn: "Engineering BEng", subjectArea: "engineering", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 36, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£33,600" },
  { id: "ed-ug-physics", schoolId: "edinburgh", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 36, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£33,600" },
  { id: "ed-ug-chemistry", schoolId: "edinburgh", name: "化学", nameEn: "Chemistry BSc", subjectArea: "chemistry", alpiLevel: "AAA", requiredSubjects: ["Chemistry"], ibScore: 36, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£33,600" },
  { id: "ed-ug-economics", schoolId: "edinburgh", name: "经济学", nameEn: "Economics MA", subjectArea: "economics", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 36, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£26,500" },
  { id: "ed-ug-business", schoolId: "edinburgh", name: "商业管理", nameEn: "Business Management MA", subjectArea: "business", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£26,500" },
  { id: "ed-ug-law", schoolId: "edinburgh", name: "法律", nameEn: "Law LLB", subjectArea: "law", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 7.0, duration: "4 years", tuitionFee: "£26,500" },
  { id: "ed-ug-psychology", schoolId: "edinburgh", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£30,400" },
  { id: "ed-ug-medicine", schoolId: "edinburgh", name: "医学", nameEn: "Medicine MBChB", subjectArea: "medicine", alpiLevel: "AAA", requiredSubjects: ["Chemistry", "Biology"], ibScore: 37, ieltsOverall: 7.0, duration: "6 years", tuitionFee: "£39,600", notes: "需 UCAT + 面试" },
  { id: "ed-ug-architecture", schoolId: "edinburgh", name: "建筑", nameEn: "Architecture MA", subjectArea: "architecture", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£30,400", notes: "需作品集" },
  { id: "ed-ug-biology", schoolId: "edinburgh", name: "生物科学", nameEn: "Biological Sciences BSc", subjectArea: "biology", alpiLevel: "AAB", requiredSubjects: ["Biology"], ibScore: 34, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£33,600" },

  // ── KCL ──
  { id: "kcl-ug-cs", schoolId: "kcl", name: "计算机科学", nameEn: "Computer Science BSc", subjectArea: "computer-science", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 35, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£31,350" },
  { id: "kcl-ug-engineering", schoolId: "kcl", name: "工程", nameEn: "Engineering BEng", subjectArea: "engineering", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 35, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£31,350" },
  { id: "kcl-ug-physics", schoolId: "kcl", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 35, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£31,350" },
  { id: "kcl-ug-chemistry", schoolId: "kcl", name: "化学", nameEn: "Chemistry BSc", subjectArea: "chemistry", alpiLevel: "AAB", requiredSubjects: ["Chemistry"], ibScore: 34, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£31,350" },
  { id: "kcl-ug-economics", schoolId: "kcl", name: "经济学", nameEn: "Economics BSc", subjectArea: "economics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 35, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£26,700" },
  { id: "kcl-ug-law", schoolId: "kcl", name: "法律", nameEn: "Law LLB", subjectArea: "law", alpiLevel: "AAA", ibScore: 35, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£26,700", notes: "需 LNAT" },
  { id: "kcl-ug-psychology", schoolId: "kcl", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 35, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£31,350" },
  { id: "kcl-ug-business", schoolId: "kcl", name: "商业管理", nameEn: "Business Management BSc", subjectArea: "business", alpiLevel: "AAA", ibScore: 35, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£26,700" },
  { id: "kcl-ug-medicine", schoolId: "kcl", name: "医学", nameEn: "Medicine MBBS", subjectArea: "medicine", alpiLevel: "A*AA", requiredSubjects: ["Chemistry", "Biology"], ibScore: 38, ieltsOverall: 7.0, duration: "5 years", tuitionFee: "£42,000", notes: "需 UCAT + 面试" },

  // ── Manchester ──
  { id: "man-ug-maths", schoolId: "manchester", name: "数学", nameEn: "Mathematics BSc", subjectArea: "mathematics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£29,000" },
  { id: "man-ug-cs", schoolId: "manchester", name: "计算机科学", nameEn: "Computer Science BSc", subjectArea: "computer-science", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 37, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£32,000" },
  { id: "man-ug-engineering", schoolId: "manchester", name: "机械工程", nameEn: "Mechanical Engineering MEng", subjectArea: "engineering", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 36, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£32,000" },
  { id: "man-ug-physics", schoolId: "manchester", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£32,000" },
  { id: "man-ug-chemistry", schoolId: "manchester", name: "化学", nameEn: "Chemistry BSc", subjectArea: "chemistry", alpiLevel: "AAA", requiredSubjects: ["Chemistry"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£32,000" },
  { id: "man-ug-economics", schoolId: "manchester", name: "经济学", nameEn: "Economics BSc", subjectArea: "economics", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£26,500" },
  { id: "man-ug-law", schoolId: "manchester", name: "法律", nameEn: "Law LLB", subjectArea: "law", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£26,500", notes: "需 LNAT" },
  { id: "man-ug-psychology", schoolId: "manchester", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£29,000" },
  { id: "man-ug-business", schoolId: "manchester", name: "管理学", nameEn: "Management BSc", subjectArea: "business", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£26,500" },
  { id: "man-ug-acc-fin", schoolId: "manchester", name: "会计与金融", nameEn: "Accounting and Finance BSc", subjectArea: "accounting-finance", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£26,500" },

  // ── Bristol ──
  { id: "bris-ug-maths", schoolId: "bristol", name: "数学", nameEn: "Mathematics BSc", subjectArea: "mathematics", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics", "Further Mathematics"], ibScore: 39, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£27,200" },
  { id: "bris-ug-cs", schoolId: "bristol", name: "计算机科学", nameEn: "Computer Science BSc", subjectArea: "computer-science", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 38, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£29,300" },
  { id: "bris-ug-engineering", schoolId: "bristol", name: "机械工程", nameEn: "Mechanical Engineering MEng", subjectArea: "engineering", alpiLevel: "A*AA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 38, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£29,300" },
  { id: "bris-ug-physics", schoolId: "bristol", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£29,300" },
  { id: "bris-ug-chemistry", schoolId: "bristol", name: "化学", nameEn: "Chemistry BSc", subjectArea: "chemistry", alpiLevel: "AAA", requiredSubjects: ["Chemistry"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£29,300" },
  { id: "bris-ug-economics", schoolId: "bristol", name: "经济学", nameEn: "Economics BSc", subjectArea: "economics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 38, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£24,700" },
  { id: "bris-ug-law", schoolId: "bristol", name: "法律", nameEn: "Law LLB", subjectArea: "law", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£24,700" },
  { id: "bris-ug-psychology", schoolId: "bristol", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£27,200" },

  // ── Warwick ──
  { id: "war-ug-maths", schoolId: "warwick", name: "数学", nameEn: "Mathematics BSc", subjectArea: "mathematics", alpiLevel: "A*A*A", requiredSubjects: ["Mathematics", "Further Mathematics"], ibScore: 39, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£29,660" },
  { id: "war-ug-cs", schoolId: "warwick", name: "计算机科学", nameEn: "Computer Science BSc", subjectArea: "computer-science", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 38, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£32,640" },
  { id: "war-ug-engineering", schoolId: "warwick", name: "工程", nameEn: "Engineering BEng", subjectArea: "engineering", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 36, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£32,640" },
  { id: "war-ug-physics", schoolId: "warwick", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 38, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£32,640" },
  { id: "war-ug-economics", schoolId: "warwick", name: "经济学", nameEn: "Economics BSc", subjectArea: "economics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 38, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£25,330" },
  { id: "war-ug-law", schoolId: "warwick", name: "法律", nameEn: "Law LLB", subjectArea: "law", alpiLevel: "AAA", ibScore: 38, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£25,330" },
  { id: "war-ug-psychology", schoolId: "warwick", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£29,660" },
  { id: "war-ug-business", schoolId: "warwick", name: "管理学", nameEn: "Management BSc", subjectArea: "business", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£25,330" },
  { id: "war-ug-acc-fin", schoolId: "warwick", name: "会计与金融", nameEn: "Accounting and Finance BSc", subjectArea: "accounting-finance", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 36, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£25,330" },

  // ── Durham ──
  { id: "dur-ug-maths", schoolId: "durham", name: "数学", nameEn: "Mathematics BSc", subjectArea: "mathematics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 37, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£29,500" },
  { id: "dur-ug-cs", schoolId: "durham", name: "计算机科学", nameEn: "Computer Science BSc", subjectArea: "computer-science", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£29,500" },
  { id: "dur-ug-engineering", schoolId: "durham", name: "工程", nameEn: "General Engineering MEng", subjectArea: "engineering", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 36, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£29,500" },
  { id: "dur-ug-physics", schoolId: "durham", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 37, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£29,500" },
  { id: "dur-ug-chemistry", schoolId: "durham", name: "化学", nameEn: "Chemistry BSc", subjectArea: "chemistry", alpiLevel: "AAA", requiredSubjects: ["Chemistry"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£29,500" },
  { id: "dur-ug-economics", schoolId: "durham", name: "经济学", nameEn: "Economics BA", subjectArea: "economics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 37, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£25,500" },
  { id: "dur-ug-law", schoolId: "durham", name: "法律", nameEn: "Law LLB", subjectArea: "law", alpiLevel: "A*AA", ibScore: 37, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£25,500" },
  { id: "dur-ug-psychology", schoolId: "durham", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£29,500" },
  { id: "dur-ug-business", schoolId: "durham", name: "商业管理", nameEn: "Business and Management BA", subjectArea: "business", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£25,500" },
  { id: "dur-ug-acc-fin", schoolId: "durham", name: "会计与金融", nameEn: "Accounting and Finance BA", subjectArea: "accounting-finance", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£25,500" },

  // ── Bath ──
  { id: "bath-ug-maths", schoolId: "bath", name: "数学", nameEn: "Mathematics BSc", subjectArea: "mathematics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£24,000" },
  { id: "bath-ug-cs", schoolId: "bath", name: "计算机科学", nameEn: "Computer Science BSc", subjectArea: "computer-science", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£24,000" },
  { id: "bath-ug-engineering", schoolId: "bath", name: "机械工程", nameEn: "Mechanical Engineering MEng", subjectArea: "engineering", alpiLevel: "A*AA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 36, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£24,000" },
  { id: "bath-ug-physics", schoolId: "bath", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£24,000" },
  { id: "bath-ug-chemistry", schoolId: "bath", name: "化学", nameEn: "Chemistry BSc", subjectArea: "chemistry", alpiLevel: "AAA", requiredSubjects: ["Chemistry"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£24,000" },
  { id: "bath-ug-economics", schoolId: "bath", name: "经济学", nameEn: "Economics BSc", subjectArea: "economics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£20,500" },
  { id: "bath-ug-business", schoolId: "bath", name: "商业管理", nameEn: "Business Administration BSc", subjectArea: "business", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 7.0, duration: "4 years", tuitionFee: "£20,500", notes: "含实习年" },
  { id: "bath-ug-psychology", schoolId: "bath", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£24,000" },
  { id: "bath-ug-architecture", schoolId: "bath", name: "建筑", nameEn: "Architecture BSc", subjectArea: "architecture", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£24,000", notes: "需作品集" },
  { id: "bath-ug-acc-fin", schoolId: "bath", name: "会计与金融", nameEn: "Accounting and Finance BSc", subjectArea: "accounting-finance", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 36, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£20,500" },

  // ── Leeds (accepts 高考) ──
  { id: "lee-ug-maths", schoolId: "leeds", name: "数学", nameEn: "Mathematics BSc", subjectArea: "mathematics", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 35, gaokaoPercent: 80, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£27,250" },
  { id: "lee-ug-cs", schoolId: "leeds", name: "计算机科学", nameEn: "Computer Science BSc", subjectArea: "computer-science", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 35, gaokaoPercent: 80, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£30,250" },
  { id: "lee-ug-engineering", schoolId: "leeds", name: "机械工程", nameEn: "Mechanical Engineering MEng", subjectArea: "engineering", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 35, gaokaoPercent: 82, ieltsOverall: 6.0, duration: "4 years", tuitionFee: "£30,250" },
  { id: "lee-ug-physics", schoolId: "leeds", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 35, gaokaoPercent: 80, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£30,250" },
  { id: "lee-ug-chemistry", schoolId: "leeds", name: "化学", nameEn: "Chemistry BSc", subjectArea: "chemistry", alpiLevel: "AAB", requiredSubjects: ["Chemistry"], ibScore: 34, gaokaoPercent: 78, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£30,250" },
  { id: "lee-ug-economics", schoolId: "leeds", name: "经济学", nameEn: "Economics BSc", subjectArea: "economics", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 35, gaokaoPercent: 80, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£24,250" },
  { id: "lee-ug-law", schoolId: "leeds", name: "法律", nameEn: "Law LLB", subjectArea: "law", alpiLevel: "AAA", ibScore: 35, gaokaoPercent: 82, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£24,250" },
  { id: "lee-ug-psychology", schoolId: "leeds", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 35, gaokaoPercent: 80, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£27,250" },
  { id: "lee-ug-business", schoolId: "leeds", name: "商业管理", nameEn: "Management BSc", subjectArea: "business", alpiLevel: "AAA", ibScore: 35, gaokaoPercent: 80, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£24,250" },
  { id: "lee-ug-acc-fin", schoolId: "leeds", name: "会计与金融", nameEn: "Accounting and Finance BSc", subjectArea: "accounting-finance", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 35, gaokaoPercent: 80, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£24,250" },

  // ── Birmingham (accepts 高考) ──
  { id: "birm-ug-maths", schoolId: "birmingham", name: "数学", nameEn: "Mathematics BSc", subjectArea: "mathematics", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 32, gaokaoPercent: 80, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£25,740" },
  { id: "birm-ug-cs", schoolId: "birmingham", name: "计算机科学", nameEn: "Computer Science BSc", subjectArea: "computer-science", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 32, gaokaoPercent: 80, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£28,410" },
  { id: "birm-ug-engineering", schoolId: "birmingham", name: "机械工程", nameEn: "Mechanical Engineering BEng", subjectArea: "engineering", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 32, gaokaoPercent: 80, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£28,410" },
  { id: "birm-ug-physics", schoolId: "birmingham", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 32, gaokaoPercent: 80, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£28,410" },
  { id: "birm-ug-chemistry", schoolId: "birmingham", name: "化学", nameEn: "Chemistry BSc", subjectArea: "chemistry", alpiLevel: "AAB", requiredSubjects: ["Chemistry"], ibScore: 32, gaokaoPercent: 80, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£28,410" },
  { id: "birm-ug-economics", schoolId: "birmingham", name: "经济学", nameEn: "Economics BSc", subjectArea: "economics", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 32, gaokaoPercent: 80, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£22,260" },
  { id: "birm-ug-law", schoolId: "birmingham", name: "法律", nameEn: "Law LLB", subjectArea: "law", alpiLevel: "AAA", ibScore: 32, gaokaoPercent: 82, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£22,260" },
  { id: "birm-ug-psychology", schoolId: "birmingham", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 32, gaokaoPercent: 80, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£25,740" },
  { id: "birm-ug-business", schoolId: "birmingham", name: "商业管理", nameEn: "Business Management BSc", subjectArea: "business", alpiLevel: "AAA", ibScore: 32, gaokaoPercent: 80, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£22,260" },
  { id: "birm-ug-medicine", schoolId: "birmingham", name: "医学", nameEn: "Medicine and Surgery MBChB", subjectArea: "medicine", alpiLevel: "A*AA", requiredSubjects: ["Chemistry", "Biology"], ibScore: 36, ieltsOverall: 7.0, duration: "5 years", tuitionFee: "£42,000", notes: "需 UCAT + 面试。不接受高考直申" },

  // ── Sheffield ──
  { id: "shef-ug-maths", schoolId: "sheffield", name: "数学", nameEn: "Mathematics BSc", subjectArea: "mathematics", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 34, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£25,670" },
  { id: "shef-ug-cs", schoolId: "sheffield", name: "计算机科学", nameEn: "Computer Science BSc", subjectArea: "computer-science", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 34, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£28,060" },
  { id: "shef-ug-engineering", schoolId: "sheffield", name: "机械工程", nameEn: "Mechanical Engineering MEng", subjectArea: "engineering", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 34, ieltsOverall: 6.0, duration: "4 years", tuitionFee: "£28,060" },
  { id: "shef-ug-physics", schoolId: "sheffield", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 34, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£28,060" },
  { id: "shef-ug-economics", schoolId: "sheffield", name: "经济学", nameEn: "Economics BSc", subjectArea: "economics", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 34, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£22,680" },
  { id: "shef-ug-law", schoolId: "sheffield", name: "法律", nameEn: "Law LLB", subjectArea: "law", alpiLevel: "AAA", ibScore: 35, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£22,680" },
  { id: "shef-ug-psychology", schoolId: "sheffield", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 34, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£25,670" },
  { id: "shef-ug-business", schoolId: "sheffield", name: "商业管理", nameEn: "Business Management BSc", subjectArea: "business", alpiLevel: "AAB", ibScore: 33, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£22,680" },
  { id: "shef-ug-architecture", schoolId: "sheffield", name: "建筑", nameEn: "Architecture BA", subjectArea: "architecture", alpiLevel: "AAA", ibScore: 34, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£25,670", notes: "需作品集" },

  // ── Nottingham ──
  { id: "nott-ug-maths", schoolId: "nottingham", name: "数学", nameEn: "Mathematics BSc", subjectArea: "mathematics", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 34, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£25,000" },
  { id: "nott-ug-cs", schoolId: "nottingham", name: "计算机科学", nameEn: "Computer Science BSc", subjectArea: "computer-science", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 34, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£28,000" },
  { id: "nott-ug-engineering", schoolId: "nottingham", name: "机械工程", nameEn: "Mechanical Engineering MEng", subjectArea: "engineering", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 34, ieltsOverall: 6.0, duration: "4 years", tuitionFee: "£28,000" },
  { id: "nott-ug-physics", schoolId: "nottingham", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 34, ieltsOverall: 6.0, duration: "3 years", tuitionFee: "£28,000" },
  { id: "nott-ug-economics", schoolId: "nottingham", name: "经济学", nameEn: "Economics BSc", subjectArea: "economics", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 34, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£22,500" },
  { id: "nott-ug-law", schoolId: "nottingham", name: "法律", nameEn: "Law LLB", subjectArea: "law", alpiLevel: "AAA", ibScore: 34, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£22,500" },
  { id: "nott-ug-psychology", schoolId: "nottingham", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 34, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£25,000" },
  { id: "nott-ug-business", schoolId: "nottingham", name: "商业管理", nameEn: "Management BSc", subjectArea: "business", alpiLevel: "AAB", ibScore: 33, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£22,500" },
  { id: "nott-ug-architecture", schoolId: "nottingham", name: "建筑", nameEn: "Architecture BArch", subjectArea: "architecture", alpiLevel: "AAA", ibScore: 34, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£25,000", notes: "需作品集" },

  // ── Glasgow (accepts 高考) ──
  { id: "gla-ug-maths", schoolId: "glasgow", name: "数学", nameEn: "Mathematics BSc", subjectArea: "mathematics", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 36, gaokaoPercent: 75, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£25,750", notes: "苏格兰4年制" },
  { id: "gla-ug-cs", schoolId: "glasgow", name: "计算机科学", nameEn: "Computing Science BSc", subjectArea: "computer-science", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 36, gaokaoPercent: 75, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£28,420" },
  { id: "gla-ug-engineering", schoolId: "glasgow", name: "工程", nameEn: "Engineering BEng", subjectArea: "engineering", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 36, gaokaoPercent: 75, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£28,420" },
  { id: "gla-ug-physics", schoolId: "glasgow", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 36, gaokaoPercent: 75, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£28,420" },
  { id: "gla-ug-economics", schoolId: "glasgow", name: "经济学", nameEn: "Economics MA", subjectArea: "economics", alpiLevel: "AAA", ibScore: 36, gaokaoPercent: 75, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£22,020" },
  { id: "gla-ug-law", schoolId: "glasgow", name: "法律", nameEn: "Law LLB", subjectArea: "law", alpiLevel: "AAA", ibScore: 36, gaokaoPercent: 78, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£22,020" },
  { id: "gla-ug-psychology", schoolId: "glasgow", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 36, gaokaoPercent: 75, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£25,750" },
  { id: "gla-ug-business", schoolId: "glasgow", name: "商业管理", nameEn: "Business and Management MA", subjectArea: "business", alpiLevel: "AAA", ibScore: 36, gaokaoPercent: 75, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£22,020" },
  { id: "gla-ug-acc-fin", schoolId: "glasgow", name: "会计与金融", nameEn: "Accounting and Finance BAcc", subjectArea: "accounting-finance", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 36, gaokaoPercent: 75, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£22,020" },
  { id: "gla-ug-medicine", schoolId: "glasgow", name: "医学", nameEn: "Medicine MBChB", subjectArea: "medicine", alpiLevel: "AAA", requiredSubjects: ["Chemistry", "Biology"], ibScore: 38, ieltsOverall: 7.0, duration: "5 years", tuitionFee: "£43,000", notes: "需 UCAT + 面试。不接受高考直申" },

  // ── Southampton (accepts 高考 for some) ──
  { id: "soton-ug-cs", schoolId: "southampton", name: "计算机科学", nameEn: "Computer Science BSc", subjectArea: "computer-science", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 34, gaokaoPercent: 78, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£28,000" },
  { id: "soton-ug-engineering", schoolId: "southampton", name: "机械工程", nameEn: "Mechanical Engineering MEng", subjectArea: "engineering", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 34, gaokaoPercent: 78, ieltsOverall: 6.5, duration: "4 years", tuitionFee: "£28,000" },
  { id: "soton-ug-physics", schoolId: "southampton", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 34, gaokaoPercent: 78, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£28,000" },
  { id: "soton-ug-economics", schoolId: "southampton", name: "经济学", nameEn: "Economics BSc", subjectArea: "economics", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 34, gaokaoPercent: 78, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£22,300" },
  { id: "soton-ug-law", schoolId: "southampton", name: "法律", nameEn: "Law LLB", subjectArea: "law", alpiLevel: "AAA", ibScore: 34, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£22,300" },
  { id: "soton-ug-psychology", schoolId: "southampton", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 34, gaokaoPercent: 78, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£25,000" },

  // ── Exeter (accepts 高考) ──
  { id: "ex-ug-maths", schoolId: "exeter", name: "数学", nameEn: "Mathematics BSc", subjectArea: "mathematics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 36, gaokaoPercent: 75, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£25,000" },
  { id: "ex-ug-cs", schoolId: "exeter", name: "计算机科学", nameEn: "Computer Science BSc", subjectArea: "computer-science", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 34, gaokaoPercent: 75, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£28,000" },
  { id: "ex-ug-engineering", schoolId: "exeter", name: "工程", nameEn: "Engineering BEng", subjectArea: "engineering", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 34, gaokaoPercent: 75, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£28,000" },
  { id: "ex-ug-economics", schoolId: "exeter", name: "经济学", nameEn: "Economics BSc", subjectArea: "economics", alpiLevel: "A*AA", requiredSubjects: ["Mathematics"], ibScore: 36, gaokaoPercent: 78, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£22,000" },
  { id: "ex-ug-law", schoolId: "exeter", name: "法律", nameEn: "Law LLB", subjectArea: "law", alpiLevel: "AAA", ibScore: 34, gaokaoPercent: 78, ieltsOverall: 7.0, duration: "3 years", tuitionFee: "£22,000" },
  { id: "ex-ug-psychology", schoolId: "exeter", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 34, gaokaoPercent: 75, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£25,000" },
  { id: "ex-ug-business", schoolId: "exeter", name: "商业管理", nameEn: "Business BSc", subjectArea: "business", alpiLevel: "AAA", ibScore: 34, gaokaoPercent: 75, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£22,000" },
  { id: "ex-ug-acc-fin", schoolId: "exeter", name: "会计与金融", nameEn: "Accounting and Finance BSc", subjectArea: "accounting-finance", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 34, gaokaoPercent: 75, ieltsOverall: 6.5, duration: "3 years", tuitionFee: "£22,000" },

  // ── St Andrews ──
  { id: "sta-ug-maths", schoolId: "st-andrews", name: "数学", nameEn: "Mathematics BSc", subjectArea: "mathematics", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 36, ieltsOverall: 7.0, duration: "4 years", tuitionFee: "£28,960", notes: "苏格兰4年制" },
  { id: "sta-ug-cs", schoolId: "st-andrews", name: "计算机科学", nameEn: "Computer Science BSc", subjectArea: "computer-science", alpiLevel: "AAA", requiredSubjects: ["Mathematics"], ibScore: 36, ieltsOverall: 7.0, duration: "4 years", tuitionFee: "£28,960" },
  { id: "sta-ug-physics", schoolId: "st-andrews", name: "物理", nameEn: "Physics BSc", subjectArea: "physics", alpiLevel: "AAA", requiredSubjects: ["Mathematics", "Physics"], ibScore: 36, ieltsOverall: 7.0, duration: "4 years", tuitionFee: "£28,960" },
  { id: "sta-ug-chemistry", schoolId: "st-andrews", name: "化学", nameEn: "Chemistry BSc", subjectArea: "chemistry", alpiLevel: "AAA", requiredSubjects: ["Chemistry"], ibScore: 36, ieltsOverall: 7.0, duration: "4 years", tuitionFee: "£28,960" },
  { id: "sta-ug-economics", schoolId: "st-andrews", name: "经济学", nameEn: "Economics MA", subjectArea: "economics", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 7.0, duration: "4 years", tuitionFee: "£28,960" },
  { id: "sta-ug-psychology", schoolId: "st-andrews", name: "心理学", nameEn: "Psychology BSc", subjectArea: "psychology", alpiLevel: "AAA", ibScore: 36, ieltsOverall: 7.0, duration: "4 years", tuitionFee: "£28,960" },
];

export const totalUndergradProgramCount = undergradPrograms.length;

// ═══════════════ MATCHING LOGIC ═══════════════

function alevelToPoints(grade: string): number {
  return gradeValue[grade] || 0;
}

function matchAlevel(
  userGrades: { subject: string; grade: string }[],
  requirement: string,
  requiredSubjects?: string[],
): { level: UndergradMatchLevel; reason: string } {
  // Check required subjects first
  if (requiredSubjects && requiredSubjects.length > 0) {
    const userSubjects = userGrades.map(g => g.subject);
    const missing = requiredSubjects.filter(s => !userSubjects.includes(s));
    if (missing.length > 0) {
      return { level: "excluded", reason: `缺少必修科目: ${missing.join(", ")}` };
    }
  }

  const reqGrades = parseRequirement(requirement);
  const userPoints = userGrades.map(g => alevelToPoints(g.grade)).sort((a, b) => b - a).slice(0, reqGrades.length);

  if (userPoints.length < reqGrades.length) {
    return { level: "excluded", reason: "科目数量不足" };
  }

  let totalDeficit = 0;
  for (let i = 0; i < reqGrades.length; i++) {
    const diff = reqGrades[i] - userPoints[i];
    if (diff > 0) totalDeficit += diff;
  }

  if (totalDeficit === 0) return { level: "high", reason: "成绩达标" };
  if (totalDeficit <= 1) return { level: "medium", reason: "接近要求，差1个等级" };
  if (totalDeficit <= 3) return { level: "low", reason: `差${totalDeficit}个等级` };
  return { level: "excluded", reason: "成绩差距较大" };
}

function matchIB(
  userScore: number,
  requirement: number,
): { level: UndergradMatchLevel; reason: string } {
  const diff = requirement - userScore;
  if (diff <= 0) return { level: "high", reason: "IB 分数达标" };
  if (diff <= 2) return { level: "medium", reason: `IB 差${diff}分` };
  if (diff <= 4) return { level: "low", reason: `IB 差${diff}分` };
  return { level: "excluded", reason: "IB 分数差距较大" };
}

function matchGaokao(
  userPercent: number,
  requirement: number,
): { level: UndergradMatchLevel; reason: string } {
  const diff = requirement - userPercent;
  if (diff <= 0) return { level: "high", reason: "高考成绩达标" };
  if (diff <= 3) return { level: "medium", reason: `高考差${diff.toFixed(1)}%` };
  if (diff <= 8) return { level: "low", reason: `高考差${diff.toFixed(1)}%` };
  return { level: "excluded", reason: "高考成绩差距较大" };
}

// School name lookup helper
import { schools } from "./schools";

const schoolLookup = new Map(schools.map(s => [s.id, s]));

export function getSchoolName(schoolId: string): { name: string; nameEn: string } {
  const school = schoolLookup.get(schoolId);
  if (school) return { name: school.name, nameEn: school.nameEn };
  const extra = undergradOnlySchools[schoolId];
  if (extra) return extra;
  return { name: schoolId, nameEn: schoolId };
}

export function matchUndergradPrograms(opts: {
  curriculum: "alevel" | "ib" | "gaokao";
  alevelGrades?: { subject: string; grade: string }[];
  ibScore?: number;
  gaokaoScore?: number;
  gaokaoTotal?: number;
  langScore: number;
  langTest: "IELTS" | "TOEFL";
  subjectArea: string;
}): UndergradSchoolResult[] {
  const { curriculum, alevelGrades, ibScore, gaokaoScore, gaokaoTotal, langScore, langTest, subjectArea } = opts;
  const gaokaoPercent = gaokaoScore && gaokaoTotal ? (gaokaoScore / gaokaoTotal) * 100 : 0;

  // Filter programs by subject area
  const filtered = undergradPrograms.filter(p => p.subjectArea === subjectArea);

  // Match each program
  const results: UndergradMatchResult[] = [];
  for (const program of filtered) {
    let match: { level: UndergradMatchLevel; reason: string };

    if (curriculum === "alevel" && alevelGrades) {
      match = matchAlevel(alevelGrades, program.alpiLevel, program.requiredSubjects);
    } else if (curriculum === "ib" && ibScore !== undefined) {
      if (!program.ibScore) {
        match = { level: "excluded", reason: "该项目未提供 IB 要求" };
      } else {
        match = matchIB(ibScore, program.ibScore);
      }
    } else if (curriculum === "gaokao") {
      if (!program.gaokaoPercent) {
        match = { level: "excluded", reason: "该学校不接受高考直申" };
      } else {
        match = matchGaokao(gaokaoPercent, program.gaokaoPercent);
      }
    } else {
      match = { level: "excluded", reason: "信息不足" };
    }

    // Check language
    const langMin = langTest === "IELTS" ? program.ieltsOverall : program.ieltsOverall * 14; // rough TOEFL equivalent
    const langOk = langScore >= langMin;
    if (!langOk && match.level !== "excluded") {
      // Downgrade by one level
      const downgrade: Record<UndergradMatchLevel, UndergradMatchLevel> = {
        high: "medium", medium: "low", low: "excluded", excluded: "excluded"
      };
      match = { level: downgrade[match.level], reason: match.reason + "；语言未达标" };
    }

    results.push({ program, level: match.level, reason: match.reason });
  }

  // Group by school
  const schoolMap = new Map<string, UndergradMatchResult[]>();
  for (const r of results) {
    if (!schoolMap.has(r.program.schoolId)) schoolMap.set(r.program.schoolId, []);
    schoolMap.get(r.program.schoolId)!.push(r);
  }

  const levelOrder: Record<string, number> = { high: 0, medium: 1, low: 2, excluded: 3 };

  const schoolResults: UndergradSchoolResult[] = [];
  for (const [schoolId, programs] of schoolMap) {
    const { name, nameEn } = getSchoolName(schoolId);
    const sorted = programs.sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
    const bestLevel = sorted[0]?.level || "excluded";
    schoolResults.push({ schoolId, schoolName: name, schoolNameEn: nameEn, programs: sorted, bestLevel });
  }

  // Sort schools: high first, then medium, then low, then excluded
  schoolResults.sort((a, b) => levelOrder[a.bestLevel] - levelOrder[b.bestLevel]);

  return schoolResults;
}
