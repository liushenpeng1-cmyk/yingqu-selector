"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { schools, regionLabels, type Region } from "@/data/schools";
import { findUniversity, getTierLabel, type ChinaUniversity } from "@/data/china-universities";
import { majorCategories as majorCats, allSubMajors, categoryIdToName, checkCrossMajor } from "@/data/majors";
import { matchPrograms, schoolsWithPrograms, type ProgramMatchResult, type ProgramMatchLevel } from "@/data/programs";

const levelConfig: Record<ProgramMatchLevel | "excluded", { label: string; color: string; bg: string; border: string }> = {
  high: { label: "很有可能", color: "text-green-400", bg: "bg-green-400/10", border: "border-l-green-400" },
  medium: { label: "有机会", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-l-yellow-400" },
  low: { label: "较难", color: "text-red-400", bg: "bg-red-400/10", border: "border-l-red-400" },
  excluded: { label: "无匹配项目", color: "text-white/25", bg: "bg-white/5", border: "border-l-white/20" },
};

export default function Home() {
  const [step, setStep] = useState<"form" | "results">("form");

  const [schoolQuery, setSchoolQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<ChinaUniversity | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [gpa, setGpa] = useState("");
  const [langTest, setLangTest] = useState<"IELTS" | "TOEFL">("IELTS");
  const [langScore, setLangScore] = useState("");
  const [currentCategoryId, setCurrentCategoryId] = useState("business");
  const [targetSubMajorId, setTargetSubMajorId] = useState("management");
  const [regions, setRegions] = useState<Set<Region>>(new Set(["UK", "AU", "HK", "SG", "CA", "US"]));
  const dropdownRef = useRef<HTMLDivElement>(null);

  const suggestions = findUniversity(schoolQuery);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const tier = selectedSchool?.tier;
  const rawLangScore = parseFloat(langScore) || 0;
  const rawGpa = parseFloat(gpa) || 0;

  const targetSubMajor = allSubMajors.find((s) => s.id === targetSubMajorId);
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
        const progs = matchPrograms(
          school.id, tier, rawGpa, rawLangScore, langTest, targetCategoryId, currentCategoryName, targetSubMajorId
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
  }, [tier, rawGpa, rawLangScore, langTest, targetCategoryId, currentCategoryName, targetSubMajorId, regions]);

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

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#0a0b0f]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#e8be64] font-bold text-lg" style={{ fontFamily: "serif" }}>
              英区大发明家
            </span>
            <span className="text-white/30 text-sm">· 选校器</span>
          </div>
          {step === "results" && (
            <button onClick={() => setStep("form")} className="text-sm text-white/50 hover:text-white transition-colors">
              ← 重新评估
            </button>
          )}
        </div>
      </nav>

      {/* ═══════════════ FORM ═══════════════ */}
      {step === "form" && (
        <main className="pt-24 pb-20 px-6 max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e8be64]/30 bg-[#e8be64]/10 text-[#e8be64] text-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8be64] animate-pulse" />
              覆盖 18 所学校 · 198 个具体项目
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
              你的成绩<br />
              <span className="bg-gradient-to-r from-[#e8be64] to-[#f0d78c] bg-clip-text text-transparent">
                能申哪些项目？
              </span>
            </h1>
            <p className="text-white/50 text-lg">
              精确到专业级别，每个项目独立匹配。
            </p>
          </div>

          <div className="bg-[#12131a] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-white/30 text-sm ml-2">填写你的背景信息</span>
            </div>
            <div className="p-6 space-y-5">
              {/* School Search */}
              <div ref={dropdownRef} className="relative">
                <label className="block text-sm text-white/50 mb-2">本科院校 <span className="text-[#e8be64] text-xs">●</span></label>
                <input
                  type="text" value={schoolQuery}
                  onChange={(e) => handleSchoolInput(e.target.value)}
                  onFocus={() => schoolQuery.length > 0 && setShowDropdown(true)}
                  placeholder="搜索你的学校，例：浙江工商大学"
                  className={`w-full bg-[#181920] border rounded-xl px-4 py-3.5 text-[#f0ede6] placeholder:text-white/20 outline-none transition-all ${
                    selectedSchool ? "border-[#e8be64]/40 bg-[#e8be64]/5" : "border-white/[0.06] focus:border-[#e8be64]"
                  }`}
                />
                {selectedSchool && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#e8be64]/15 text-[#e8be64] border border-[#e8be64]/20">
                      {getTierLabel(selectedSchool.tier)}
                    </span>
                    <span className="text-xs text-white/30">系统自动识别</span>
                  </div>
                )}
                {showDropdown && suggestions.length > 0 && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#1a1b24] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                    {suggestions.map((uni) => (
                      <button key={uni.name} onClick={() => handleSelectSchool(uni)}
                        className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center justify-between">
                        <span className="text-[#f0ede6]">{uni.name}</span>
                        <span className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded">{getTierLabel(uni.tier)}</span>
                      </button>
                    ))}
                  </div>
                )}
                {showDropdown && schoolQuery.length >= 2 && suggestions.length === 0 && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#1a1b24] border border-white/10 rounded-xl overflow-hidden shadow-2xl p-4 text-sm text-white/40">
                    未找到该院校，将按"双非"标准评估。
                    <button onClick={() => { setSelectedSchool({ name: schoolQuery, tier: "双非" }); setShowDropdown(false); }}
                      className="block mt-2 text-[#e8be64] hover:underline">以"双非"标准继续 →</button>
                  </div>
                )}
              </div>

              {/* GPA */}
              <div>
                <label className="block text-sm text-white/50 mb-2">GPA（百分制） <span className="text-[#e8be64] text-xs">●</span></label>
                <input type="number" value={gpa} onChange={(e) => setGpa(e.target.value)} placeholder="例：85"
                  className="w-full bg-[#181920] border border-white/[0.06] rounded-xl px-4 py-3.5 text-[#f0ede6] placeholder:text-white/20 focus:border-[#e8be64] outline-none transition-all" />
              </div>

              {/* Language Score */}
              <div>
                <label className="block text-sm text-white/50 mb-2">语言成绩 <span className="text-[#e8be64] text-xs">●</span></label>
                <div className="flex gap-3 items-start">
                  <div className="flex bg-[#181920] border border-white/[0.06] rounded-xl overflow-hidden shrink-0">
                    {(["IELTS", "TOEFL"] as const).map((t) => (
                      <button key={t} type="button" onClick={() => { setLangTest(t); setLangScore(""); }}
                        className={`px-4 py-3.5 text-sm font-medium transition-all ${
                          langTest === t ? "bg-[#e8be64] text-[#0a0b0f]" : "text-white/40 hover:text-white"
                        }`}>{t}</button>
                    ))}
                  </div>
                  <input type="number" step={langTest === "IELTS" ? "0.5" : "1"} value={langScore}
                    onChange={(e) => setLangScore(e.target.value)}
                    placeholder={langTest === "IELTS" ? "例：6.5" : "例：90"}
                    className="flex-1 bg-[#181920] border border-white/[0.06] rounded-xl px-4 py-3.5 text-[#f0ede6] placeholder:text-white/20 focus:border-[#e8be64] outline-none transition-all" />
                </div>
              </div>

              {/* Majors */}
              <div>
                <label className="block text-sm text-white/50 mb-2">本科专业方向 <span className="text-[#e8be64] text-xs">●</span></label>
                <select value={currentCategoryId} onChange={(e) => setCurrentCategoryId(e.target.value)}
                  className="w-full bg-[#181920] border border-white/[0.06] rounded-xl px-4 py-3.5 text-[#f0ede6] outline-none focus:border-[#e8be64] transition-all appearance-none cursor-pointer">
                  {majorCats.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">申请具体专业 <span className="text-[#e8be64] text-xs">●</span></label>
                <select value={targetSubMajorId} onChange={(e) => setTargetSubMajorId(e.target.value)}
                  className="w-full bg-[#181920] border border-white/[0.06] rounded-xl px-4 py-3.5 text-[#f0ede6] outline-none focus:border-[#e8be64] transition-all appearance-none cursor-pointer">
                  {majorCats.map((cat) => (
                    <optgroup key={cat.id} label={cat.name}>
                      {cat.subMajors.map((sub) => (
                        <option key={sub.id} value={sub.id}>{sub.name} ({sub.nameEn})</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {isCrossMajor && crossMajorCheck && (
                <div className={`px-4 py-3 rounded-xl text-sm leading-relaxed ${
                  crossMajorCheck.compatible
                    ? "bg-green-400/8 border border-green-400/15 text-green-400/80"
                    : "bg-red-400/8 border border-red-400/15 text-red-400/80"
                }`}>
                  {crossMajorCheck.compatible ? "✅" : "⚠️"} 跨专业（{currentCategoryName} → {targetSubMajor?.name}）：{crossMajorCheck.note || "建议查看具体项目要求"}
                </div>
              )}

              {/* Region */}
              <div>
                <label className="block text-sm text-white/50 mb-2">目标地区（可多选）</label>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(regionLabels) as [Region, string][]).map(([key, label]) => {
                    const selected = regions.has(key);
                    return (
                      <button key={key} type="button"
                        onClick={() => { const next = new Set(regions); if (selected) next.delete(key); else next.add(key); setRegions(next); }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selected ? "bg-[#e8be64] text-[#0a0b0f]" : "bg-[#181920] border border-white/[0.06] text-white/50 hover:text-white"
                        }`}>{label}</button>
                    );
                  })}
                </div>
              </div>

              <button onClick={() => canSubmit && setStep("results")} disabled={!canSubmit}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
                  canSubmit ? "bg-[#e8be64] text-[#0a0b0f] hover:shadow-[0_8px_30px_rgba(232,190,100,0.25)] cursor-pointer"
                    : "bg-[#e8be64]/20 text-[#e8be64]/40 cursor-not-allowed"
                }`}>开始匹配 →</button>
            </div>
          </div>
          <p className="text-center text-white/20 text-sm mt-8">数据来源：各校官网公开录取标准</p>
        </main>
      )}

      {/* ═══════════════ RESULTS ═══════════════ */}
      {step === "results" && selectedSchool && (
        <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
          {/* Profile */}
          <div className="bg-[#181920] border border-white/[0.06] rounded-2xl p-5 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#e8be64]/20 to-[#e8be64]/5 flex items-center justify-center text-xl">🎓</div>
              <div className="flex-1 min-w-[200px]">
                <h3 className="font-semibold">{selectedSchool.name}</h3>
                <p className="text-sm text-white/40">
                  {getTierLabel(selectedSchool.tier)} · GPA {gpa} · {langTest} {langScore} · {targetSubMajor?.name || targetCategoryName}
                </p>
              </div>
              <button onClick={() => setStep("form")} className="text-sm text-[#e8be64] hover:underline">修改条件</button>
            </div>
            <div className="flex gap-2 flex-wrap mt-4 pt-4 border-t border-white/[0.06]">
              <span className="px-3 py-1 rounded-md text-xs bg-white/5 text-white/50 border border-white/10">
                {schoolResults.length} 所学校 · {totalPrograms} 个项目
              </span>
              {counts.high > 0 && <span className="px-3 py-1 rounded-md text-xs bg-green-400/10 text-green-400 border border-green-400/15">🟢 很有可能 × {counts.high} 校</span>}
              {counts.medium > 0 && <span className="px-3 py-1 rounded-md text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/15">🟡 有机会 × {counts.medium} 校</span>}
              {counts.low > 0 && <span className="px-3 py-1 rounded-md text-xs bg-red-400/10 text-red-400 border border-red-400/15">🔴 较难 × {counts.low} 校</span>}
            </div>
          </div>

          {isCrossMajor && crossMajorCheck && (
            <div className={`mb-4 px-4 py-3 rounded-xl text-sm ${
              crossMajorCheck.compatible ? "bg-green-400/8 border border-green-400/15 text-green-400/80"
                : "bg-red-400/8 border border-red-400/15 text-red-400/80"
            }`}>
              {crossMajorCheck.compatible ? "✅" : "⚠️"} 跨专业（{currentCategoryName} → {targetSubMajor?.name}）：{crossMajorCheck.note}
            </div>
          )}

          {/* School Groups */}
          <div className="space-y-6">
            {schoolResults.filter(g => g.programs.length > 0).map(({ school, programs: progs, bestLevel }) => (
              <div key={school.id} className={`bg-[#12131a] border border-white/[0.06] rounded-2xl overflow-hidden border-l-[3px] ${levelConfig[bestLevel].border}`}>
                {/* School Header */}
                <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-base">{school.name}</div>
                    <div className="text-xs text-white/30 mt-0.5">{school.nameEn} · QS #{school.qsRank} · {regionLabels[school.country]}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${levelConfig[bestLevel].bg} ${levelConfig[bestLevel].color}`}>
                    {progs.length} 个项目
                  </span>
                </div>

                {/* Program Cards */}
                <div className="divide-y divide-white/[0.04]">
                  {progs.map((result) => {
                    const cfg = levelConfig[result.level];
                    return (
                      <div key={result.program.id} className="px-5 py-4 hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <div className="font-semibold text-[15px]">{result.program.name}</div>
                            <div className="text-xs text-white/25 mt-0.5">{result.program.nameEn} · {result.program.department}</div>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold shrink-0 ${cfg.bg} ${cfg.color}`}>
                            {cfg.label}
                          </span>
                        </div>

                        {/* Stats row */}
                        <div className="flex flex-wrap gap-4 text-sm mt-2">
                          <div>
                            <span className="text-[11px] text-white/20 uppercase tracking-wider block">GPA</span>
                            <span className={`font-semibold ${result.gpaStatus.passed ? "text-green-400" : result.gpaStatus.gap <= 5 ? "text-yellow-400" : "text-red-400"}`}>
                              {result.gpaStatus.required}%+ {result.gpaStatus.passed ? "✓" : `(差${result.gpaStatus.gap})`}
                            </span>
                          </div>
                          <div>
                            <span className="text-[11px] text-white/20 uppercase tracking-wider block">{langTest}</span>
                            <span className={`font-semibold ${result.langStatus.passed ? "text-green-400" : result.langStatus.gap <= (langTest === "TOEFL" ? 5 : 0.5) ? "text-yellow-400" : "text-red-400"}`}>
                              {result.langStatus.required}+ {result.langStatus.passed ? "✓" : `(差${result.langStatus.gap})`}
                            </span>
                          </div>
                          <div>
                            <span className="text-[11px] text-white/20 uppercase tracking-wider block">背景</span>
                            <span className={`font-semibold ${result.crossMajorOk ? "text-green-400" : "text-red-400"}`}>
                              {result.crossMajorOk ? (result.crossMajorNote || "✓") : result.crossMajorNote}
                            </span>
                          </div>
                          {result.program.tuitionFee && (
                            <div>
                              <span className="text-[11px] text-white/20 uppercase tracking-wider block">学费</span>
                              <span className="text-white/60">{result.program.tuitionFee}</span>
                            </div>
                          )}
                          {result.program.duration && (
                            <div>
                              <span className="text-[11px] text-white/20 uppercase tracking-wider block">时长</span>
                              <span className="text-white/60">{result.program.duration}</span>
                            </div>
                          )}
                        </div>

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
            ))}

            {/* Schools with no matching programs */}
            {schoolResults.filter(g => g.programs.length === 0).length > 0 && (
              <div className="bg-[#12131a] border border-white/[0.06] rounded-2xl p-5 opacity-50">
                <div className="text-sm text-white/40 mb-2">以下学校暂无 {targetCategoryName} 方向的项目数据：</div>
                <div className="flex flex-wrap gap-2">
                  {schoolResults.filter(g => g.programs.length === 0).map(({ school }) => (
                    <span key={school.id} className="text-xs text-white/30 bg-white/5 px-2 py-1 rounded">
                      {school.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="text-center text-white/15 text-xs mt-8 max-w-xl mx-auto leading-relaxed">
            数据基于各校官网公开录取标准，按专业级别匹配。同一专业在不同学校可能归属不同学院。具体要求以各校官网为准。
          </p>
        </main>
      )}
    </div>
  );
}
