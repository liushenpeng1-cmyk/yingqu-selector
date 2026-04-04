"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { schools, regionLabels, getLanguageCourseSuggestion, type Region } from "@/data/schools";
import { findUniversity, getTierLabel, type ChinaUniversity } from "@/data/china-universities";
import { majorCategories as majorCats, allSubMajors, categoryIdToName, checkCrossMajor } from "@/data/majors";
import { matchPrograms, schoolsWithPrograms, totalSchoolCount, totalProgramCount, type ProgramMatchResult, type ProgramMatchLevel } from "@/data/programs";

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
}: {
  school: typeof schools[0];
  programs: ProgramMatchResult[];
  bestLevel: ProgramMatchLevel | "excluded";
  langTest: "IELTS" | "TOEFL";
  rawLangScore: number;
  defaultExpanded: boolean;
  userTier: string;
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
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 sm:px-5 py-3.5 sm:py-4 border-b border-white/[0.06] flex items-center justify-between text-left active:bg-white/[0.03] transition-colors"
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

      {/* Collapsible program list */}
      <div
        style={{
          maxHeight: expanded ? (contentHeight ?? 9999) : 0,
          opacity: expanded ? 1 : 0,
        }}
        className="transition-all duration-400 ease-in-out overflow-hidden"
      >
        <div ref={contentRef} className="divide-y divide-white/[0.04]">
          {/* Holistic review notice for non-UK/AU regions */}
          {(school.country !== "UK" && school.country !== "AU") && (
            <div className="px-4 sm:px-5 py-2.5 bg-[#e8be64]/5 border-b border-[#e8be64]/10 text-xs text-[#e8be64]/70 leading-relaxed">
              ⚠️ {school.country === "US" ? "美国" : school.country === "CA" ? "加拿大" : school.country === "HK" ? "香港" : "新加坡"}院校采用综合评审制（Holistic Review），GPA 仅为参考门槛，实际录取受 GRE/GMAT、推荐信、PS、面试、科研/实习等多因素影响。
            </div>
          )}
          {/* Strong warning for 双非 + US Top 30 */}
          {school.country === "US" && school.qsRank <= 30 && !["985", "211", "双一流"].includes(userTier) && (
            <div className="px-4 sm:px-5 py-2.5 bg-red-500/10 border-b border-red-500/20 text-xs text-red-400/90 leading-relaxed">
              🚨 双非背景申请 QS Top 30 美国院校难度极大。美国顶尖校非常看重本科院校声誉，双非录取案例极少。GPA 达标不代表有竞争力，建议同时准备保底方案。
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
                  <span className={`px-2 py-0.5 rounded-md text-xs font-semibold shrink-0 ${cfg.bg} ${cfg.color}`}>
                    {cfg.label}
                  </span>
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

  const [schoolQuery, setSchoolQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<ChinaUniversity | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [gpa, setGpa] = useState("");
  const [gpaScale, setGpaScale] = useState<"percentage" | "gpa4">("percentage");
  const [langTest, setLangTest] = useState<"IELTS" | "TOEFL">("IELTS");
  const [langScore, setLangScore] = useState("");
  const [currentCategoryId, setCurrentCategoryId] = useState("business");
  const [targetSubMajorId, setTargetSubMajorId] = useState("management");
  const [majorQuery, setMajorQuery] = useState("");
  const [showMajorDropdown, setShowMajorDropdown] = useState(false);
  const [bgQuery, setBgQuery] = useState("");
  const [showBgDropdown, setShowBgDropdown] = useState(false);
  const [regions, setRegions] = useState<Set<Region>>(new Set(["UK", "AU", "HK", "SG", "CA", "US"]));
  const [showBackToTop, setShowBackToTop] = useState(false);
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

  const tier = selectedSchool?.tier;
  const rawLangScore = parseFloat(langScore) || 0;
  const rawGpaInput = parseFloat(gpa) || 0;

  const targetSubMajor = allSubMajors.find((s) => s.id === targetSubMajorId);
  const selectedTargetLabel = targetSubMajor ? `${targetSubMajor.name} (${targetSubMajor.nameEn})` : "";
  const selectedBgLabel = majorCats.find(c => c.id === currentCategoryId)?.name || "";

  // Filter sub-majors by search query
  const filteredSubMajors = majorQuery.length > 0
    ? allSubMajors.filter(s =>
        s.name.includes(majorQuery) ||
        s.nameEn.toLowerCase().includes(majorQuery.toLowerCase()) ||
        s.categoryName.includes(majorQuery)
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
    if (!tier) return [];
    return schools
      .filter((s) => regions.size === 0 || regions.has(s.country))
      .filter((s) => schoolsWithPrograms.has(s.id))
      .map((school) => {
        let progs = matchPrograms(
          school.id, tier, rawGpaInput, rawLangScore, langTest, targetCategoryId, currentCategoryName, targetSubMajorId, gpaScale
        );
        // 双非 + US Top 30: cap at "medium" — GPA达标不代表有竞争力
        const isNonElite = !["985", "211", "双一流"].includes(tier);
        if (isNonElite && school.country === "US" && school.qsRank <= 30) {
          progs = progs.map(p => p.level === "high" ? { ...p, level: "medium" as ProgramMatchLevel } : p);
        }
        const bestLevel: ProgramMatchLevel | "excluded" = progs.length === 0
          ? "excluded"
          : progs[0].level;
        return { school, programs: progs, bestLevel };
      })
      .sort((a, b) => {
        const order = { high: 0, medium: 1, low: 2, excluded: 3 };
        return order[a.bestLevel] - order[b.bestLevel] || a.school.qsRank - b.school.qsRank;
      });
  }, [tier, rawGpaInput, rawLangScore, langTest, targetCategoryId, currentCategoryName, targetSubMajorId, gpaScale, regions]);

  const counts = {
    high: schoolResults.filter((r) => r.bestLevel === "high").length,
    medium: schoolResults.filter((r) => r.bestLevel === "medium").length,
    low: schoolResults.filter((r) => r.bestLevel === "low").length,
    excluded: schoolResults.filter((r) => r.bestLevel === "excluded").length,
  };

  const totalPrograms = schoolResults.reduce((sum, s) => sum + s.programs.length, 0);

  const canSubmit = selectedSchool && gpa && langScore && parseFloat(gpa) > 0 && rawLangScore > 0;

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
          <div className="text-sm text-white/30">分析 {schoolResults.length} 所学校的录取标准</div>
        </main>
      )}

      {/* ═══════════════ FORM ═══════════════ */}
      {step === "form" && (
        <main className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-[#e8be64]/30 bg-[#e8be64]/10 text-[#e8be64] text-xs sm:text-sm mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8be64] animate-pulse" />
              覆盖 {totalSchoolCount} 所学校 · {totalProgramCount} 个具体项目
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
          </div>

          <div className="bg-[#12131a] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/[0.06] flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-white/30 text-sm ml-2">填写你的背景信息</span>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              {/* School Search */}
              <div ref={dropdownRef} className="relative">
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
              </div>

              {/* GPA + Language — side by side on wider phones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
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
                </div>

                <div>
                  <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">语言成绩 <span className="text-[#e8be64] text-xs">●</span></label>
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
                </div>
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

              {/* Region — horizontal scroll on mobile */}
              <div>
                <label className="block text-sm text-white/50 mb-1.5 sm:mb-2">目标地区（可多选）</label>
                <div className="flex sm:flex-wrap gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                  {(Object.entries(regionLabels) as [Region, string][]).map(([key, label]) => {
                    const selected = regions.has(key);
                    return (
                      <button key={key} type="button"
                        onClick={() => { const next = new Set(regions); if (selected) next.delete(key); else next.add(key); setRegions(next); }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all shrink-0 ${
                          selected ? "bg-[#e8be64] text-[#0a0b0f]" : "bg-[#181920] border border-white/[0.06] text-white/50 hover:text-white active:bg-white/5"
                        }`}>{label}</button>
                    );
                  })}
                </div>
              </div>

              <button onClick={handleSubmit} disabled={!canSubmit}
                className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-base transition-all ${
                  canSubmit ? "bg-[#e8be64] text-[#0a0b0f] hover:shadow-[0_8px_30px_rgba(232,190,100,0.25)] active:scale-[0.98] cursor-pointer"
                    : "bg-[#e8be64]/20 text-[#e8be64]/40 cursor-not-allowed"
                }`}>开始匹配 →</button>
            </div>
          </div>
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

      {/* ═══════════════ RESULTS ═══════════════ */}
      {step === "results" && selectedSchool && (
        <main className="pt-20 sm:pt-24 pb-20 px-4 sm:px-6 max-w-5xl mx-auto animate-fade-in">
          <div ref={resultsTopRef} />

          {/* Profile summary */}
          <div className="bg-[#181920] border border-white/[0.06] rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#e8be64]/20 to-[#e8be64]/5 flex items-center justify-center text-lg sm:text-xl shrink-0">🎓</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm sm:text-base truncate">{selectedSchool.name}</h3>
                <p className="text-xs sm:text-sm text-white/40 truncate">
                  {getTierLabel(selectedSchool.tier)} · GPA {gpa} · {langTest} {langScore} · {targetSubMajor?.name || targetCategoryName}
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
    </div>
  );
}
