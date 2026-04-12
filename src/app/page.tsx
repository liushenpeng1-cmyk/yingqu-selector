"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { schools, regionLabels, getLanguageCourseSuggestion, type Region } from "@/data/schools";
import { findUniversity, getTierLabel, type ChinaUniversity } from "@/data/china-universities";
import { majorCategories as majorCats, allSubMajors, categoryIdToName, checkCrossMajor } from "@/data/majors";
import { matchPrograms, schoolsWithPrograms, totalProgramCount, HOLISTIC_REVIEW_SCHOOLS, type ProgramMatchResult, type ProgramMatchLevel } from "@/data/programs";
import { undergradSubjectAreas, alevelSubjects, matchUndergradPrograms, totalUndergradProgramCount, type UndergradSchoolResult, type UndergradMatchLevel } from "@/data/undergrad-programs";
import { openReferral, type ReferralPayload } from "@/lib/referral";
import { useFavorites, MAX_FAVORITES } from "@/lib/favorites";

const levelConfig: Record<ProgramMatchLevel | "excluded", { label: string; color: string; bg: string; border: string }> = {
  high: { label: "很有可能", color: "text-green-400", bg: "bg-green-400/10", border: "border-l-green-400" },
  medium: { label: "有机会", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-l-yellow-400" },
  low: { label: "较难", color: "text-red-400", bg: "bg-red-400/10", border: "border-l-red-400" },
  excluded: { label: "无匹配项目", color: "text-white/25", bg: "bg-white/5", border: "border-l-white/20" },
};

// ── Animated counter component ──
function AnimatedNumber({ value, duration = 800 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const prevValue = useRef(0);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    if (start === end) return;

    const startTime = performance.now();
    let rafId: number;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        prevValue.current = end;
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [value, duration]);

  return <span>{display}</span>;
}

// ── Collapsible school card ──
function SchoolCard({
  school,
  programs: progs,
  bestLevel,
  langTest,
  rawLangScore,
  defaultExpanded,
  userTier,
  isFavoritedProgram,
  onToggleProgramFavorite,
  onApply,
}: {
  school: typeof schools[0];
  programs: ProgramMatchResult[];
  bestLevel: ProgramMatchLevel | "excluded";
  langTest: "IELTS" | "TOEFL";
  rawLangScore: number;
  defaultExpanded: boolean;
  userTier: string;
  isFavoritedProgram: (programId: string) => boolean;
  onToggleProgramFavorite: (programId: string) => void;
  onApply: () => void;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [progs]);

  // Re-measure when expanded changes (in case content loaded lazily)
  useEffect(() => {
    if (expanded && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [expanded]);

  return (
    <div className={`bg-[#12131a] border border-white/[0.06] rounded-2xl overflow-hidden border-l-[3px] ${levelConfig[bestLevel].border}`}>
      {/* School Header — tappable */}
      <div className="border-b border-white/[0.06] flex items-center">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex-1 min-w-0 px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between text-left active:bg-white/[0.03] transition-colors"
        >
          <div className="min-w-0 flex-1">
            <div className="font-bold text-[15px] sm:text-base truncate">{school.name}</div>
            <div className="text-xs text-white/30 mt-0.5 truncate">{school.nameEn} · QS #{school.qsRank} · {regionLabels[school.country]}</div>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${levelConfig[bestLevel].bg} ${levelConfig[bestLevel].color}`}>
              {progs.length} 个项目
            </span>
            <svg
              className={`w-4 h-4 text-white/30 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        <div className="pr-3 sm:pr-4 shrink-0">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onApply(); }}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#e8be64] text-[#0a0b0f] hover:bg-[#f0ca7a] active:scale-95 transition-all whitespace-nowrap"
          >
            <span className="hidden sm:inline">申请 →</span>
            <span className="sm:hidden">✈️</span>
          </button>
        </div>
      </div>

      {/* Collapsible program list */}
      <div
        style={{
          maxHeight: expanded ? (contentHeight ?? 9999) : 0,
          opacity: expanded ? 1 : 0,
        }}
        className="transition-all duration-400 ease-in-out overflow-hidden"
      >
        <div ref={contentRef} className="divide-y divide-white/[0.04]">
          {/* Holistic review notice — shown for schools where GPA alone is insufficient */}
          {HOLISTIC_REVIEW_SCHOOLS.has(school.id) && (
            <div className="px-4 sm:px-5 py-2.5 bg-[#e8be64]/5 border-b border-[#e8be64]/10 text-xs text-[#e8be64]/70 leading-relaxed">
              ⚠️ 综合评审制：GPA 和语言仅为基本门槛，实际录取受推荐信、PS、实习/科研、面试等多因素综合影响。标签已调整为保守评估。
            </div>
          )}
          {progs.map((result) => {
            const cfg = levelConfig[result.level];
            return (
              <div key={result.program.id} className="px-4 sm:px-5 py-3.5 sm:py-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2">
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm sm:text-[15px]">{result.program.name}</div>
                    <div className="text-xs text-white/25 mt-0.5 truncate">{result.program.nameEn} · {result.program.department}</div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
                      {cfg.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleProgramFavorite(result.program.id)}
                      aria-label={isFavoritedProgram(result.program.id) ? "取消收藏" : "加入收藏"}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-sm active:scale-90 transition-all hover:bg-white/[0.06]"
                    >
                      <span className={isFavoritedProgram(result.program.id) ? "" : "grayscale opacity-50"}>
                        {isFavoritedProgram(result.program.id) ? "❤️" : "🤍"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Stats row — horizontal scroll on mobile */}
                <div className="flex gap-3 sm:gap-4 text-sm mt-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                  <div className="shrink-0">
                    <span className="text-[11px] text-white/20 uppercase tracking-wider block">GPA</span>
                    <span className={`font-semibold text-xs sm:text-sm ${result.gpaStatus.passed ? "text-green-400" : result.gpaStatus.gap <= (result.program.gpaScale === "gpa4" ? 0.3 : 5) ? "text-yellow-400" : "text-red-400"}`}>
                      {result.gpaStatus.required}{result.program.gpaScale === "gpa4" ? "+" : "%+"} {result.gpaStatus.passed ? "✓" : `(差${Math.abs(result.gpaStatus.gap)})`}
                    </span>
                  </div>
                  <div className="shrink-0">
                    <span className="text-[11px] text-white/20 uppercase tracking-wider block">{langTest}</span>
                    <span className={`font-semibold text-xs sm:text-sm ${result.langStatus.passed ? "text-green-400" : result.langStatus.gap <= (langTest === "TOEFL" ? 5 : 0.5) ? "text-yellow-400" : "text-red-400"}`}>
                      {result.langStatus.required}+ {result.langStatus.passed ? "✓" : `(差${result.langStatus.gap})`}
                    </span>
                  </div>
                  <div className="shrink-0">
                    <span className="text-[11px] text-white/20 uppercase tracking-wider block">背景</span>
                    <span className={`font-semibold text-xs sm:text-sm ${result.crossMajorOk ? "text-green-400" : "text-red-400"}`}>
                      {result.crossMajorOk ? (result.crossMajorNote || "✓") : result.crossMajorNote}
                    </span>
                  </div>
                  {result.program.tuitionFee && (
                    <div className="shrink-0">
                      <span className="text-[11px] text-white/20 uppercase tracking-wider block">学费</span>
                      <span className="text-white/60 text-xs sm:text-sm">{result.program.tuitionFee}</span>
                    </div>
                  )}
                  {result.program.duration && (
                    <div className="shrink-0">
                      <span className="text-[11px] text-white/20 uppercase tracking-wider block">时长</span>
                      <span className="text-white/60 text-xs sm:text-sm">{result.program.duration}</span>
                    </div>
                  )}
                </div>

                {/* Language course suggestion when not meeting language requirement */}
                {!result.langStatus.passed && (() => {
                  const suggestion = getLanguageCourseSuggestion(school, result.langStatus.gap, langTest);
                  if (!suggestion) return null;
                  return (
                    <div className="mt-2 px-2.5 py-2 rounded-lg bg-purple-400/8 border border-purple-400/15 text-xs leading-relaxed">
                      <span className="text-purple-300 font-medium">🎓 语言班选项：</span>
                      <span className="text-purple-300/70 ml-1">
                        {suggestion.weeks > 0
                          ? `${suggestion.note}${suggestion.estimatedFee ? ` · 约 ${suggestion.estimatedFee}` : ""}`
                          : suggestion.note
                        }
                      </span>
                    </div>
                  );
                })()}

                {/* Extra requirements */}
                {result.program.extraRequirements && (
                  <div className="mt-2 px-2.5 py-1.5 rounded-lg bg-blue-400/8 border border-blue-400/15 text-xs text-blue-300">
                    📋 {result.program.extraRequirements}
                  </div>
                )}

                {/* Notes */}
                {result.program.notes && (
                  <div className="mt-2 text-xs text-white/25">{result.program.notes}</div>
                )}

                {/* Source link */}
                <div className="mt-2 flex items-center justify-end">
                  <a href={result.program.source} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-[#e8be64]/50 hover:text-[#e8be64] transition-colors">
                    查看官网要求 →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState<"form" | "loading" | "results">("form");
  const [studyLevel, setStudyLevel] = useState<"postgraduate" | "undergraduate">("postgraduate");

  // ── Undergraduate state ──
  const [ugCurriculum, setUgCurriculum] = useState<"alevel" | "ib" | "gaokao">("alevel");
  const [ugAlevelGrades, setUgAlevelGrades] = useState<{ subject: string; grade: string }[]>([
    { subject: "", grade: "" }, { subject: "", grade: "" }, { subject: "", grade: "" },
  ]);
  const [ugIbScore, setUgIbScore] = useState("");
  const [ugGaokaoScore, setUgGaokaoScore] = useState("");
  const [ugGaokaoTotal, setUgGaokaoTotal] = useState("750");
  const [ugLangTest, setUgLangTest] = useState<"IELTS" | "TOEFL">("IELTS");
  const [ugLangScore, setUgLangScore] = useState("");
  const [ugSubjectArea, setUgSubjectArea] = useState("economics");
  const [ugResults, setUgResults] = useState<UndergradSchoolResult[]>([]);

  const [isOverseasUndergrad, setIsOverseasUndergrad] = useState(false);
  const [isJointUniversity, setIsJointUniversity] = useState(false);
  const [jointUniType, setJointUniType] = useState<"uk-partner" | "us-partner" | "hk-partner" | "">(""); // XJTLU/UNNC=uk, NYU Shanghai/DKU=us, CUHK-SZ=hk
  const [schoolQuery, setSchoolQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<ChinaUniversity | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [gpa, setGpa] = useState("");
  const [gpaScale, setGpaScale] = useState<"percentage" | "gpa4">("percentage");
  const [ukClassification, setUkClassification] = useState<"first" | "2:1" | "2:2" | "">(""); // UK degree classification
  const [auClassification, setAuClassification] = useState<"hd" | "d" | "c" | "p" | "">(""); // AU WAM classification
  const [langTest, setLangTest] = useState<"IELTS" | "TOEFL">("IELTS");
  const [langScore, setLangScore] = useState("");
  const [langExempt, setLangExempt] = useState(false); // English-speaking country exemption
  const [currentCategoryId, setCurrentCategoryId] = useState("business");
  const [targetSubMajorId, setTargetSubMajorId] = useState("management");
  const [majorQuery, setMajorQuery] = useState("");
  const [showMajorDropdown, setShowMajorDropdown] = useState(false);
  const [bgQuery, setBgQuery] = useState("");
  const [showBgDropdown, setShowBgDropdown] = useState(false);
  const [regions, setRegions] = useState<Set<Region>>(new Set());
  const [showMoreRegions, setShowMoreRegions] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // ── Favorites (localStorage-backed) ──
  const favorites = useFavorites();

  // Budget calculator state
  const [budgetCurrency, setBudgetCurrency] = useState<"GBP" | "AUD" | "HKD" | "SGD" | "USD" | "CAD" | "EUR" | "JPY" | "KRW" | "NZD" | "MYR" | "SEK" | "DKK" | "NOK" | "CHF">("GBP");
  const [budgetTuition, setBudgetTuition] = useState("");
  const [budgetRent, setBudgetRent] = useState("");
  const [budgetLiving, setBudgetLiving] = useState("");
  const [budgetMonths, setBudgetMonths] = useState("12");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const majorDropdownRef = useRef<HTMLDivElement>(null);
  const bgDropdownRef = useRef<HTMLDivElement>(null);
  const resultsTopRef = useRef<HTMLDivElement>(null);

  const suggestions = findUniversity(schoolQuery);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
      if (majorDropdownRef.current && !majorDropdownRef.current.contains(e.target as Node)) setShowMajorDropdown(false);
      if (bgDropdownRef.current && !bgDropdownRef.current.contains(e.target as Node)) setShowBgDropdown(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Back-to-top visibility
  useEffect(() => {
    if (step !== "results") return;
    function handleScroll() {
      setShowBackToTop(window.scrollY > 600);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [step]);

  const tier = isOverseasUndergrad || isJointUniversity ? "overseas" : selectedSchool?.tier;
  const rawLangScore = langExempt ? 99 : (parseFloat(langScore) || 0); // 99 = always passes
  // Degree classification → equivalent percentage for matching
  // UK: First=nearly all, 2:1=most top-50, 2:2=borderline
  // AU: HD=nearly all, D=most top-50, C=borderline, P=difficult
  const hasClassification = ukClassification || auClassification;
  const classificationGpa = ukClassification
    ? (ukClassification === "first" ? 92 : ukClassification === "2:1" ? 82 : 72)
    : auClassification
    ? (auClassification === "hd" ? 92 : auClassification === "d" ? 82 : auClassification === "c" ? 72 : 62)
    : 0;
  const rawGpaInput = hasClassification ? classificationGpa : (parseFloat(gpa) || 0);
  const effectiveGpaScale = hasClassification ? "percentage" as const : gpaScale;

  const targetSubMajor = allSubMajors.find((s) => s.id === targetSubMajorId);
  const selectedTargetLabel = targetSubMajor ? `${targetSubMajor.name} (${targetSubMajor.nameEn})` : "";
  const selectedBgLabel = majorCats.find(c => c.id === currentCategoryId)?.name || "";

  // Filter sub-majors by search query
  const filteredSubMajors = majorQuery.length > 0
    ? allSubMajors.filter(s =>
        s.name.includes(majorQuery) ||
        s.nameEn.toLowerCase().includes(majorQuery.toLowerCase()) ||
        s.categoryName.includes(majorQuery) ||
        (s.keywords && s.keywords.some(k => k.toLowerCase().includes(majorQuery.toLowerCase()) || majorQuery.toLowerCase().includes(k.toLowerCase())))
      ).slice(0, 10)
    : allSubMajors.slice(0, 10);

  // Filter categories by search
  const filteredBgCats = bgQuery.length > 0
    ? majorCats.filter(c => c.name.includes(bgQuery))
    : majorCats;
  const targetCategoryId = targetSubMajor?.categoryId || "business";
  const targetCategoryName = categoryIdToName[targetCategoryId] || "商科";
  const currentCategoryName = categoryIdToName[currentCategoryId] || "商科";
  const isCrossMajor = currentCategoryId !== targetCategoryId;
  const crossMajorCheck = targetSubMajor ? checkCrossMajor(currentCategoryId, targetSubMajor) : null;

  // Build program-level results grouped by school
  type SchoolGroup = {
    school: typeof schools[0];
    programs: ProgramMatchResult[];
    bestLevel: ProgramMatchLevel | "excluded";
  };

  const schoolResults = useMemo<SchoolGroup[]>(() => {
    if (!tier && !isOverseasUndergrad && !isJointUniversity) return [];
    return schools
      .filter((s) => regions.size === 0 || regions.has(s.country))
      .filter((s) => schoolsWithPrograms.has(s.id))
      .map((school) => {
        const progs = matchPrograms(
          school.id, tier || "overseas", rawGpaInput, rawLangScore, langTest, targetCategoryId, currentCategoryName, targetSubMajorId, effectiveGpaScale
        );
        const bestLevel: ProgramMatchLevel | "excluded" = progs.length === 0
          ? "excluded"
          : progs[0].level;
        return { school, programs: progs, bestLevel };
      })
      .sort((a, b) => {
        const order = { high: 0, medium: 1, low: 2, excluded: 3 };
        return order[a.bestLevel] - order[b.bestLevel] || a.school.qsRank - b.school.qsRank;
      });
  }, [tier, rawGpaInput, rawLangScore, langTest, targetCategoryId, currentCategoryName, targetSubMajorId, effectiveGpaScale, regions]);

  const counts = {
    high: schoolResults.filter((r) => r.bestLevel === "high").length,
    medium: schoolResults.filter((r) => r.bestLevel === "medium").length,
    low: schoolResults.filter((r) => r.bestLevel === "low").length,
    excluded: schoolResults.filter((r) => r.bestLevel === "excluded").length,
  };

  const totalPrograms = schoolResults.reduce((sum, s) => sum + s.programs.length, 0);

  const hasGpa = (isOverseasUndergrad || isJointUniversity)
    ? (hasClassification || (gpa && parseFloat(gpa) > 0))
    : (gpa && parseFloat(gpa) > 0);
  const hasLang = langExempt || (langScore && rawLangScore > 0);
  const hasSchool = isOverseasUndergrad || isJointUniversity || selectedSchool;
  const canSubmit = hasSchool && hasGpa && hasLang && regions.size > 0;

  function handleSelectSchool(uni: ChinaUniversity) {
    setSelectedSchool(uni);
    setSchoolQuery(uni.name);
    setShowDropdown(false);
  }

  function handleSchoolInput(value: string) {
    setSchoolQuery(value);
    setSelectedSchool(null);
    setShowDropdown(value.length > 0);
  }

  // ── Referral payload builders ──
  const buildPgPayload = useCallback((schoolIds: string[], programIds?: string[]): ReferralPayload => ({
    ref: "yingqu",
    target: "pg",
    schoolIds,
    programIds: programIds && programIds.length > 0 ? programIds : undefined,
    regions: Array.from(regions),
    lang: langTest,
    langScore: langScore || undefined,
    langExempt: langExempt || undefined,
    gpa: gpa || undefined,
    gpaScale,
    userTier: tier || undefined,
    currentCategoryId,
    targetSubMajorId,
    ukClassification: ukClassification || undefined,
    auClassification: auClassification || undefined,
    isOverseasUndergrad: isOverseasUndergrad || undefined,
    isJointUniversity: isJointUniversity || undefined,
    jointUniType: jointUniType || undefined,
  }), [regions, langTest, langScore, langExempt, gpa, gpaScale, tier, currentCategoryId, targetSubMajorId, ukClassification, auClassification, isOverseasUndergrad, isJointUniversity, jointUniType]);

  const buildUgPayload = useCallback((schoolIds: string[], programIds?: string[]): ReferralPayload => ({
    ref: "yingqu",
    target: "ug",
    schoolIds,
    programIds: programIds && programIds.length > 0 ? programIds : undefined,
    regions: Array.from(regions),
    lang: ugLangTest,
    langScore: ugLangScore || undefined,
    curriculum: ugCurriculum,
    alevelGrades: ugCurriculum === "alevel"
      ? ugAlevelGrades.filter(g => g.subject && g.grade)
      : undefined,
    ibScore: ugCurriculum === "ib" ? (ugIbScore || undefined) : undefined,
    gaokaoScore: ugCurriculum === "gaokao" ? (ugGaokaoScore || undefined) : undefined,
    gaokaoTotal: ugCurriculum === "gaokao" ? (ugGaokaoTotal || undefined) : undefined,
    subjectArea: ugSubjectArea,
  }), [regions, ugLangTest, ugLangScore, ugCurriculum, ugAlevelGrades, ugIbScore, ugGaokaoScore, ugGaokaoTotal, ugSubjectArea]);

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;
    setStep("loading");
    // Brief loading animation, then show results
    setTimeout(() => {
      setStep("results");
      // Scroll to top after results render
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 50);
    }, 1200);
  }, [canSubmit]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const schoolsWithMatches = schoolResults.filter(g => g.programs.length > 0);
  const schoolsWithoutMatches = schoolResults.filter(g => g.programs.length === 0);

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 bg-[#0a0b0f]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#e8be64] font-bold text-base sm:text-lg" style={{ fontFamily: "serif" }}>
              英区大发明家
            </span>
            <span className="text-white/30 text-xs sm:text-sm">· 选校器</span>
          </div>
          {(step === "results" || step === "loading") && (
            <button onClick={() => setStep("form")} className="text-sm text-white/50 hover:text-white transition-colors">
              ← 重新评估
            </button>
          )}
        </div>
      </nav>

      {/* ═══════════════ LOADING TRANSITION ═══════════════ */}
      {step === "loading" && (
        <main className="pt-24 pb-20 px-6 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-[#e8be64]/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#e8be64] animate-spin" />
            <div className="absolute inset-3 rounded-full border-2 border-transparent border-t-[#e8be64]/60 animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
          </div>
          <div className="text-lg font-semibold text-[#e8be64] mb-2 animate-pulse">正在匹配项目...</div>
          <div className="text-sm text-white/30">{studyLevel === "undergraduate" ? `匹配 ${ugResults.length} 所学校的录取标准` : `分析 ${schoolResults.length} 所学校的录取标准`}</div>
        </main>
      )}

      {/* ═══════════════ FORM ═══════════════ */}
      {step === "form" && (
        <main className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-[#e8be64]/30 bg-[#e8be64]/10 text-[#e8be64] text-xs sm:text-sm mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8be64] animate-pulse" />
              覆盖 {studyLevel === "undergraduate" ? `${totalUndergradProgramCount} 个本科项目` : `${schools.length} 所学校 · ${totalProgramCount} 个具体项目`}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-3 sm:mb-4">
              你的成绩<br />
              <span className="bg-gradient-to-r from-[#e8be64] to-[#f0d78c] bg-clip-text text-transparent">
                能申哪些项目？
              </span>
            </h1>
            <p className="text-white/50 text-base sm:text-lg">
              精确到专业级别，每个项目独立匹配。
            </p>

            {/* Study level toggle */}
            <div className="flex justify-center mt-5 sm:mt-6">
              <div className="inline-flex bg-[#181920] border border-white/[0.06] rounded-xl overflow-hidden">
                <button type="button" onClick={() => { setStudyLevel("undergraduate"); setRegions(prev => prev.size === 0 ? new Set<Region>(["UK"]) : prev); }}
                  className={`px-5 sm:px-6 py-2.5 text-sm font-medium transition-all ${studyLevel === "undergraduate" ? "bg-[#e8be64] text-[#0a0b0f]" : "text-white/40 hover:text-white"}`}>
                  本科申请
                </button>
                <button type="button" onClick={() => setStudyLevel("postgraduate")}
                  className={`px-5 sm:px-6 py-2.5 text-sm font-medium transition-all ${studyLevel === "postgraduate" ? "bg-[#e8be64] text-[#0a0b0f]" : "text-white/40 hover:text-white"}`}>
                  硕士申请
                </button>
              </div>
            </div>
          </div>

          {/* ═══ Undergraduate form ═══ */}
          {studyLevel === "undergraduate" && step === "form" && (
            <div className="bg-[#12131a] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/[0.06] flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-white/30 text-sm ml-2">填写你的背景信息（本科申请）</span>
              </div>
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">

                {/* Curriculum selector */}
                <div>
                  <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">课程体系 <span className="text-[#e8be64] text-xs">●</span></label>
                  <div className="flex bg-[#181920] border border-white/[0.06] rounded-xl overflow-hidden">
                    <button type="button" onClick={() => setUgCurriculum("alevel")}
                      className={`flex-1 px-3 py-2.5 text-xs sm:text-sm font-medium transition-all ${ugCurriculum === "alevel" ? "bg-[#e8be64] text-[#0a0b0f]" : "text-white/40 hover:text-white"}`}>A-Level</button>
                    <button type="button" onClick={() => setUgCurriculum("ib")}
                      className={`flex-1 px-3 py-2.5 text-xs sm:text-sm font-medium transition-all ${ugCurriculum === "ib" ? "bg-[#e8be64] text-[#0a0b0f]" : "text-white/40 hover:text-white"}`}>IB</button>
                    <button type="button" onClick={() => setUgCurriculum("gaokao")}
                      className={`flex-1 px-3 py-2.5 text-xs sm:text-sm font-medium transition-all ${ugCurriculum === "gaokao" ? "bg-[#e8be64] text-[#0a0b0f]" : "text-white/40 hover:text-white"}`}>高考直申</button>
                  </div>
                </div>

                {/* A-Level subjects & grades */}
                {ugCurriculum === "alevel" && (
                  <div>
                    <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">A-Level 科目与成绩 <span className="text-[#e8be64] text-xs">●</span></label>
                    <div className="space-y-2">
                      {ugAlevelGrades.map((g, i) => (
                        <div key={i} className="flex gap-2">
                          <select value={g.subject} onChange={(e) => { const next = [...ugAlevelGrades]; next[i] = { ...next[i], subject: e.target.value }; setUgAlevelGrades(next); }}
                            className="flex-1 bg-[#181920] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-[#f0ede6] outline-none focus:border-[#e8be64] appearance-none">
                            <option value="">选择科目</option>
                            {alevelSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <select value={g.grade} onChange={(e) => { const next = [...ugAlevelGrades]; next[i] = { ...next[i], grade: e.target.value }; setUgAlevelGrades(next); }}
                            className="w-20 bg-[#181920] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm text-[#f0ede6] outline-none focus:border-[#e8be64] appearance-none">
                            <option value="">等级</option>
                            {["A*", "A", "B", "C", "D", "E"].map(g => <option key={g} value={g}>{g}</option>)}
                          </select>
                          {i >= 3 && (
                            <button type="button" onClick={() => { const next = [...ugAlevelGrades]; next.splice(i, 1); setUgAlevelGrades(next); }}
                              className="px-2 text-white/30 hover:text-red-400 text-sm">✕</button>
                          )}
                        </div>
                      ))}
                      {ugAlevelGrades.length < 4 && (
                        <button type="button" onClick={() => setUgAlevelGrades([...ugAlevelGrades, { subject: "", grade: "" }])}
                          className="text-sm text-[#e8be64]/60 hover:text-[#e8be64] transition-colors">+ 添加第四门科目</button>
                      )}
                    </div>
                  </div>
                )}

                {/* IB score */}
                {ugCurriculum === "ib" && (
                  <div>
                    <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">IB 预估/实际总分 <span className="text-[#e8be64] text-xs">●</span></label>
                    <input type="number" value={ugIbScore} onChange={(e) => setUgIbScore(e.target.value)} placeholder="例：38（满分45）" min="1" max="45"
                      className="w-full bg-[#181920] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f0ede6] placeholder:text-white/20 outline-none focus:border-[#e8be64] text-base" />
                  </div>
                )}

                {/* Gaokao score */}
                {ugCurriculum === "gaokao" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">高考总分 <span className="text-[#e8be64] text-xs">●</span></label>
                      <div className="flex gap-2">
                        <input type="number" value={ugGaokaoScore} onChange={(e) => setUgGaokaoScore(e.target.value)} placeholder="你的分数"
                          className="flex-1 bg-[#181920] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f0ede6] placeholder:text-white/20 outline-none focus:border-[#e8be64] text-base" />
                        <span className="flex items-center text-white/30 text-sm">/</span>
                        <select value={ugGaokaoTotal} onChange={(e) => setUgGaokaoTotal(e.target.value)}
                          className="w-24 bg-[#181920] border border-white/[0.06] rounded-xl px-3 py-3 text-sm text-[#f0ede6] outline-none focus:border-[#e8be64] appearance-none">
                          <option value="750">750</option>
                          <option value="660">660</option>
                          <option value="810">810</option>
                          <option value="900">900</option>
                        </select>
                      </div>
                    </div>
                    <p className="text-xs text-white/30">目前英国接受高考直申的学校包括：伯明翰、格拉斯哥、利兹、南安、埃克塞特等</p>
                  </div>
                )}

                {/* Language */}
                <div>
                  <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">语言成绩</label>
                  <div className="flex gap-2">
                    <div className="flex bg-[#181920] border border-white/[0.06] rounded-xl overflow-hidden">
                      <button type="button" onClick={() => setUgLangTest("IELTS")}
                        className={`px-3 py-2.5 text-xs font-medium transition-all ${ugLangTest === "IELTS" ? "bg-[#e8be64] text-[#0a0b0f]" : "text-white/40 hover:text-white"}`}>IELTS</button>
                      <button type="button" onClick={() => setUgLangTest("TOEFL")}
                        className={`px-3 py-2.5 text-xs font-medium transition-all ${ugLangTest === "TOEFL" ? "bg-[#e8be64] text-[#0a0b0f]" : "text-white/40 hover:text-white"}`}>TOEFL</button>
                    </div>
                    <input type="number" value={ugLangScore} onChange={(e) => setUgLangScore(e.target.value)}
                      placeholder={ugLangTest === "IELTS" ? "例：6.5" : "例：90"} step={ugLangTest === "IELTS" ? "0.5" : "1"}
                      className="flex-1 bg-[#181920] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f0ede6] placeholder:text-white/20 outline-none focus:border-[#e8be64] text-base" />
                  </div>
                </div>

                {/* Target subject area */}
                <div>
                  <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">目标专业方向 <span className="text-[#e8be64] text-xs">●</span></label>
                  <div className="flex flex-wrap gap-1.5">
                    {undergradSubjectAreas.map(area => (
                      <button key={area.id} type="button" onClick={() => setUgSubjectArea(area.id)}
                        className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${ugSubjectArea === area.id ? "bg-[#e8be64] text-[#0a0b0f]" : "bg-[#181920] border border-white/[0.06] text-white/50 hover:text-white"}`}>
                        {area.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Region — aligned with postgraduate flow */}
                <div>
                  <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">目标地区（可多选） <span className="text-[#e8be64] text-xs">●</span></label>
                  <div className="flex sm:flex-wrap gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                    {(["UK", "AU", "US", "CA", "NZ", "HK", "SG"] as Region[]).map((key) => {
                      const selected = regions.has(key);
                      return (
                        <button key={key} type="button"
                          onClick={() => { const next = new Set(regions); if (selected) next.delete(key); else next.add(key); setRegions(next); }}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${
                            selected ? "bg-[#e8be64] text-[#0a0b0f]" : "bg-[#181920] border border-white/[0.06] text-white/50 hover:text-white active:bg-white/5"
                          }`}>{regionLabels[key]}</button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-white/30 mt-2">目前本科数据以英国为主，美国/澳洲/加拿大/新西兰陆续补充中</p>
                </div>

                {/* Submit */}
                <button onClick={() => {
                  const results = matchUndergradPrograms({
                    curriculum: ugCurriculum,
                    alevelGrades: ugCurriculum === "alevel" ? ugAlevelGrades.filter(g => g.subject && g.grade) : undefined,
                    ibScore: ugCurriculum === "ib" ? parseFloat(ugIbScore) : undefined,
                    gaokaoScore: ugCurriculum === "gaokao" ? parseFloat(ugGaokaoScore) : undefined,
                    gaokaoTotal: ugCurriculum === "gaokao" ? parseFloat(ugGaokaoTotal) : undefined,
                    langScore: parseFloat(ugLangScore) || 0,
                    langTest: ugLangTest,
                    subjectArea: ugSubjectArea,
                    regions,
                  });
                  setUgResults(results);
                  setStep("loading");
                  setTimeout(() => setStep("results"), 1200);
                }}
                  disabled={
                    regions.size === 0 ||
                    (ugCurriculum === "alevel" && ugAlevelGrades.filter(g => g.subject && g.grade).length < 3) ||
                    (ugCurriculum === "ib" && !ugIbScore) ||
                    (ugCurriculum === "gaokao" && !ugGaokaoScore)
                  }
                  className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-base transition-all ${
                    (regions.size > 0 &&
                      ((ugCurriculum === "alevel" && ugAlevelGrades.filter(g => g.subject && g.grade).length >= 3) ||
                       (ugCurriculum === "ib" && ugIbScore) ||
                       (ugCurriculum === "gaokao" && ugGaokaoScore)))
                      ? "bg-[#e8be64] text-[#0a0b0f] hover:shadow-[0_8px_30px_rgba(232,190,100,0.25)] active:scale-[0.98] cursor-pointer"
                      : "bg-[#e8be64]/20 text-[#e8be64]/40 cursor-not-allowed"
                  }`}>开始匹配 →</button>
              </div>
            </div>
          )}

          {/* ═══ Postgraduate form ═══ */}
          {studyLevel === "postgraduate" && <div className="bg-[#12131a] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/[0.06] flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-white/30 text-sm ml-2">填写你的背景信息</span>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              {/* Background type toggle: China / Joint / Overseas */}
              <div>
                <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">本科背景 <span className="text-[#e8be64] text-xs">●</span></label>
                <div className="flex bg-[#181920] border border-white/[0.06] rounded-xl overflow-hidden mb-3">
                  <button type="button" onClick={() => { setIsOverseasUndergrad(false); setIsJointUniversity(false); setLangExempt(false); setUkClassification(""); setAuClassification(""); setJointUniType(""); setSelectedSchool(null); setSchoolQuery(""); }}
                    className={`flex-1 px-3 py-2.5 text-xs sm:text-sm font-medium transition-all ${!isOverseasUndergrad && !isJointUniversity ? "bg-[#e8be64] text-[#0a0b0f]" : "text-white/40 hover:text-white"}`}>🇨🇳 中国本科</button>
                  <button type="button" onClick={() => { setIsOverseasUndergrad(false); setIsJointUniversity(true); setSelectedSchool(null); setSchoolQuery(""); setGpa(""); setUkClassification(""); setAuClassification(""); }}
                    className={`flex-1 px-3 py-2.5 text-xs sm:text-sm font-medium transition-all ${isJointUniversity ? "bg-[#e8be64] text-[#0a0b0f]" : "text-white/40 hover:text-white"}`}>🏫 中外合办</button>
                  <button type="button" onClick={() => { setIsOverseasUndergrad(true); setIsJointUniversity(false); setSelectedSchool(null); setSchoolQuery(""); setGpaScale("gpa4"); setGpa(""); setUkClassification(""); setAuClassification(""); setJointUniType(""); }}
                    className={`flex-1 px-3 py-2.5 text-xs sm:text-sm font-medium transition-all ${isOverseasUndergrad ? "bg-[#e8be64] text-[#0a0b0f]" : "text-white/40 hover:text-white"}`}>🌍 海外本科</button>
                </div>
              </div>

              {/* School Search (China only) */}
              {!isOverseasUndergrad && !isJointUniversity && <div ref={dropdownRef} className="relative">
                <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">本科院校 <span className="text-[#e8be64] text-xs">●</span></label>
                <input
                  type="text" value={schoolQuery}
                  onChange={(e) => handleSchoolInput(e.target.value)}
                  onFocus={() => schoolQuery.length > 0 && setShowDropdown(true)}
                  placeholder="搜索你的学校，例：浙江工商大学"
                  className={`w-full bg-[#181920] border rounded-xl px-4 py-3 sm:py-3.5 text-[#f0ede6] placeholder:text-white/20 outline-none transition-all text-base ${
                    selectedSchool ? "border-[#e8be64]/40 bg-[#e8be64]/5" : "border-white/[0.06] focus:border-[#e8be64]"
                  }`}
                />
                {selectedSchool && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#e8be64]/15 text-[#e8be64] border border-[#e8be64]/20">
                      {getTierLabel(selectedSchool.tier)}
                    </span>
                    <span className="text-xs text-white/30">系统自动识别</span>
                  </div>
                )}
                {showDropdown && suggestions.length > 0 && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#1a1b24] border border-white/10 rounded-xl overflow-hidden shadow-2xl max-h-64 overflow-y-auto">
                    {suggestions.map((uni) => (
                      <button key={uni.name} onClick={() => handleSelectSchool(uni)}
                        className="w-full px-4 py-3 text-left hover:bg-white/5 active:bg-white/8 transition-colors flex items-center justify-between">
                        <span className="text-[#f0ede6]">{uni.name}</span>
                        <span className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded">{getTierLabel(uni.tier)}</span>
                      </button>
                    ))}
                  </div>
                )}
                {showDropdown && schoolQuery.length >= 2 && suggestions.length === 0 && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#1a1b24] border border-white/10 rounded-xl overflow-hidden shadow-2xl p-4 text-sm text-white/40">
                    未找到该院校，将按&ldquo;双非&rdquo;标准评估。
                    <button onClick={() => { setSelectedSchool({ name: schoolQuery, tier: "双非" }); setShowDropdown(false); }}
                      className="block mt-2 text-[#e8be64] hover:underline">以&ldquo;双非&rdquo;标准继续 →</button>
                  </div>
                )}
              </div>}

              {/* Joint university (中外合办) info */}
              {isJointUniversity && (
                <div className="bg-[#181920] border border-[#e8be64]/20 rounded-xl p-4 space-y-3">
                  <div className="text-sm text-[#e8be64]/80">🏫 中外合办大学</div>
                  <div className="text-xs text-white/40 leading-relaxed">中外合办学位不走985/211/双非体系，海外院校按合作方学位标准评估。选择你的学校类型：</div>
                  <div className="space-y-2">
                    {([
                      ["uk-partner", "🇬🇧 英方合作（西交利物浦/宁波诺丁汉等）", "按UK学位评估，使用UK分级制（60-69%=2:1）。绕过院校List。"],
                      ["us-partner", "🇺🇸 美方合作（上海纽约/昆山杜克等）", "按美国学位评估，使用4.0制GPA。绕过院校List。"],
                      ["hk-partner", "🇭🇰 港方合作（港中深等）", "评估方式因目标校而异。部分按港校学位，部分按中国大陆院校。建议查目标校官方说明。"],
                    ] as const).map(([val, label, desc]) => (
                      <button key={val} type="button" onClick={() => {
                        setJointUniType(val);
                        if (val === "uk-partner") { setGpaScale("percentage"); setUkClassification(""); setAuClassification(""); }
                        else if (val === "us-partner") { setGpaScale("gpa4"); setUkClassification(""); setAuClassification(""); }
                        else { setGpaScale("gpa4"); setUkClassification(""); setAuClassification(""); }
                        setGpa("");
                      }}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          jointUniType === val ? "bg-[#e8be64]/15 border border-[#e8be64]/30" : "bg-[#12131a] border border-white/[0.06] hover:border-white/20"
                        }`}>
                        <div className={`text-xs font-medium ${jointUniType === val ? "text-[#e8be64]" : "text-white/60"}`}>{label}</div>
                        <div className="text-[11px] text-white/30 mt-0.5 leading-relaxed">{desc}</div>
                      </button>
                    ))}
                  </div>
                  {jointUniType === "uk-partner" && (
                    <div>
                      <div className="text-xs text-white/40 mb-1.5">UK 学位等级</div>
                      <div className="flex flex-wrap gap-1.5">
                        {([["first", "First (70%+)"], ["2:1", "2:1 (60-69%)"], ["2:2", "2:2 (50-59%)"], ["", "手动输入%"]] as const).map(([val, label]) => (
                          <button key={val} type="button" onClick={() => { setUkClassification(val); setAuClassification(""); if (val) setGpa(""); }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              ukClassification === val ? "bg-[#e8be64] text-[#0a0b0f]" : "bg-[#12131a] border border-white/[0.06] text-white/40 hover:text-white"
                            }`}>{label}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Overseas undergrad info */}
              {isOverseasUndergrad && (
                <div className="bg-[#181920] border border-[#e8be64]/20 rounded-xl p-4 space-y-3">
                  <div className="text-sm text-[#e8be64]/80">🌍 海外本科申请</div>
                  <div className="text-xs text-white/40 leading-relaxed">海外本科不受院校 List 限制，使用与 985/211 相同的 GPA 门槛评估。英语国家本科可免语言成绩。</div>
                  {/* UK Classification shortcut */}
                  <div>
                    <div className="text-xs text-white/40 mb-1.5">🇬🇧 英国学位等级</div>
                    <div className="flex flex-wrap gap-1.5">
                      {([["first", "First"], ["2:1", "2:1"], ["2:2", "2:2"], ["", "不适用"]] as const).map(([val, label]) => (
                        <button key={val} type="button" onClick={() => { setUkClassification(val); setAuClassification(""); if (val) setGpa(""); }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            ukClassification === val && !auClassification ? "bg-[#e8be64] text-[#0a0b0f]" : "bg-[#12131a] border border-white/[0.06] text-white/40 hover:text-white"
                          }`}>{label}</button>
                      ))}
                    </div>
                  </div>
                  {/* AU Classification shortcut */}
                  <div>
                    <div className="text-xs text-white/40 mb-1.5">🇦🇺 澳洲 WAM 等级</div>
                    <div className="flex flex-wrap gap-1.5">
                      {([["hd", "HD (85+)"], ["d", "D (75-84)"], ["c", "C (65-74)"], ["p", "P (50-64)"], ["", "不适用"]] as const).map(([val, label]) => (
                        <button key={val} type="button" onClick={() => { setAuClassification(val); setUkClassification(""); if (val) setGpa(""); }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            auClassification === val && !ukClassification ? "bg-[#e8be64] text-[#0a0b0f]" : "bg-[#12131a] border border-white/[0.06] text-white/40 hover:text-white"
                          }`}>{label}</button>
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-white/25">美本/港本/加本直接用下方 GPA 4.0 制输入即可</div>
                  {/* Language exemption */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={langExempt} onChange={(e) => { setLangExempt(e.target.checked); if (e.target.checked) setLangScore(""); }}
                      className="w-4 h-4 rounded accent-[#e8be64]" />
                    <span className="text-xs text-white/50">英语国家本科，免语言成绩</span>
                  </label>
                </div>
              )}

              {/* GPA + Language — side by side on wider phones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* GPA — hide if UK classification selected */}
                {!hasClassification && <div>
                  <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">GPA <span className="text-[#e8be64] text-xs">●</span></label>
                  <div className="flex gap-2 items-start">
                    <div className="flex bg-[#181920] border border-white/[0.06] rounded-xl overflow-hidden shrink-0">
                      {([["percentage", "百分制"], ["gpa4", "4.0制"]] as const).map(([val, label]) => (
                        <button key={val} type="button" onClick={() => { setGpaScale(val); setGpa(""); }}
                          className={`px-3 sm:px-4 py-3 sm:py-3.5 text-sm font-medium transition-all ${
                            gpaScale === val ? "bg-[#e8be64] text-[#0a0b0f]" : "text-white/40 hover:text-white"
                          }`}>{label}</button>
                      ))}
                    </div>
                    <input type="number" inputMode="decimal" step={gpaScale === "gpa4" ? "0.1" : "1"} value={gpa}
                      onChange={(e) => setGpa(e.target.value)}
                      placeholder={gpaScale === "gpa4" ? "3.5" : "85"}
                      className="flex-1 min-w-0 bg-[#181920] border border-white/[0.06] rounded-xl px-4 py-3 sm:py-3.5 text-[#f0ede6] placeholder:text-white/20 focus:border-[#e8be64] outline-none transition-all text-base" />
                  </div>
                </div>}

                {/* Language — show unless exempt */}
                {!langExempt && <div>
                  <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">语言成绩 {!langExempt && <span className="text-[#e8be64] text-xs">●</span>}</label>
                  <div className="flex gap-2 items-start">
                    <div className="flex bg-[#181920] border border-white/[0.06] rounded-xl overflow-hidden shrink-0">
                      {(["IELTS", "TOEFL"] as const).map((t) => (
                        <button key={t} type="button" onClick={() => { setLangTest(t); setLangScore(""); }}
                          className={`px-3 sm:px-4 py-3 sm:py-3.5 text-sm font-medium transition-all ${
                            langTest === t ? "bg-[#e8be64] text-[#0a0b0f]" : "text-white/40 hover:text-white"
                          }`}>{t}</button>
                      ))}
                    </div>
                    <input type="number" inputMode="decimal" step={langTest === "IELTS" ? "0.5" : "1"} value={langScore}
                      onChange={(e) => setLangScore(e.target.value)}
                      placeholder={langTest === "IELTS" ? "6.5" : "90"}
                      className="flex-1 min-w-0 bg-[#181920] border border-white/[0.06] rounded-xl px-4 py-3 sm:py-3.5 text-[#f0ede6] placeholder:text-white/20 focus:border-[#e8be64] outline-none transition-all text-base" />
                  </div>
                </div>}

                {/* Show exempt badge when language is exempt */}
                {langExempt && (
                  <div className="flex items-center justify-center">
                    <div className="bg-green-400/10 text-green-400 border border-green-400/20 rounded-xl px-4 py-3 text-sm font-medium text-center w-full">✓ 英语国家本科免试</div>
                  </div>
                )}
                {/* Show UK class badge when selected */}
                {hasClassification && (
                  <div className="flex items-center justify-center">
                    <div className="bg-[#e8be64]/10 text-[#e8be64] border border-[#e8be64]/20 rounded-xl px-4 py-3 text-xs font-medium text-center w-full leading-relaxed">
                      {ukClassification === "first" ? "🇬🇧 First — 几乎所有学校达标" : ukClassification === "2:1" ? "🇬🇧 2:1 — 绝大多数学校的标准门槛" : ukClassification === "2:2" ? "🇬🇧 2:2 — 部分学校接受，需材料补强" : ""}
                      {auClassification === "hd" ? "🇦🇺 HD — 几乎所有学校达标" : auClassification === "d" ? "🇦🇺 Distinction — 绝大多数学校达标" : auClassification === "c" ? "🇦🇺 Credit — 部分学校接受" : auClassification === "p" ? "🇦🇺 Pass — 较难，少数学校接受" : ""}
                    </div>
                  </div>
                )}
              </div>

              {/* 本科专业 — searchable */}
              <div ref={bgDropdownRef} className="relative">
                <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">本科专业方向 <span className="text-[#e8be64] text-xs">●</span></label>
                <input type="text" value={showBgDropdown ? bgQuery : selectedBgLabel}
                  onChange={(e) => { setBgQuery(e.target.value); setShowBgDropdown(true); }}
                  onFocus={() => { setBgQuery(""); setShowBgDropdown(true); }}
                  placeholder="搜索或选择，例：商科"
                  className={`w-full bg-[#181920] border rounded-xl px-4 py-3 sm:py-3.5 text-[#f0ede6] placeholder:text-white/20 outline-none transition-all text-base ${
                    !showBgDropdown && selectedBgLabel ? "border-[#e8be64]/40 bg-[#e8be64]/5" : "border-white/[0.06] focus:border-[#e8be64]"
                  }`} />
                {showBgDropdown && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#1a1b24] border border-white/10 rounded-xl overflow-hidden shadow-2xl max-h-60 overflow-y-auto">
                    {filteredBgCats.map((cat) => (
                      <button key={cat.id} onClick={() => { setCurrentCategoryId(cat.id); setBgQuery(""); setShowBgDropdown(false); }}
                        className={`w-full px-4 py-3 text-left hover:bg-white/5 active:bg-white/8 transition-colors ${
                          currentCategoryId === cat.id ? "bg-[#e8be64]/10 text-[#e8be64]" : "text-[#f0ede6]"
                        }`}>{cat.name}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* 申请专业 — searchable */}
              <div ref={majorDropdownRef} className="relative">
                <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">申请具体专业 <span className="text-[#e8be64] text-xs">●</span></label>
                <input type="text" value={showMajorDropdown ? majorQuery : selectedTargetLabel}
                  onChange={(e) => { setMajorQuery(e.target.value); setShowMajorDropdown(true); }}
                  onFocus={() => { setMajorQuery(""); setShowMajorDropdown(true); }}
                  placeholder="搜索专业，例：金融、Finance、TESOL"
                  className={`w-full bg-[#181920] border rounded-xl px-4 py-3 sm:py-3.5 text-[#f0ede6] placeholder:text-white/20 outline-none transition-all text-base ${
                    !showMajorDropdown && selectedTargetLabel ? "border-[#e8be64]/40 bg-[#e8be64]/5" : "border-white/[0.06] focus:border-[#e8be64]"
                  }`} />
                {showMajorDropdown && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#1a1b24] border border-white/10 rounded-xl overflow-hidden shadow-2xl max-h-72 overflow-y-auto">
                    {filteredSubMajors.map((sub) => (
                      <button key={sub.id} onClick={() => { setTargetSubMajorId(sub.id); setMajorQuery(""); setShowMajorDropdown(false); }}
                        className={`w-full px-4 py-3 text-left hover:bg-white/5 active:bg-white/8 transition-colors flex items-center justify-between ${
                          targetSubMajorId === sub.id ? "bg-[#e8be64]/10" : ""
                        }`}>
                        <div className="min-w-0 flex-1">
                          <span className={targetSubMajorId === sub.id ? "text-[#e8be64]" : "text-[#f0ede6]"}>{sub.name}</span>
                          <span className="text-white/25 ml-2 text-sm">{sub.nameEn}</span>
                        </div>
                        <span className="text-xs text-white/20 bg-white/5 px-2 py-0.5 rounded shrink-0 ml-2">{sub.categoryName}</span>
                      </button>
                    ))}
                    {filteredSubMajors.length === 0 && (
                      <div className="px-4 py-3 text-sm text-white/30">未找到匹配专业</div>
                    )}
                  </div>
                )}
              </div>

              {isCrossMajor && crossMajorCheck && (
                <div className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm leading-relaxed ${
                  crossMajorCheck.compatible
                    ? "bg-green-400/8 border border-green-400/15 text-green-400/80"
                    : "bg-red-400/8 border border-red-400/15 text-red-400/80"
                }`}>
                  {crossMajorCheck.compatible ? "✅" : "⚠️"} 跨专业（{currentCategoryName} → {targetSubMajor?.name}）：{crossMajorCheck.note || "建议查看具体项目要求"}
                </div>
              )}

              {/* Region — grouped with expandable sections */}
              <div>
                <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">目标地区（可多选） <span className="text-[#e8be64] text-xs">●</span></label>
                {/* Popular regions — always visible */}
                <div className="flex sm:flex-wrap gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                  {(["UK", "AU", "HK", "SG", "US", "CA"] as Region[]).map((key) => {
                    const selected = regions.has(key);
                    return (
                      <button key={key} type="button"
                        onClick={() => { const next = new Set(regions); if (selected) next.delete(key); else next.add(key); setRegions(next); }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${
                          selected ? "bg-[#e8be64] text-[#0a0b0f]" : "bg-[#181920] border border-white/[0.06] text-white/50 hover:text-white active:bg-white/5"
                        }`}>{regionLabels[key]}</button>
                    );
                  })}
                  <button type="button" onClick={() => setShowMoreRegions(!showMoreRegions)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-all shrink-0 bg-[#181920] border border-white/[0.06] text-white/40 hover:text-white active:bg-white/5">
                    {showMoreRegions ? "收起 ↑" : "更多地区 ↓"}
                  </button>
                </div>
                {/* Expanded region groups */}
                {showMoreRegions && (
                  <div className="mt-3 space-y-2.5">
                    {([
                      { label: "亚洲", keys: ["JP", "KR", "MY", "IN", "SA", "QA"] as Region[] },
                      { label: "欧洲", keys: ["DE", "CH", "NL", "FR", "SE", "DK", "FI", "NO", "IE", "IT", "ES", "BE", "AT"] as Region[] },
                      { label: "大洋洲", keys: ["NZ"] as Region[] },
                      { label: "其他", keys: ["RU", "AR", "BR", "CL", "MX", "CO", "KZ", "ZA"] as Region[] },
                    ]).map((group) => (
                      <div key={group.label}>
                        <div className="text-xs text-white/30 mb-1">{group.label}</div>
                        <div className="flex sm:flex-wrap gap-1.5 overflow-x-auto scrollbar-hide">
                          {group.keys.map((key) => {
                            const selected = regions.has(key);
                            return (
                              <button key={key} type="button"
                                onClick={() => { const next = new Set(regions); if (selected) next.delete(key); else next.add(key); setRegions(next); }}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                                  selected ? "bg-[#e8be64] text-[#0a0b0f]" : "bg-[#181920] border border-white/[0.06] text-white/50 hover:text-white active:bg-white/5"
                                }`}>{regionLabels[key]}</button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={handleSubmit} disabled={!canSubmit}
                className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-base transition-all ${
                  canSubmit ? "bg-[#e8be64] text-[#0a0b0f] hover:shadow-[0_8px_30px_rgba(232,190,100,0.25)] active:scale-[0.98] cursor-pointer"
                    : "bg-[#e8be64]/20 text-[#e8be64]/40 cursor-not-allowed"
                }`}>开始匹配 →</button>
            </div>
          </div>}
          <p className="text-center text-white/20 text-xs sm:text-sm mt-6 sm:mt-8">数据来源：各校官网公开录取标准</p>

          {/* WeChat Group + BBnotes Ad */}
          <div className="mt-8 sm:mt-12 space-y-4">
            {/* WeChat Group */}
            <div className="bg-[#181920] border border-white/[0.06] rounded-2xl p-5 sm:p-6 text-center">
              <h3 className="text-sm font-semibold text-white/70 mb-1">加入择校交流群</h3>
              <p className="text-xs text-white/30 mb-4">和其他同学交流申请经验、分享选校心得</p>
              <img src="/wechat-group.jpg" alt="微信群二维码" className="w-48 sm:w-56 mx-auto rounded-xl" />
              <p className="text-[11px] text-white/20 mt-3">微信扫码加入「英区大发明家择校器」交流群</p>
            </div>

            {/* BBnotes Ad */}
            <a href="https://apps.apple.com/gb/app/bbnotes-ai-lecture-notes-pdf/id6758214249" target="_blank" rel="noopener noreferrer"
              className="block bg-gradient-to-r from-[#e8be64]/10 to-[#e8be64]/5 border border-[#e8be64]/20 rounded-2xl p-5 sm:p-6 hover:border-[#e8be64]/40 transition-all group">
              <div className="flex items-center gap-4">
                <img src="/bbnotes-icon.jpg" alt="BBnotes" className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-[#e8be64]">BBnotes - AI Lecture Notes PDF</h3>
                  <p className="text-xs text-white/40 mt-0.5">英区大发明家第一个发明 — 留学生专属笔记 App，录音秒变笔记，AI 整理课堂重点</p>
                  <p className="text-[11px] text-[#e8be64]/50 mt-1">非大陆 App Store 可下载 · 切换至任意外区即可搜索 · 使用教程见抖音/小红书主页置顶</p>
                </div>
                <span className="text-xs text-[#e8be64]/60 group-hover:text-[#e8be64] transition-colors shrink-0">下载 →</span>
              </div>
            </a>
          </div>
        </main>
      )}

      {/* ═══════════════ UNDERGRADUATE RESULTS ═══════════════ */}
      {step === "results" && studyLevel === "undergraduate" && (
        <main className="pt-20 sm:pt-24 pb-20 px-4 sm:px-6 max-w-5xl mx-auto animate-fade-in">
          <div ref={resultsTopRef} />
          <div className="flex flex-wrap gap-3 mb-4">
            {(["high", "medium", "low", "excluded"] as const).map(level => {
              const count = ugResults.filter(r => r.bestLevel === level).length;
              const cfg = { high: { label: "很有可能", color: "text-green-400" }, medium: { label: "有机会", color: "text-yellow-400" }, low: { label: "较难", color: "text-red-400" }, excluded: { label: "不匹配", color: "text-white/25" } }[level];
              return count > 0 && <span key={level} className={`text-sm ${cfg.color}`}>{cfg.label} {count} 所</span>;
            })}
          </div>
          <div className="space-y-4">
            {ugResults.filter(r => r.bestLevel !== "excluded").map(school => (
              <div key={school.schoolId} className="bg-[#12131a] border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-white/[0.06] flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#f0ede6]">{school.schoolName}</h3>
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-white/5 text-white/50">{regionLabels[school.country]}</span>
                    </div>
                    <p className="text-xs text-white/30">{school.schoolNameEn}</p>
                  </div>
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => openReferral(buildUgPayload([school.schoolId], school.programs.map(r => r.program.id)))}
                      className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#e8be64] text-[#0a0b0f] hover:bg-[#f0ca7a] active:scale-95 transition-all whitespace-nowrap"
                    >
                      <span className="hidden sm:inline">申请 →</span>
                      <span className="sm:hidden">✈️</span>
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {school.programs.filter(r => r.level !== "excluded").map(r => {
                    const cfg = { high: { label: "很有可能", color: "text-green-400", bg: "bg-green-400/10", border: "border-l-green-400" }, medium: { label: "有机会", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-l-yellow-400" }, low: { label: "较难", color: "text-red-400", bg: "bg-red-400/10", border: "border-l-red-400" }, excluded: { label: "不匹配", color: "text-white/25", bg: "bg-white/5", border: "border-l-white/20" } }[r.level];
                    return (
                      <div key={r.program.id} className={`px-4 sm:px-5 py-3 sm:py-4 border-l-[3px] ${cfg.border} ${cfg.bg}`}>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="min-w-0 flex-1">
                            <span className="font-medium text-[#f0ede6] text-sm">{r.program.name}</span>
                            <span className="text-white/30 text-xs ml-2">{r.program.nameEn}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${cfg.color} ${cfg.bg}`}>{cfg.label}</span>
                            <button
                              type="button"
                              onClick={() => favorites.toggle(school.schoolId, r.program.id)}
                              aria-label={favorites.has(r.program.id) ? "取消收藏" : "加入收藏"}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-sm active:scale-90 transition-all hover:bg-white/[0.06]"
                            >
                              <span className={favorites.has(r.program.id) ? "" : "grayscale opacity-50"}>
                                {favorites.has(r.program.id) ? "❤️" : "🤍"}
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/40 mt-1">
                          <span>A-Level: {r.program.alpiLevel}</span>
                          {r.program.ibScore && <span>IB: {r.program.ibScore}</span>}
                          {r.program.gaokaoPercent && <span>高考: {r.program.gaokaoPercent}%+</span>}
                          <span>IELTS: {r.program.ieltsOverall}</span>
                          <span>{r.program.duration}</span>
                          {r.program.tuitionFee && <span>{r.program.tuitionFee}/年</span>}
                        </div>
                        {r.program.requiredSubjects && (
                          <div className="text-xs text-white/30 mt-1">必修: {r.program.requiredSubjects.join(", ")}</div>
                        )}
                        {r.program.notes && <div className="text-xs text-[#e8be64]/50 mt-1">{r.program.notes}</div>}
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-xs text-white/25">{r.reason}</div>
                          {r.program.source && (
                            <a href={r.program.source} target="_blank" rel="noopener noreferrer"
                              className="text-xs text-[#e8be64]/50 hover:text-[#e8be64] transition-colors shrink-0 ml-2">
                              查看官网 →
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {ugResults.filter(r => r.bestLevel !== "excluded").length === 0 && (
              <div className="text-center py-12 text-white/40">
                <p className="text-lg mb-2">暂无匹配结果</p>
                <p className="text-sm">请检查输入信息或尝试其他专业方向</p>
              </div>
            )}
          </div>
        </main>
      )}

      {/* ═══════════════ POSTGRADUATE RESULTS ═══════════════ */}
      {step === "results" && studyLevel === "postgraduate" && (selectedSchool || isOverseasUndergrad || isJointUniversity) && (
        <main className="pt-20 sm:pt-24 pb-20 px-4 sm:px-6 max-w-5xl mx-auto animate-fade-in">
          <div ref={resultsTopRef} />

          {/* Profile summary */}
          <div className="bg-[#181920] border border-white/[0.06] rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#e8be64]/20 to-[#e8be64]/5 flex items-center justify-center text-lg sm:text-xl shrink-0">🎓</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm sm:text-base truncate">{isJointUniversity ? "🏫 中外合办" : isOverseasUndergrad ? "🌍 海外本科" : selectedSchool?.name}</h3>
                <p className="text-xs sm:text-sm text-white/40 truncate">
                  {isJointUniversity ? (jointUniType === "uk-partner" ? "英方合作·UK学位" : jointUniType === "us-partner" ? "美方合作·US学位" : "港方合作") : isOverseasUndergrad ? "海外本科" : getTierLabel(selectedSchool?.tier || "")} · GPA {ukClassification ? `UK ${ukClassification === "first" ? "First" : ukClassification}` : auClassification ? `AU ${auClassification.toUpperCase()}` : gpa} · {langExempt ? "语言免试" : `${langTest} ${langScore}`} · {targetSubMajor?.name || targetCategoryName}
                </p>
              </div>
              <button onClick={() => setStep("form")} className="text-xs sm:text-sm text-[#e8be64] hover:underline shrink-0">修改</button>
            </div>

            {/* Animated stats */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/[0.06]">
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-white/80">
                  <AnimatedNumber value={schoolResults.length} />
                </div>
                <div className="text-[11px] text-white/35">所学校</div>
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-white/80">
                  <AnimatedNumber value={totalPrograms} />
                </div>
                <div className="text-[11px] text-white/35">个项目</div>
              </div>
              {counts.high > 0 && (
                <div className="px-3 py-2 rounded-lg bg-green-400/8 border border-green-400/15 text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-green-400">
                    <AnimatedNumber value={counts.high} />
                  </div>
                  <div className="text-[11px] text-green-400/50">很有可能</div>
                </div>
              )}
              {counts.medium > 0 && (
                <div className="px-3 py-2 rounded-lg bg-yellow-400/8 border border-yellow-400/15 text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-yellow-400">
                    <AnimatedNumber value={counts.medium} />
                  </div>
                  <div className="text-[11px] text-yellow-400/50">有机会</div>
                </div>
              )}
              {counts.low > 0 && (
                <div className="px-3 py-2 rounded-lg bg-red-400/8 border border-red-400/15 text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-red-400">
                    <AnimatedNumber value={counts.low} />
                  </div>
                  <div className="text-[11px] text-red-400/50">较难</div>
                </div>
              )}
            </div>
          </div>

          {isCrossMajor && crossMajorCheck && (
            <div className={`mb-3 sm:mb-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm ${
              crossMajorCheck.compatible ? "bg-green-400/8 border border-green-400/15 text-green-400/80"
                : "bg-red-400/8 border border-red-400/15 text-red-400/80"
            }`}>
              {crossMajorCheck.compatible ? "✅" : "⚠️"} 跨专业（{currentCategoryName} → {targetSubMajor?.name}）：{crossMajorCheck.note}
            </div>
          )}

          {/* School Groups — collapsible */}
          <div className="space-y-4 sm:space-y-6">
            {schoolsWithMatches.map(({ school, programs: progs, bestLevel }, index) => (
              <SchoolCard
                key={school.id}
                school={school}
                programs={progs}
                bestLevel={bestLevel}
                langTest={langTest}
                rawLangScore={rawLangScore}
                defaultExpanded={index === 0}
                userTier={tier || ""}
                isFavoritedProgram={favorites.has}
                onToggleProgramFavorite={(programId) => favorites.toggle(school.id, programId)}
                onApply={() => openReferral(buildPgPayload([school.id], progs.map(p => p.program.id)))}
              />
            ))}

            {/* Schools with no matching programs */}
            {schoolsWithoutMatches.length > 0 && (
              <div className="bg-[#12131a] border border-white/[0.06] rounded-2xl p-4 sm:p-5 opacity-50">
                <div className="text-sm text-white/40 mb-2">以下学校暂无 {targetCategoryName} 方向的项目数据：</div>
                <div className="flex flex-wrap gap-2">
                  {schoolsWithoutMatches.map(({ school }) => (
                    <span key={school.id} className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded">
                      {school.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-white/15 text-xs mt-6 sm:mt-8 max-w-xl mx-auto leading-relaxed px-2">
            数据基于各校官网公开录取标准，按专业级别匹配。同一专业在不同学校可能归属不同学院。具体要求以各校官网为准。
          </p>

          {/* Budget Calculator */}
          {(() => {
            const currencyInfo: Record<string, { symbol: string; label: string; rate: number }> = {
              GBP: { symbol: "£", label: "🇬🇧 英镑", rate: 9.3 },
              AUD: { symbol: "A$", label: "🇦🇺 澳元", rate: 4.7 },
              HKD: { symbol: "HK$", label: "🇭🇰 港币", rate: 0.93 },
              SGD: { symbol: "S$", label: "🇸🇬 新加坡元", rate: 5.5 },
              USD: { symbol: "$", label: "🇺🇸 美元", rate: 7.2 },
              CAD: { symbol: "C$", label: "🇨🇦 加元", rate: 5.3 },
              EUR: { symbol: "€", label: "🇪🇺 欧元", rate: 8.0 },
              JPY: { symbol: "¥", label: "🇯🇵 日元", rate: 0.049 },
              KRW: { symbol: "₩", label: "🇰🇷 韩元", rate: 0.0052 },
              NZD: { symbol: "NZ$", label: "🇳🇿 新西兰元", rate: 4.3 },
              MYR: { symbol: "RM", label: "🇲🇾 马来西亚林吉特", rate: 1.66 },
              SEK: { symbol: "kr", label: "🇸🇪 瑞典克朗", rate: 0.72 },
              DKK: { symbol: "kr", label: "🇩🇰 丹麦克朗", rate: 1.07 },
              NOK: { symbol: "kr", label: "🇳🇴 挪威克朗", rate: 0.68 },
              CHF: { symbol: "CHF", label: "🇨🇭 瑞士法郎", rate: 8.4 },
            };
            const ci = currencyInfo[budgetCurrency];
            const tuition = parseFloat(budgetTuition) || 0;
            const rent = parseFloat(budgetRent) || 0;
            const living = parseFloat(budgetLiving) || 0;
            const months = parseInt(budgetMonths) || 12;
            const totalLocal = tuition + (rent + living) * months;
            const totalRMB = Math.round(totalLocal * ci.rate);
            const hasInput = tuition > 0 || rent > 0 || living > 0;

            return (
              <div className="mt-8 sm:mt-10 bg-[#181920] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-[#f0ede6] mb-1">留学预算计算器</h3>
                <p className="text-xs text-white/30 mb-5">手动输入你的预期花销，快速估算留学总预算</p>

                {/* Currency selector */}
                <div className="mb-4">
                  <label className="block text-sm text-white/50 mb-1.5">目的地货币</label>
                  <select value={budgetCurrency} onChange={e => setBudgetCurrency(e.target.value as typeof budgetCurrency)}
                    className="w-full bg-[#12131a] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f0ede6] outline-none focus:border-[#e8be64] transition-all text-sm appearance-none">
                    {Object.entries(currencyInfo).map(([k, v]) => <option key={k} value={k}>{v.label} ({v.symbol})</option>)}
                  </select>
                </div>

                {/* Inputs grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-sm text-white/50 mb-1.5">学费总额 ({ci.symbol})</label>
                    <input type="number" value={budgetTuition} onChange={e => setBudgetTuition(e.target.value)}
                      placeholder="如 35000" className="w-full bg-[#12131a] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f0ede6] placeholder:text-white/15 outline-none focus:border-[#e8be64] text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 mb-1.5">学制 (月)</label>
                    <select value={budgetMonths} onChange={e => setBudgetMonths(e.target.value)}
                      className="w-full bg-[#12131a] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f0ede6] outline-none focus:border-[#e8be64] text-sm appearance-none">
                      <option value="9">9 个月</option>
                      <option value="10">10 个月</option>
                      <option value="12">12 个月 (1年)</option>
                      <option value="15">15 个月</option>
                      <option value="18">18 个月 (1.5年)</option>
                      <option value="24">24 个月 (2年)</option>
                      <option value="30">30 个月 (2.5年)</option>
                      <option value="36">36 个月 (3年)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 mb-1.5">月租 ({ci.symbol}/月)</label>
                    <input type="number" value={budgetRent} onChange={e => setBudgetRent(e.target.value)}
                      placeholder="如 800" className="w-full bg-[#12131a] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f0ede6] placeholder:text-white/15 outline-none focus:border-[#e8be64] text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 mb-1.5">月生活费 ({ci.symbol}/月)</label>
                    <input type="number" value={budgetLiving} onChange={e => setBudgetLiving(e.target.value)}
                      placeholder="如 500" className="w-full bg-[#12131a] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f0ede6] placeholder:text-white/15 outline-none focus:border-[#e8be64] text-sm" />
                  </div>
                </div>

                {/* Result */}
                {hasInput && (
                  <div className="bg-[#e8be64]/5 border border-[#e8be64]/20 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">学费</span>
                      <span className="text-[#f0ede6]">{ci.symbol}{tuition.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">住房 ({months}个月)</span>
                      <span className="text-[#f0ede6]">{ci.symbol}{(rent * months).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">生活费 ({months}个月)</span>
                      <span className="text-[#f0ede6]">{ci.symbol}{(living * months).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 mt-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm text-white/50">预计总预算</span>
                        <div className="text-right">
                          <span className="text-lg font-bold text-[#e8be64]">{ci.symbol}{totalLocal.toLocaleString()}</span>
                          <span className="text-sm text-white/40 ml-2">≈ ¥{totalRMB.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-white/15 mt-3">汇率为估算值，实际以银行牌价为准。不含签证费、机票、保险等其他费用。</p>
              </div>
            );
          })()}

          {/* WeChat Group + BBnotes Ad */}
          <div className="mt-6 sm:mt-8 space-y-4">
            <div className="bg-[#181920] border border-white/[0.06] rounded-2xl p-5 sm:p-6 text-center">
              <h3 className="text-sm font-semibold text-white/70 mb-1">加入择校交流群</h3>
              <p className="text-xs text-white/30 mb-4">和其他同学交流申请经验、分享选校心得</p>
              <img src="/wechat-group.jpg" alt="微信群二维码" className="w-48 sm:w-56 mx-auto rounded-xl" />
              <p className="text-[11px] text-white/20 mt-3">微信扫码加入「英区大发明家择校器」交流群</p>
            </div>
            <a href="https://apps.apple.com/gb/app/bbnotes-ai-lecture-notes-pdf/id6758214249" target="_blank" rel="noopener noreferrer"
              className="block bg-gradient-to-r from-[#e8be64]/10 to-[#e8be64]/5 border border-[#e8be64]/20 rounded-2xl p-5 sm:p-6 hover:border-[#e8be64]/40 transition-all group">
              <div className="flex items-center gap-4">
                <img src="/bbnotes-icon.jpg" alt="BBnotes" className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-[#e8be64]">BBnotes - AI Lecture Notes PDF</h3>
                  <p className="text-xs text-white/40 mt-0.5">英区大发明家第一个发明 — 留学生专属笔记 App，录音秒变笔记，AI 整理课堂重点</p>
                  <p className="text-[11px] text-[#e8be64]/50 mt-1">非大陆 App Store 可下载 · 切换至任意外区即可搜索 · 使用教程见抖音/小红书主页置顶</p>
                </div>
                <span className="text-xs text-[#e8be64]/60 group-hover:text-[#e8be64] transition-colors shrink-0">下载 →</span>
              </div>
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="回到顶部"
            className={`fixed bottom-6 right-4 sm:right-6 z-40 w-11 h-11 rounded-full bg-[#e8be64] text-[#0a0b0f] shadow-lg shadow-[#e8be64]/20 flex items-center justify-center transition-all duration-300 active:scale-90 ${
              showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </main>
      )}

      {/* Favorites floating bar — visible when cart has items on results step */}
      {step === "results" && favorites.hydrated && favorites.count > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-40 sm:max-w-sm">
          <div className="bg-[#12131a] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 px-4 py-3 flex items-center gap-3 backdrop-blur-sm">
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-white/40 uppercase tracking-wider">收藏夹</div>
              <div className="text-sm font-semibold text-[#f0ede6]">{favorites.count} / {MAX_FAVORITES} 个专业 · {favorites.schoolIds.length} 所学校</div>
            </div>
            <button
              type="button"
              onClick={favorites.clear}
              className="text-xs text-white/40 hover:text-white/60 transition-colors shrink-0 px-2 py-1"
            >
              清空
            </button>
            <button
              type="button"
              onClick={() => {
                const payload = studyLevel === "undergraduate"
                  ? buildUgPayload(favorites.schoolIds, favorites.programIds)
                  : buildPgPayload(favorites.schoolIds, favorites.programIds);
                openReferral(payload);
              }}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#e8be64] text-[#0a0b0f] hover:bg-[#f0ca7a] active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              批量申请 {favorites.count} 个 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
