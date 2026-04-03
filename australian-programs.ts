// ============================================================
// Australian University Postgraduate Programs for Chinese Students
// Compiled: April 2026
//
// IMPORTANT DISCLAIMER:
// - Tuition fees are approximate indicative annual figures (AUD) for 2026 intake.
//   Actual fees may vary based on courses selected and are subject to annual increases.
// - GPA thresholds for Chinese 211/non-211 students are based on commonly
//   referenced conversion tables and agent/community data. Universities do NOT
//   always publish these splits officially. Verify with the admissions office.
// - ANU no longer issues conditional offers without valid English scores.
// - Always confirm with the official URL before applying.
// ============================================================

export interface ProgramInfo {
  programName: string;
  faculty: string;
  gpaRequirement: {
    scale: string;
    /** 211/985 university graduates */
    tier211: string;
    /** 双非 (non-211/non-985) university graduates */
    nonTier211: string;
    notes?: string;
  };
  ielts: {
    overall: number;
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  };
  toefl: {
    overall: number;
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  };
  /** Whether a degree in a related/cognate discipline is required */
  relatedDegreeRequired: boolean;
  relatedDegreeNotes?: string;
  /** Indicative annual tuition fee in AUD for international students */
  tuitionFeeAUD: number;
  /** Which intake year this fee applies to */
  tuitionFeeYear: number;
  duration: string;
  /** Official program page URL */
  url: string;
}

export interface UniversityPrograms {
  university: string;
  shortName: string;
  programs: ProgramInfo[];
}

