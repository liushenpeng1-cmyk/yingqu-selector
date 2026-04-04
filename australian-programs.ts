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

  // ============================================================
  // 4. UNIVERSITY OF WESTERN AUSTRALIA (UWA)
  // ============================================================
  {
    university: "University of Western Australia",
    shortName: "UWA",
    programs: [
      {
        programName: "Master of Commerce",
        faculty: "UWA Business School",
        gpaRequirement: {
          scale: "UWA Weighted Average Mark (WAM) minimum 60%",
          tier211: "70%",
          nonTier211: "75%",
          notes:
            "UWA does not officially publish separate 211 vs non-211 thresholds. " +
            "The published requirement is WAM 60% (UWA scale). " +
            "Indicative Chinese equivalents based on agent/community data: " +
            "211: ~70%, non-211: ~75%. " +
            "Specialisations: Accounting, Finance, Management, Marketing, Economics, " +
            "Employment Relations, Business Information and Logistics Management.",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 82,
          listening: 20,
          reading: 18,
          writing: 22,
          speaking: 20,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "Open to any bachelor's degree. Students without a commerce background " +
          "may need to complete conversion units (up to 24 points).",
        tuitionFeeAUD: 48700,
        tuitionFeeYear: 2026,
        duration: "1.5-2 years (72-96 points)",
        url: "https://www.uwa.edu.au/study/courses/master-of-commerce",
      },
      {
        programName: "Master of Information Technology",
        faculty:
          "School of Physics, Mathematics and Computing, Faculty of Engineering and Mathematical Sciences",
        gpaRequirement: {
          scale: "UWA WAM minimum 60%",
          tier211: "65%",
          nonTier211: "70%",
          notes:
            "UWA does not officially differentiate 211 vs non-211. " +
            "Published requirement is WAM 60%. Indicative Chinese equivalents: " +
            "211: ~65%, non-211: ~70%. " +
            "Specialisations: Applied Computing, Artificial Intelligence, Software Systems.",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 82,
          listening: 20,
          reading: 18,
          writing: 22,
          speaking: 20,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "2-year program open to any discipline. " +
          "Students without an IT background start with foundation units.",
        tuitionFeeAUD: 48700,
        tuitionFeeYear: 2026,
        duration: "1.5-2 years (72-96 points)",
        url: "https://www.uwa.edu.au/study/courses/master-of-information-technology",
      },
      {
        programName: "Master of Data Science",
        faculty:
          "School of Physics, Mathematics and Computing, Faculty of Engineering and Mathematical Sciences",
        gpaRequirement: {
          scale: "UWA WAM minimum 65%",
          tier211: "65%",
          nonTier211: "70%",
          notes:
            "Higher GPA threshold than most UWA coursework masters (WAM 65% vs 60%). " +
            "Requires completion of ATAR Mathematics Methods or equivalent. " +
            "Indicative Chinese equivalents: 211: ~65%, non-211: ~70%.",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 82,
          listening: 20,
          reading: 18,
          writing: 22,
          speaking: 20,
        },
        relatedDegreeRequired: true,
        relatedDegreeNotes:
          "Requires a bachelor's degree plus completion of ATAR Mathematics Methods " +
          "(or equivalent mathematics/statistics coursework). " +
          "Backgrounds in science, engineering, IT, or mathematics are typical.",
        tuitionFeeAUD: 52000,
        tuitionFeeYear: 2026,
        duration: "1.5-2 years (72-96 points)",
        url: "https://www.uwa.edu.au/study/courses/master-of-data-science",
      },
      {
        programName: "Master of Professional Engineering",
        faculty: "School of Engineering, Faculty of Engineering and Mathematical Sciences",
        gpaRequirement: {
          scale: "UWA WAM minimum 60%",
          tier211: "65%",
          nonTier211: "70%",
          notes:
            "Requires engineering or related science background. " +
            "Indicative Chinese equivalents: 211: ~65%, non-211: ~70%. " +
            "Specialisations: Chemical, Civil, Electrical and Electronic, " +
            "Environmental, Mechanical, Mining, Software.",
        },
        ielts: {
          overall: 6.5,
          listening: 6.0,
          reading: 6.0,
          writing: 6.0,
          speaking: 6.0,
        },
        toefl: {
          overall: 82,
          listening: 20,
          reading: 18,
          writing: 22,
          speaking: 20,
        },
        relatedDegreeRequired: true,
        relatedDegreeNotes:
          "Requires a bachelor's degree in engineering or relevant science field. " +
          "Students without an Engineering Science major from UWA (or equivalent) " +
          "must complete conversion units (up to 48 points). " +
          "Engineers Australia (EA) accredited.",
        tuitionFeeAUD: 48700,
        tuitionFeeYear: 2026,
        duration: "2-3 years (96-144 points)",
        url: "https://www.uwa.edu.au/study/courses/master-of-professional-engineering",
      },
      {
        programName: "Master of Laws (LLM)",
        faculty: "UWA Law School",
        gpaRequirement: {
          scale: "UWA WAM — assessed individually",
          tier211: "70%",
          nonTier211: "75%",
          notes:
            "Requires a Juris Doctor or Bachelor of Laws (LLB). " +
            "UWA does not publish a specific percentage threshold for LLM; " +
            "Indicative estimates: 211: ~70%, non-211: ~75%.",
        },
        ielts: {
          overall: 7.0,
          listening: 6.5,
          reading: 6.5,
          writing: 6.5,
          speaking: 6.5,
        },
        toefl: {
          overall: 100,
          listening: 20,
          reading: 20,
          writing: 24,
          speaking: 20,
        },
        relatedDegreeRequired: true,
        relatedDegreeNotes:
          "Requires a Juris Doctor (JD) or Bachelor of Laws (LLB), " +
          "or equivalent as recognised by UWA.",
        tuitionFeeAUD: 45500,
        tuitionFeeYear: 2026,
        duration: "1-2 years (48-96 points)",
        url: "https://www.uwa.edu.au/study/courses/master-of-laws",
      },
      {
        programName: "Master of Education",
        faculty: "Graduate School of Education",
        gpaRequirement: {
          scale: "UWA WAM minimum 60%",
          tier211: "65%",
          nonTier211: "70%",
          notes:
            "Requires an education degree or a bachelor's degree in any field " +
            "plus relevant professional experience. " +
            "Indicative Chinese equivalents: 211: ~65%, non-211: ~70%.",
        },
        ielts: {
          overall: 7.5,
          listening: 6.5,
          reading: 6.5,
          writing: 7.0,
          speaking: 6.5,
        },
        toefl: {
          overall: 105,
          listening: 24,
          reading: 24,
          writing: 27,
          speaking: 24,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "Accepts graduates of any discipline, but an education degree or " +
          "relevant professional experience is strongly preferred. " +
          "Note the significantly higher English language requirement (IELTS 7.5).",
        tuitionFeeAUD: 39800,
        tuitionFeeYear: 2026,
        duration: "1-2 years (48-96 points)",
        url: "https://www.uwa.edu.au/study/Courses/Master-of-Education",
      },
    ],
  },

  // ============================================================
  // 5. UNIVERSITY OF ADELAIDE
  // ============================================================
  {
    university: "University of Adelaide",
    shortName: "Adelaide",
    programs: [
      {
        programName: "Master of Finance",
        faculty: "Adelaide Business School",
        gpaRequirement: {
          scale: "Adelaide GPA (minimum 4.0/7.0 equivalent)",
          tier211: "75%",
          nonTier211: "80%",
          notes:
            "IMPORTANT: The University of Adelaide and the University of South Australia " +
            "merged to form Adelaide University from January 2026. " +
            "211: ~75%, non-211: ~80% based on agent/community data. " +
            "Adelaide does not officially publish 211 vs non-211 splits.",
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
          listening: 13,
          reading: 13,
          writing: 21,
          speaking: 18,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "Open to any bachelor's degree. Quantitative background is advantageous.",
        tuitionFeeAUD: 50000,
        tuitionFeeYear: 2026,
        duration: "1.5 years (36 units)",
        url: "https://adelaide.edu.au/study/degrees/master-of-finance/",
      },
      {
        programName: "Master of Accounting",
        faculty: "Adelaide Business School",
        gpaRequirement: {
          scale: "Adelaide GPA (minimum 4.0/7.0 equivalent)",
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
          listening: 13,
          reading: 13,
          writing: 21,
          speaking: 18,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "Open to any discipline. CPA Australia and CA ANZ accredited pathway. " +
          "Standard duration 2 years (48 units).",
        tuitionFeeAUD: 50000,
        tuitionFeeYear: 2026,
        duration: "2 years (48 units)",
        url: "https://adelaide.edu.au/study/degrees/master-of-accounting/",
      },
      {
        programName: "Master of International Business",
        faculty: "Adelaide Business School",
        gpaRequirement: {
          scale: "Adelaide GPA (minimum 4.0/7.0 equivalent)",
          tier211: "75%",
          nonTier211: "80%",
          notes:
            "Adelaide does not offer a standalone Master of Management. " +
            "The closest equivalent is the Master of International Business. " +
            "An alternative is the International MBA.",
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
          listening: 13,
          reading: 13,
          writing: 21,
          speaking: 18,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes: "Open to any discipline.",
        tuitionFeeAUD: 50000,
        tuitionFeeYear: 2026,
        duration: "2 years (48 units)",
        url: "https://adelaide.edu.au/study/degrees/master-of-international-business/",
      },
      {
        programName: "Master of Computer Science",
        faculty: "School of Computer and Mathematical Sciences",
        gpaRequirement: {
          scale: "Adelaide GPA (minimum 4.0-5.0/7.0 equivalent)",
          tier211: "75%",
          nonTier211: "80%",
          notes:
            "Adelaide also offers Master of Data Science and " +
            "Master of AI and Machine Learning as alternatives.",
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
          listening: 13,
          reading: 13,
          writing: 21,
          speaking: 18,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "Open to any discipline (includes CS foundation courses). " +
          "Students with a CS background may receive credit for prior learning.",
        tuitionFeeAUD: 50000,
        tuitionFeeYear: 2026,
        duration: "2 years (48 units)",
        url: "https://www.adelaide.edu.au/degree-finder/mcoms_mcmpsci.html",
      },
      {
        programName: "Master of Data Science",
        faculty: "School of Computer and Mathematical Sciences",
        gpaRequirement: {
          scale: "Adelaide GPA (minimum 4.0-5.0/7.0 equivalent)",
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
          listening: 13,
          reading: 13,
          writing: 21,
          speaking: 18,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "Open to any professional background. " +
          "The curriculum includes CS foundations for non-technical students. " +
          "International students must take ENG 7057 Communication & Critical Thinking.",
        tuitionFeeAUD: 50000,
        tuitionFeeYear: 2026,
        duration: "2 years (48 units)",
        url: "https://www.adelaide.edu.au/degree-finder/mdsci_mdatasci.html",
      },
      {
        programName: "Master of Engineering",
        faculty:
          "Faculty of Sciences, Engineering and Technology",
        gpaRequirement: {
          scale: "Adelaide GPA (minimum 4.5-5.0/7.0 equivalent)",
          tier211: "75%",
          nonTier211: "80%",
          notes:
            "Multiple specialisations available: Chemical, Civil & Structural, " +
            "Electrical, Electronic, Mechanical, Mining, Systems. " +
            "Some specialisations may have higher thresholds.",
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
          listening: 13,
          reading: 13,
          writing: 21,
          speaking: 18,
        },
        relatedDegreeRequired: true,
        relatedDegreeNotes:
          "Requires a bachelor's degree in engineering or a relevant field " +
          "(science, mathematics). Engineers Australia (EA) accredited.",
        tuitionFeeAUD: 52000,
        tuitionFeeYear: 2026,
        duration: "2 years (48 units)",
        url: "https://adelaide.edu.au/study/degrees/master-of-engineering-systems/",
      },
      {
        programName: "Master of Laws (LLM)",
        faculty: "Adelaide Law School",
        gpaRequirement: {
          scale: "Adelaide GPA — assessed individually",
          tier211: "75%",
          nonTier211: "80%",
          notes:
            "Requires a law degree (LLB or equivalent). " +
            "Higher English language requirement than other programs (IELTS 7.0). " +
            "1-year program (AQF Level 9 Extension).",
        },
        ielts: {
          overall: 7.0,
          listening: 6.5,
          reading: 6.5,
          writing: 6.5,
          speaking: 6.5,
        },
        toefl: {
          overall: 94,
          listening: 24,
          reading: 24,
          writing: 27,
          speaking: 24,
        },
        relatedDegreeRequired: true,
        relatedDegreeNotes:
          "Requires a Bachelor of Laws (LLB), Juris Doctor (JD), or equivalent.",
        tuitionFeeAUD: 47000,
        tuitionFeeYear: 2026,
        duration: "1 year (24 units)",
        url: "https://adelaide.edu.au/study/degrees/master-of-laws/",
      },
    ],
  },

  // ============================================================
  // 6. UNIVERSITY OF TECHNOLOGY SYDNEY (UTS)
  // ============================================================
  {
    university: "University of Technology Sydney",
    shortName: "UTS",
    programs: [
      {
        programName: "Master of Finance",
        faculty: "UTS Business School",
        gpaRequirement: {
          scale: "Equivalent to Australian bachelor's degree with satisfactory GPA",
          tier211: "72%",
          nonTier211: "78%",
          notes:
            "UTS does NOT officially differentiate between 211 and non-211 Chinese " +
            "universities. All applicants are assessed equally based on their " +
            "academic record. Indicative thresholds from agent data: " +
            "211: ~72%, non-211: ~78%. " +
            "Also available as 2-year Finance (Extension) variant.",
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
          listening: 20,
          reading: 18,
          writing: 21,
          speaking: 20,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "Open to any bachelor's degree. " +
          "The 1.5-year standard version does not require a finance background.",
        tuitionFeeAUD: 51000,
        tuitionFeeYear: 2026,
        duration: "1.5 years (72 credit points)",
        url: "https://www.uts.edu.au/study/find-a-course/master-finance",
      },
      {
        programName: "Master of Management",
        faculty: "UTS Business School",
        gpaRequirement: {
          scale: "Equivalent to Australian bachelor's degree with satisfactory GPA",
          tier211: "72%",
          nonTier211: "78%",
          notes:
            "UTS does not differentiate 211 vs non-211. " +
            "Also available as 2-year Management (Extension) variant.",
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
          listening: 20,
          reading: 18,
          writing: 21,
          speaking: 20,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes: "Open to any bachelor's degree.",
        tuitionFeeAUD: 48000,
        tuitionFeeYear: 2026,
        duration: "1.5 years (72 credit points)",
        url: "https://www.uts.edu.au/courses/master-of-management",
      },
      {
        programName: "Master of Information Technology",
        faculty: "Faculty of Engineering and Information Technology",
        gpaRequirement: {
          scale: "Equivalent to Australian bachelor's degree with satisfactory GPA",
          tier211: "72%",
          nonTier211: "78%",
          notes:
            "UTS does not differentiate 211 vs non-211. " +
            "Also available as IT (Extension) 2-year and IT (Advanced) variants.",
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
          listening: 20,
          reading: 18,
          writing: 21,
          speaking: 20,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "Open to any bachelor's degree. " +
          "Students without an IT background take foundation subjects.",
        tuitionFeeAUD: 51000,
        tuitionFeeYear: 2026,
        duration: "2 years (96 credit points)",
        url: "https://www.uts.edu.au/courses/master-of-information-technology",
      },
      {
        programName: "Master of Data Science and Innovation",
        faculty: "Faculty of Engineering and Information Technology",
        gpaRequirement: {
          scale: "Equivalent to Australian bachelor's degree with satisfactory GPA",
          tier211: "72%",
          nonTier211: "78%",
          notes:
            "UTS does not differentiate 211 vs non-211. " +
            "This is UTS's primary data science program. " +
            "Note: the separate Master of Artificial Intelligence requires " +
            "a related IT/engineering/maths degree.",
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
          listening: 20,
          reading: 18,
          writing: 21,
          speaking: 20,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "Open to any bachelor's degree. " +
          "The program is designed for both technical and non-technical backgrounds.",
        tuitionFeeAUD: 47000,
        tuitionFeeYear: 2026,
        duration: "2 years (96 credit points)",
        url: "https://www.uts.edu.au/courses/master-of-data-science-and-innovation",
      },
      {
        programName: "Master of Artificial Intelligence",
        faculty: "Faculty of Engineering and Information Technology",
        gpaRequirement: {
          scale: "Equivalent to Australian bachelor's degree (75%+ pass) in IT/Engineering/Maths",
          tier211: "72%",
          nonTier211: "78%",
          notes:
            "Requires a related degree (IT, Electrical Engineering, Mathematical Sciences) " +
            "with at least 75% of subjects at pass level, or equivalent + 2 years " +
            "professional IT experience.",
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
          listening: 20,
          reading: 18,
          writing: 21,
          speaking: 20,
        },
        relatedDegreeRequired: true,
        relatedDegreeNotes:
          "Requires a bachelor's degree in IT, Electrical and Electronic Engineering " +
          "and Technology, or Mathematical Sciences, with at least 75% of subjects " +
          "completed at pass level. Alternatively, a bachelor's in these fields plus " +
          "minimum 2 years full-time relevant IT professional work experience.",
        tuitionFeeAUD: 51000,
        tuitionFeeYear: 2026,
        duration: "1.5 years (72 credit points)",
        url: "https://www.uts.edu.au/courses/master-of-artificial-intelligence",
      },
      {
        programName: "Master of Professional Engineering",
        faculty: "Faculty of Engineering and Information Technology",
        gpaRequirement: {
          scale: "Equivalent to Australian bachelor's degree with satisfactory GPA",
          tier211: "72%",
          nonTier211: "78%",
          notes:
            "Requires an engineering or relevant science background. " +
            "Engineers Australia (EA) accredited. " +
            "Specialisations: Biomedical, Civil, Electrical, Mechanical, Software, etc.",
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
          listening: 20,
          reading: 18,
          writing: 21,
          speaking: 20,
        },
        relatedDegreeRequired: true,
        relatedDegreeNotes:
          "Requires a bachelor's degree in engineering or a relevant science/technology " +
          "field. Also available as an Extension variant.",
        tuitionFeeAUD: 49000,
        tuitionFeeYear: 2026,
        duration: "2 years (96 credit points)",
        url: "https://www.uts.edu.au/courses/master-of-professional-engineering",
      },
      {
        programName: "Master of TESOL and Applied Linguistics",
        faculty: "Faculty of Arts and Social Sciences",
        gpaRequirement: {
          scale: "Equivalent to Australian bachelor's degree with satisfactory GPA",
          tier211: "72%",
          nonTier211: "78%",
          notes:
            "UTS's education offering is TESOL-focused rather than a traditional " +
            "Master of Education. Also available as 2-year Extension variant.",
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
          listening: 20,
          reading: 18,
          writing: 21,
          speaking: 20,
        },
        relatedDegreeRequired: false,
        relatedDegreeNotes:
          "Open to graduates of any discipline. " +
          "No teaching experience required for the standard 1.5-year version.",
        tuitionFeeAUD: 39000,
        tuitionFeeYear: 2026,
        duration: "1.5 years (72 credit points)",
        url: "https://www.uts.edu.au/study/find-a-course/master-tesol-and-applied-linguistics",
      },
    ],
  },
];
