"use client";

import { useState } from "react";

type Currency =
  | "GBP" | "AUD" | "HKD" | "SGD" | "USD" | "CAD" | "EUR" | "JPY"
  | "KRW" | "NZD" | "MYR" | "SEK" | "DKK" | "NOK" | "CHF";

const currencyInfo: Record<Currency, { symbol: string; label: string; rate: number }> = {
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

/**
 * 留学预算计算器 — 独立组件,内部持有 state。
 *
 * @param defaultCurrency 首次加载的默认币种。硕士 tab 常用 GBP,本科 tab 若希望默认 USD 等可传入。
 * @param defaultMonths   默认学制月数。硕士 1 年项目多 → "12";本科 3-4 年 → "36"。
 */
export function BudgetCalculator({
  defaultCurrency = "GBP",
  defaultMonths = "12",
}: {
  defaultCurrency?: Currency;
  defaultMonths?: string;
}) {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [tuition, setTuition] = useState("");
  const [rent, setRent] = useState("");
  const [living, setLiving] = useState("");
  const [months, setMonths] = useState(defaultMonths);

  const ci = currencyInfo[currency];
  const tuitionNum = parseFloat(tuition) || 0;
  const rentNum = parseFloat(rent) || 0;
  const livingNum = parseFloat(living) || 0;
  const monthsNum = parseInt(months) || 12;
  const totalLocal = tuitionNum + (rentNum + livingNum) * monthsNum;
  const totalRMB = Math.round(totalLocal * ci.rate);
  const hasInput = tuitionNum > 0 || rentNum > 0 || livingNum > 0;

  return (
    <div className="mt-8 sm:mt-10 bg-[#181920] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-[#f0ede6] mb-1">留学预算计算器</h3>
      <p className="text-xs text-white/30 mb-5">手动输入你的预期花销，快速估算留学总预算</p>

      {/* Currency selector */}
      <div className="mb-4">
        <label className="block text-sm text-white/50 mb-1.5">目的地货币</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
          className="w-full bg-[#12131a] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f0ede6] outline-none focus:border-[#e8be64] transition-all text-sm appearance-none"
        >
          {(Object.entries(currencyInfo) as [Currency, (typeof currencyInfo)[Currency]][]).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label} ({v.symbol})
            </option>
          ))}
        </select>
      </div>

      {/* Inputs grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm text-white/50 mb-1.5">学费总额 ({ci.symbol})</label>
          <input
            type="number"
            value={tuition}
            onChange={(e) => setTuition(e.target.value)}
            placeholder="如 35000"
            className="w-full bg-[#12131a] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f0ede6] placeholder:text-white/15 outline-none focus:border-[#e8be64] text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-white/50 mb-1.5">学制 (月)</label>
          <select
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="w-full bg-[#12131a] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f0ede6] outline-none focus:border-[#e8be64] text-sm appearance-none"
          >
            <option value="9">9 个月</option>
            <option value="10">10 个月</option>
            <option value="12">12 个月 (1年)</option>
            <option value="15">15 个月</option>
            <option value="18">18 个月 (1.5年)</option>
            <option value="24">24 个月 (2年)</option>
            <option value="30">30 个月 (2.5年)</option>
            <option value="36">36 个月 (3年)</option>
            <option value="48">48 个月 (4年)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-white/50 mb-1.5">月租 ({ci.symbol}/月)</label>
          <input
            type="number"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            placeholder="如 800"
            className="w-full bg-[#12131a] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f0ede6] placeholder:text-white/15 outline-none focus:border-[#e8be64] text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-white/50 mb-1.5">月生活费 ({ci.symbol}/月)</label>
          <input
            type="number"
            value={living}
            onChange={(e) => setLiving(e.target.value)}
            placeholder="如 500"
            className="w-full bg-[#12131a] border border-white/[0.06] rounded-xl px-4 py-3 text-[#f0ede6] placeholder:text-white/15 outline-none focus:border-[#e8be64] text-sm"
          />
        </div>
      </div>

      {/* Result */}
      {hasInput && (
        <div className="bg-[#e8be64]/5 border border-[#e8be64]/20 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/50">学费</span>
            <span className="text-[#f0ede6]">
              {ci.symbol}
              {tuitionNum.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">住房 ({monthsNum}个月)</span>
            <span className="text-[#f0ede6]">
              {ci.symbol}
              {(rentNum * monthsNum).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">生活费 ({monthsNum}个月)</span>
            <span className="text-[#f0ede6]">
              {ci.symbol}
              {(livingNum * monthsNum).toLocaleString()}
            </span>
          </div>
          <div className="border-t border-white/10 pt-2 mt-2">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-white/50">预计总预算</span>
              <div className="text-right">
                <span className="text-lg font-bold text-[#e8be64]">
                  {ci.symbol}
                  {totalLocal.toLocaleString()}
                </span>
                <span className="text-sm text-white/40 ml-2">≈ ¥{totalRMB.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-[11px] text-white/15 mt-3">
        汇率为估算值，实际以银行牌价为准。不含签证费、机票、保险等其他费用。
      </p>
    </div>
  );
}