export const australianPrograms: UniversityPrograms[] = [
  // ============================================================
  // 1. AUSTRALIAN NATIONAL UNIVERSITY (ANU)
  // ============================================================
  {
    university: "Australian National University",
    shortName: "ANU",
    programs: [
      {
        programName: "Master of Computing",
        faculty:
          "School of Computing, ANU College of Engineering, Computing and Cybernetics",
        gpaRequirement: {
          scale: "ANU 7-point GPA (minimum 5.0/7.0)",
          tier211: "75%",
          nonTier211: "85%",
          notes:
            "ANU converts Chinese percentage scores to its 7-point scale. " +
            "5.0/7.0 ≈ 211: 75%, non-211: 85%. " +
            "ANU now requires valid English scores at time of application (no conditional language offers).",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 80,
          listening: 18,
          reading: 20,
          writing: 20,
          speaking: 18,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "No specific computing background required for the 2-year program. " +
          "Students without a computing degree will complete foundation courses.",
        tuitionFeeAUD: 50760,
        tuitionFeeYear: 2026,
        duration: "2 years (96 units)",
        url: "https://programsandcourses.anu.edu.au/2026/program/7706xmcomp",
      },
      {
        programName: "Master of Finance",
        faculty:
          "Research School of Finance, Actuarial Studies and Statistics, " +
          "ANU College of Business and Economics",
        gpaRequirement: {
          scale: "ANU 7-point GPA (minimum 5.0/7.0)",
          tier211: "75%",
          nonTier211: "85%",
          notes:
            "ANU College of Business and Economics may apply stricter thresholds " +
            "for some sub-disciplines. Ranked on GPA of all-but-last-semester.",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 80,
          listening: 18,
          reading: 20,
          writing: 20,
          speaking: 18,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "No prerequisite degree discipline. Quantitative background is advantageous.",
        tuitionFeeAUD: 50760,
        tuitionFeeYear: 2026,
        duration: "2 years (96 units)",
        url: "https://programsandcourses.anu.edu.au/program/7418xmfin",
      },
      {
        programName: "Master of Management",
        faculty:
          "Research School of Management, ANU College of Business and Economics",
        gpaRequirement: {
          scale: "ANU 7-point GPA (minimum 5.0/7.0)",
          tier211: "75%",
          nonTier211: "85%",
          notes:
            "Requires cognate discipline OR alternative pathway via " +
            "Graduate Diploma/GMAT+8yr experience. " +
            "Ranked on GPA of all-but-last-semester.",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 80,
          listening: 18,
          reading: 20,
          writing: 20,
          speaking: 18,
        },
        relatedDegreeRequired: true,
        relatedDegreeNotes:
          "Requires a bachelor's degree in a cognate discipline (business, commerce, " +
          "management, economics, etc.). Alternatively, a Graduate Diploma in a cognate " +
          "field with GPA 4.0/7.0, or GMAT/GRE + 8 years professional experience.",
        tuitionFeeAUD: 50760,
        tuitionFeeYear: 2026,
        duration: "2 years (96 units)",
        url: "https://programsandcourses.anu.edu.au/program/mmgnt",
      },
      {
        programName: "Master of Applied Data Analytics",
        faculty:
          "School of Computing, ANU College of Engineering, Computing and Cybernetics",
        gpaRequirement: {
          scale: "ANU 7-point GPA (minimum 5.0/7.0)",
          tier211: "75%",
          nonTier211: "85%",
          notes:
            "IMPORTANT: This program is NOT accepting new admissions for 2026 intake. " +
            "Expected to relaunch for 2027 admission. " +
            "Also requires 3 years of relevant work experience.",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 80,
          listening: 18,
          reading: 20,
          writing: 20,
          speaking: 18,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "No specific prerequisite degree, but 3 years of relevant professional " +
          "experience at ANZSCO Skill Level 1 is required.",
        tuitionFeeAUD: 50760,
        tuitionFeeYear: 2025,
        duration: "2 years (96 units)",
        url: "https://programsandcourses.anu.edu.au/program/madan",
      },
    ],
  },

  // ============================================================
  // 2. MONASH UNIVERSITY
  // ============================================================
  {
    university: "Monash University",
    shortName: "Monash",
    programs: [
      {
        programName: "Master of Business",
        faculty: "Monash Business School",
        gpaRequirement: {
          scale: "WAM (Weighted Average Mark) 60%+",
          tier211: "75%",
          nonTier211: "80%",
          notes:
            "Monash does differentiate 211 vs non-211 for Chinese applicants. " +
            "Standard requirement is WAM 60 (Australian scale), which translates to " +
            "approximately 75% for 211 and 80% for non-211 Chinese universities.",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 79,
          listening: 12,
          reading: 13,
          writing: 21,
          speaking: 18,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "Open to any bachelor's degree holders for the 2-year (Entry Level 1) program.",
        tuitionFeeAUD: 38000,
        tuitionFeeYear: 2026,
        duration: "1.5-2 years (72-96 credit points)",
        url: "https://www.monash.edu/study/courses/find-a-course/business-b6005",
      },
      {
        programName: "Master of Banking and Finance",
        faculty: "Monash Business School, Department of Banking and Finance",
        gpaRequirement: {
          scale: "WAM 60%+",
          tier211: "75%",
          nonTier211: "80%",
          notes:
            "Note: Monash renamed/restructured this program. " +
            "The current program is 'Master of Banking and Finance' (B6004), " +
            "not 'Master of Finance'. Verify the exact program name when applying.",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 79,
          listening: 12,
          reading: 13,
          writing: 21,
          speaking: 18,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "2-year program open to any discipline. 1.5-year option may require a related background.",
        tuitionFeeAUD: 51000,
        tuitionFeeYear: 2026,
        duration: "1-2 years (48-96 credit points)",
        url: "https://www.monash.edu/study/courses/find-a-course/banking-and-finance-b6004",
      },
      {
        programName: "Master of Information Technology",
        faculty: "Faculty of Information Technology",
        gpaRequirement: {
          scale: "WAM 60%+",
          tier211: "75%",
          nonTier211: "80%",
          notes:
            "Entry Level 1 (2-year): any bachelor's degree with WAM 60. " +
            "Entry Level 2 (1.5-year): IT-related degree with studies in Java, Python, " +
            "algorithms, OS, networks, and databases.",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 79,
          listening: 12,
          reading: 13,
          writing: 21,
          speaking: 18,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "2-year program (Entry Level 1) open to any discipline. " +
          "1.5-year program (Entry Level 2) requires IT-related degree with " +
          "specific prerequisite subjects (Java, Python, algorithms, etc.).",
        tuitionFeeAUD: 53900,
        tuitionFeeYear: 2026,
        duration: "1.5-2 years (72-96 credit points)",
        url: "https://www.monash.edu/study/courses/find-a-course/information-technology-c6001",
      },
      {
        programName: "Master of Data Science",
        faculty: "Faculty of Information Technology",
        gpaRequirement: {
          scale: "WAM 60%+",
          tier211: "75%",
          nonTier211: "80%",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 79,
          listening: 12,
          reading: 13,
          writing: 21,
          speaking: 18,
        },
        relatedDegreeRequired: true,
        relatedDegreeNotes:
          "Requires a bachelor's degree in IT or a cognate discipline, OR a degree " +
          "in any field with at least one unit of undergraduate mathematics/statistics.",
        tuitionFeeAUD: 55700,
        tuitionFeeYear: 2026,
        duration: "1.5-2 years (72-96 credit points)",
        url: "https://www.monash.edu/study/courses/find-a-course/data-science-c6004",
      },
      {
        programName: "Master of Artificial Intelligence",
        faculty: "Faculty of Information Technology",
        gpaRequirement: {
          scale: "WAM 60%+",
          tier211: "75%",
          nonTier211: "80%",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 79,
          listening: 12,
          reading: 13,
          writing: 21,
          speaking: 18,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "2-year program open to any discipline (includes foundation units in " +
          "programming, computer architecture, and mathematics/statistics). " +
          "1.5-year option requires IT/CS background.",
        tuitionFeeAUD: 49500,
        tuitionFeeYear: 2026,
        duration: "1.5-2 years (72-96 credit points)",
        url: "https://www.monash.edu/study/courses/find-a-course/artificial-intelligence-c6007",
      },
      {
        programName: "Master of Engineering",
        faculty: "Faculty of Engineering",
        gpaRequirement: {
          scale: "WAM 65%+",
          tier211: "69%",
          nonTier211: "80%",
          notes:
            "Monash Engineering has a tiered system: " +
            "Tier 1 (985/211 + designated universities): 69%. " +
            "Tier 2 (non-211): 80%. " +
            "Specialisations include Chemical, Civil, Electrical, Mechanical, Materials, etc.",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 79,
          listening: 12,
          reading: 13,
          writing: 21,
          speaking: 18,
        },
        relatedDegreeRequired: true,
        relatedDegreeNotes:
          "Requires a 4-year engineering degree or 3-year degree in a relevant " +
          "discipline (e.g., science, maths). " +
          "Specialisations: Chemical, Civil, Electrical, Mechanical, Materials, etc.",
        tuitionFeeAUD: 51000,
        tuitionFeeYear: 2026,
        duration: "1-2 years (48-96 credit points)",
        url: "https://www.monash.edu/engineering/master-engineering",
      },
      {
        programName: "Master of TESOL",
        faculty: "Faculty of Education",
        gpaRequirement: {
          scale: "WAM 60%+",
          tier211: "75%",
          nonTier211: "80%",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 79,
          listening: 12,
          reading: 13,
          writing: 21,
          speaking: 18,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "2-year program open to graduates of any discipline, no teaching experience required. " +
          "1-year option requires related degree (linguistics, language studies) + " +
          "2 years relevant professional experience.",
        tuitionFeeAUD: 38300,
        tuitionFeeYear: 2026,
        duration: "1-2 years (48-96 credit points)",
        url: "https://www.monash.edu/study/courses/find-a-course/tesol-d6005",
      },
    ],
  },

  // ============================================================
  // 3. UNIVERSITY OF QUEENSLAND (UQ)
  // ============================================================
  {
    university: "University of Queensland",
    shortName: "UQ",
    programs: [
      {
        programName: "Master of Commerce",
        faculty: "Faculty of Business, Economics and Law",
        gpaRequirement: {
          scale: "UQ 7-point GPA (minimum 4.5/7.0)",
          tier211: "75%",
          nonTier211: "80%",
          notes:
            "UQ explicitly differentiates between 211 and non-211 Chinese universities. " +
            "GPA 4.5/7.0 ≈ 211: 75%, non-211: 80%. " +
            "Specialisations: Accounting, Finance, Information Systems, etc.",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 87,
          listening: 19,
          reading: 19,
          writing: 21,
          speaking: 19,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "2-year program open to any discipline. " +
          "1.5-year accelerated option requires a bachelor's degree in a relevant discipline.",
        tuitionFeeAUD: 48064,
        tuitionFeeYear: 2026,
        duration: "1.5-2 years (24-32 units)",
        url: "https://study.uq.edu.au/study-options/programs/master-commerce-5584",
      },
      {
        programName: "Master of Business",
        faculty: "Faculty of Business, Economics and Law",
        gpaRequirement: {
          scale: "UQ 7-point GPA (minimum 4.5/7.0)",
          tier211: "75%",
          nonTier211: "80%",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 87,
          listening: 19,
          reading: 19,
          writing: 21,
          speaking: 19,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "Open to any discipline. " +
          "Specialisations: Advertising, Innovation and Entrepreneurship, " +
          "Leadership, Supply Chain Management, etc.",
        tuitionFeeAUD: 48064,
        tuitionFeeYear: 2026,
        duration: "1.5-2 years (24-32 units)",
        url: "https://study.uq.edu.au/study-options/programs/master-business-5585",
      },
      {
        programName: "Master of Information Technology",
        faculty:
          "Faculty of Engineering, Architecture and Information Technology (EAIT)",
        gpaRequirement: {
          scale: "UQ 7-point GPA (minimum 4.5/7.0)",
          tier211: "75%",
          nonTier211: "80%",
          notes:
            "Note: UQ program code is 5581, not 5597. Verify the correct code when applying.",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 87,
          listening: 19,
          reading: 19,
          writing: 21,
          speaking: 19,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "2-year program (32 units) does not require IT background. " +
          "1.5-year program (24 units) requires a relevant degree.",
        tuitionFeeAUD: 53760,
        tuitionFeeYear: 2026,
        duration: "1.5-2 years (24-32 units)",
        url: "https://study.uq.edu.au/study-options/programs/master-information-technology-5581",
      },
      {
        programName: "Master of Data Science",
        faculty:
          "Faculty of Engineering, Architecture and Information Technology (EAIT)",
        gpaRequirement: {
          scale: "UQ 7-point GPA (minimum 4.5/7.0)",
          tier211: "75%",
          nonTier211: "80%",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 87,
          listening: 19,
          reading: 19,
          writing: 21,
          speaking: 19,
        },
        relatedDegreeRequired: true,
        relatedDegreeNotes:
          "Requires a bachelor's degree in a relevant field " +
          "(IT, statistics, mathematics, engineering, science) or equivalent. " +
          "Quantitative background is essential.",
        tuitionFeeAUD: 58056,
        tuitionFeeYear: 2026,
        duration: "1.5-2 years (24-32 units)",
        url: "https://study.uq.edu.au/study-options/programs/master-data-science-5660",
      },
      {
        programName: "Master of Engineering",
        faculty:
          "Faculty of Engineering, Architecture and Information Technology (EAIT)",
        gpaRequirement: {
          scale: "UQ 7-point GPA (minimum 4.5-5.0/7.0)",
          tier211: "75%",
          nonTier211: "80%",
          notes:
            "Some engineering specialisations may have higher GPA thresholds. " +
            "Specialisations: Chemical, Civil, Electrical, Mechanical, Software, etc.",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 87,
          listening: 19,
          reading: 19,
          writing: 21,
          speaking: 19,
        },
        relatedDegreeRequired: true,
        relatedDegreeNotes:
          "Requires a 4-year bachelor's degree in engineering or a 3-year degree " +
          "in a relevant field (science, mathematics). " +
          "Specialisations: Chemical, Civil, Electrical, Mechanical, Software, etc.",
        tuitionFeeAUD: 58056,
        tuitionFeeYear: 2026,
        duration: "1-2 years (16-32 units)",
        url: "https://study.uq.edu.au/study-options/programs/master-engineering-5569",
      },
      {
        programName: "Master of Educational Studies",
        faculty:
          "Faculty of Humanities and Social Sciences, School of Education",
        gpaRequirement: {
          scale: "UQ 7-point GPA (minimum 4.0/7.0)",
          tier211: "70%",
          nonTier211: "75%",
          notes:
            "Education programs have a lower GPA threshold than business/IT programs. " +
            "GPA 4.0/7.0 required. " +
            "Note: The program code is 5596 (Master of Educational Studies), " +
            "not 5613. Verify with UQ's website.",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 87,
          listening: 19,
          reading: 19,
          writing: 21,
          speaking: 19,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "Entry routes: (1) Bachelor's in Education, OR (2) Graduate Certificate/Diploma " +
          "in Education, OR (3) Bachelor's in any discipline + 2 years relevant work experience. " +
          "Specialisations may include TESOL, Educational Leadership, Curriculum Studies, etc.",
        tuitionFeeAUD: 38304,
        tuitionFeeYear: 2026,
        duration: "1-2 years (16-32 units)",
        url: "https://study.uq.edu.au/study-options/programs/master-educational-studies-5596",
      },
    ],
  },
];
