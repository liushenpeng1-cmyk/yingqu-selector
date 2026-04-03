"use client";

import { useState, useRef, useEffect } from "react";
import { schools, matchSchool, getLanguageCourseSuggestion, regionLabels, type MatchLevel, type Region } from "@/data/schools";
import { findUniversity, getTierLabel, type ChinaUniversity } from "@/data/china-universities";
import { majorCategories as majorCats, allSubMajors, getCategoryIdFromSubMajor, categoryIdToName, checkCrossMajor } from "@/data/majors";

const levelConfig: Record<MatchLevel, { label: string; color: string; bg: string; border: string }> = {
  high: { label: "很有可能", color: "text-green-400", bg: "bg-green-400/10", border: "border-l-green-400" },
  medium: { label: "有机会", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-l-yellow-400" },
  low: { label: "较难", color: "text-red-400", bg: "bg-red-400/10", border: "border-l-red-400" },
  excluded: { label: "不在 List", color: "text-white/25", bg: "bg-white/5", border: "border-l-white/20" },
};

export default function Home() {
  const [step, setStep] = useState<"form" | "results">("form");

  // Form state
  const [schoolQuery, setSchoolQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<ChinaUniversity | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [gpa, setGpa] = useState("");
  const [ielts, setIelts] = useState("");
  const [currentCategoryId, setCurrentCategoryId] = useState("business");
  const [targetSubMajorId, setTargetSubMajorId] = useState("management");
  const [regions, setRegions] = useState<Set<Region>>(new Set(["UK", "AU", "HK", "SG", "CA", "US"]));
  const dropdownRef = useRef<HTMLDivElement>(null);

  const suggestions = findUniversity(schoolQuery);

  // Close dropdown on outside click
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

  const targetSubMajor = allSubMajors.find((s) => s.id === targetSubMajorId);
  const targetCategoryId = targetSubMajor?.categoryId || "business";
  const targetCategoryName = categoryIdToName[targetCategoryId] || "商科";
  const currentCategoryName = categoryIdToName[currentCategoryId] || "商科";
  const isCrossMajor = currentCategoryId !== targetCategoryId;
  const crossMajorCheck = targetSubMajor ? checkCrossMajor(currentCategoryId, targetSubMajor) : null;

  const results = tier
    ? schools
        .filter((s) => regions.size === 0 || regions.has(s.country))
        .map((school) => ({
          school,
          ...matchSchool(school, tier, parseFloat(gpa) || 0, parseFloat(ielts) || 0, targetCategoryName),
        }))
        .sort((a, b) => {
          const order: Record<MatchLevel, number> = { high: 0, medium: 1, low: 2, excluded: 3 };
          return order[a.level] - order[b.level] || a.school.qsRank - b.school.qsRank;
        })
    : [];

  const counts = {
    high: results.filter((r) => r.level === "high").length,
    medium: results.filter((r) => r.level === "medium").length,
    low: results.filter((r) => r.level === "low").length,
    excluded: results.filter((r) => r.level === "excluded").length,
  };

  const canSubmit = selectedSchool && gpa && ielts && parseFloat(gpa) > 0 && parseFloat(ielts) > 0;

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
            <button
              onClick={() => setStep("form")}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              ← 重新评估
            </button>
          )}
        </div>
      </nav>

      {/* Form */}
      {step === "form" && (
        <main className="pt-24 pb-20 px-6 max-w-2xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e8be64]/30 bg-[#e8be64]/10 text-[#e8be64] text-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8be64] animate-pulse" />
              2026 秋季申请季已开放
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
              你的成绩<br />
              <span className="bg-gradient-to-r from-[#e8be64] to-[#f0d78c] bg-clip-text text-transparent">
                能申哪些学校？
              </span>
            </h1>
            <p className="text-white/50 text-lg">
              输入成绩，30 秒智能匹配全球院校。
            </p>
          </div>

          {/* Form Card */}
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
                <label className="block text-sm text-white/50 mb-2">
                  本科院校 <span className="text-[#e8be64] text-xs">●</span>
                </label>
                <input
                  type="text"
                  value={schoolQuery}
                  onChange={(e) => handleSchoolInput(e.target.value)}
                  onFocus={() => schoolQuery.length > 0 && setShowDropdown(true)}
                  placeholder="搜索你的学校，例：浙江工商大学"
                  className={`w-full bg-[#181920] border rounded-xl px-4 py-3.5 text-[#f0ede6] placeholder:text-white/20 outline-none transition-all ${
                    selectedSchool
                      ? "border-[#e8be64]/40 bg-[#e8be64]/5"
                      : "border-white/[0.06] focus:border-[#e8be64] focus:ring-1 focus:ring-[#e8be64]/20"
                  }`}
                />
                {/* Selected school tier badge */}
                {selectedSchool && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#e8be64]/15 text-[#e8be64] border border-[#e8be64]/20">
                      {getTierLabel(selectedSchool.tier)}
                    </span>
                    <span className="text-xs text-white/30">系统自动识别</span>
                  </div>
                )}
                {/* Dropdown */}
                {showDropdown && suggestions.length > 0 && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#1a1b24] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                    {suggestions.map((uni) => (
                      <button
                        key={uni.name}
                        onClick={() => handleSelectSchool(uni)}
                        className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center justify-between"
                      >
                        <span className="text-[#f0ede6]">{uni.name}</span>
                        <span className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded">
                          {getTierLabel(uni.tier)}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                {/* Not found hint */}
                {showDropdown && schoolQuery.length >= 2 && suggestions.length === 0 && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#1a1b24] border border-white/10 rounded-xl overflow-hidden shadow-2xl p-4 text-sm text-white/40">
                    未找到该院校。如果你的学校不在列表中，将默认按"双非"标准评估。
                    <button
                      onClick={() => {
                        setSelectedSchool({ name: schoolQuery, tier: "双非" });
                        setShowDropdown(false);
                      }}
                      className="block mt-2 text-[#e8be64] hover:underline"
                    >
                      以"双非"标准继续 →
                    </button>
                  </div>
                )}
              </div>

              {/* GPA + IELTS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/50 mb-2">
                    GPA（百分制） <span className="text-[#e8be64] text-xs">●</span>
                  </label>
                  <input
                    type="number"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    placeholder="例：85"
                    className="w-full bg-[#181920] border border-white/[0.06] rounded-xl px-4 py-3.5 text-[#f0ede6] placeholder:text-white/20 focus:border-[#e8be64] focus:ring-1 focus:ring-[#e8be64]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2">
                    IELTS 总分 <span className="text-[#e8be64] text-xs">●</span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={ielts}
                    onChange={(e) => setIelts(e.target.value)}
                    placeholder="例：6.5"
                    className="w-full bg-[#181920] border border-white/[0.06] rounded-xl px-4 py-3.5 text-[#f0ede6] placeholder:text-white/20 focus:border-[#e8be64] focus:ring-1 focus:ring-[#e8be64]/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Current major (broad category) */}
              <div>
                <label className="block text-sm text-white/50 mb-2">
                  本科专业方向 <span className="text-[#e8be64] text-xs">●</span>
                </label>
                <select
                  value={currentCategoryId}
                  onChange={(e) => setCurrentCategoryId(e.target.value)}
                  className="w-full bg-[#181920] border border-white/[0.06] rounded-xl px-4 py-3.5 text-[#f0ede6] outline-none focus:border-[#e8be64] transition-all appearance-none cursor-pointer"
                >
                  {majorCats.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Target major (specific sub-major) */}
              <div>
                <label className="block text-sm text-white/50 mb-2">
                  申请具体专业 <span className="text-[#e8be64] text-xs">●</span>
                </label>
                <select
                  value={targetSubMajorId}
                  onChange={(e) => setTargetSubMajorId(e.target.value)}
                  className="w-full bg-[#181920] border border-white/[0.06] rounded-xl px-4 py-3.5 text-[#f0ede6] outline-none focus:border-[#e8be64] transition-all appearance-none cursor-pointer"
                >
                  {majorCats.map((cat) => (
                    <optgroup key={cat.id} label={cat.name}>
                      {cat.subMajors.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name} ({sub.nameEn})
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Cross-major / compatibility info */}
              {crossMajorCheck && isCrossMajor && (
                <div className={`px-4 py-3 rounded-xl text-sm leading-relaxed ${
                  crossMajorCheck.compatible
                    ? "bg-green-400/8 border border-green-400/15 text-green-400/80"
                    : "bg-red-400/8 border border-red-400/15 text-red-400/80"
                }`}>
                  {crossMajorCheck.compatible ? "✅" : "⚠️"} 跨专业（{currentCategoryName} → {targetSubMajor?.name}）：{crossMajorCheck.note || "建议查看具体项目要求"}
                </div>
              )}
              {/* Region */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/50 mb-2">目标地区（可多选）</label>
                  <div className="flex flex-wrap gap-2">
                    {(Object.entries(regionLabels) as [Region, string][]).map(([key, label]) => {
                      const selected = regions.has(key);
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            const next = new Set(regions);
                            if (selected) next.delete(key); else next.add(key);
                            setRegions(next);
                          }}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            selected
                              ? "bg-[#e8be64] text-[#0a0b0f]"
                              : "bg-[#181920] border border-white/[0.06] text-white/50 hover:text-white"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={() => canSubmit && setStep("results")}
                disabled={!canSubmit}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
                  canSubmit
                    ? "bg-[#e8be64] text-[#0a0b0f] hover:shadow-[0_8px_30px_rgba(232,190,100,0.25)] cursor-pointer"
                    : "bg-[#e8be64]/20 text-[#e8be64]/40 cursor-not-allowed"
                }`}
              >
                开始匹配 →
              </button>
            </div>
          </div>

          <p className="text-center text-white/20 text-sm mt-8">
            数据基于各校官网公开录取标准，仅供参考
          </p>
        </main>
      )}

      {/* Results */}
      {step === "results" && selectedSchool && (
        <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
          {/* Profile Summary */}
          <div className="bg-[#181920] border border-white/[0.06] rounded-2xl p-5 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#e8be64]/20 to-[#e8be64]/5 flex items-center justify-center text-xl">
                🎓
              </div>
              <div className="flex-1 min-w-[200px]">
                <h3 className="font-semibold">{selectedSchool.name}</h3>
                <p className="text-sm text-white/40">
                  {getTierLabel(selectedSchool.tier)} · GPA {gpa} · IELTS {ielts} · {targetSubMajor?.name || targetCategoryName}{isCrossMajor ? ` (本科: ${currentCategoryName})` : ""}
                </p>
              </div>
              <button
                onClick={() => setStep("form")}
                className="text-sm text-[#e8be64] hover:underline"
              >
                修改条件
              </button>
            </div>
            {/* Result summary tags */}
            <div className="flex gap-2 flex-wrap mt-4 pt-4 border-t border-white/[0.06]">
              {counts.high > 0 && (
                <span className="px-3 py-1 rounded-md text-xs bg-green-400/10 text-green-400 border border-green-400/15">
                  🟢 很有可能 × {counts.high}
                </span>
              )}
              {counts.medium > 0 && (
                <span className="px-3 py-1 rounded-md text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/15">
                  🟡 有机会 × {counts.medium}
                </span>
              )}
              {counts.low > 0 && (
                <span className="px-3 py-1 rounded-md text-xs bg-red-400/10 text-red-400 border border-red-400/15">
                  🔴 较难 × {counts.low}
                </span>
              )}
              {counts.excluded > 0 && (
                <span className="px-3 py-1 rounded-md text-xs bg-white/5 text-white/25 border border-white/10">
                  ⬚ 不在 List × {counts.excluded}
                </span>
              )}
            </div>
          </div>

          {/* Cross-major banner */}
          {isCrossMajor && crossMajorCheck && (
            <div className={`mb-4 px-4 py-3 rounded-xl text-sm ${
              crossMajorCheck.compatible
                ? "bg-green-400/8 border border-green-400/15 text-green-400/80"
                : "bg-red-400/8 border border-red-400/15 text-red-400/80"
            }`}>
              {crossMajorCheck.compatible ? "✅" : "⚠️"} 跨专业申请（{currentCategoryName} → {targetSubMajor?.name}）：{crossMajorCheck.note}。具体要求请查看各校官网。
            </div>
          )}

          {/* School Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map(({ school, level, reasons }) => {
              const config = levelConfig[level];
              return (
                <div
                  key={school.id}
                  className={`bg-[#181920] border border-white/[0.06] rounded-2xl p-5 border-l-[3px] transition-all ${config.border} ${
                    level === "excluded" ? "opacity-40" : "hover:-translate-y-1 hover:border-[#e8be64]/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-bold text-[17px]">{school.name}</div>
                      <div className="text-xs text-white/20 mt-0.5">{school.nameEn}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${config.bg} ${config.color}`}>
                      {config.label}
                    </span>
                  </div>

                  {level !== "excluded" ? (
                    <div className="flex gap-5 flex-wrap text-sm">
                      {reasons.map((r, i) => {
                        const isPass = r.includes("✓");
                        const isFail = r.includes("差");
                        return (
                          <div key={i} className="flex flex-col gap-0.5">
                            <span className="text-[11px] text-white/20 uppercase tracking-wider">
                              {i === 0 ? "GPA" : i === 1 ? "IELTS" : "List"}
                            </span>
                            <span className={`font-semibold ${isPass ? "text-green-400" : isFail ? "text-yellow-400" : "text-red-400"}`}>
                              {r}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-white/25">{reasons[0]}</p>
                  )}

                  {/* Language course suggestion */}
                  {level !== "excluded" && (() => {
                    const ieltsGap = school.ieltsMin - (parseFloat(ielts) || 0);
                    const suggestion = getLanguageCourseSuggestion(school, ieltsGap);
                    if (!suggestion || ieltsGap <= 0) return null;
                    return (
                      <div className="mt-3 px-3 py-2.5 rounded-lg bg-purple-400/8 border border-purple-400/15 text-xs leading-relaxed">
                        <div className="text-purple-300 font-medium mb-1">🎓 语言班选项</div>
                        {suggestion.weeks > 0 ? (
                          <div className="text-purple-300/70">
                            {suggestion.note}
                            {suggestion.estimatedFee && <span className="text-purple-300"> · 约 {suggestion.estimatedFee}</span>}
                          </div>
                        ) : (
                          <div className="text-purple-300/70">{suggestion.note}</div>
                        )}
                        {school.languageCourseUrl && (
                          <a href={school.languageCourseUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline mt-1 inline-block">
                            查看语言班详情 →
                          </a>
                        )}
                      </div>
                    );
                  })()}

                  {/* Extra requirements (GRE, GMAT etc.) */}
                  {school.extraRequirements && level !== "excluded" && (
                    <div className="mt-3 px-2.5 py-1.5 rounded-lg bg-blue-400/8 border border-blue-400/15 text-xs text-blue-300">
                      📋 {school.extraRequirements}
                    </div>
                  )}

                  {/* Notes */}
                  {school.notes && level !== "excluded" && (
                    <div className="mt-2 text-xs text-white/30 leading-relaxed">{school.notes}</div>
                  )}

                  {/* Footer */}
                  <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs text-white/20">
                      QS #{school.qsRank} · {regionLabels[school.country]}
                      {school.applicationFee && ` · 申请费 ${school.applicationFee}`}
                    </span>
                    {school.source && (
                      <a
                        href={school.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#e8be64]/60 hover:text-[#e8be64] transition-colors"
                      >
                        查看官网要求 →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-white/15 text-xs mt-8 max-w-xl mx-auto leading-relaxed">
            本评估基于各校官网公开录取标准，按专业大类粗筛，仅供参考。同一专业在不同学校可能归属不同学院、有不同录取标准（如经济学在部分学校属社科学院而非商学院）。具体要求以各校官网为准。
          </p>
        </main>
      )}
    </div>
  );
}
