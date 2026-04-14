/**
 * GET /api/catalog/schools
 *
 * 返回 yingqu-selector 全量学校目录(只读),供合作方预导入做 ID 映射。
 * CORS 开放,任何 origin 都可直接 fetch。
 * 响应由 Vercel CDN 缓存,10 分钟窗口内重复请求命中 edge。
 */

import { schools, type Region } from "@/data/schools";
import { undergradOnlySchools, undergradPrograms } from "@/data/undergrad-programs";

type SchoolOut = {
  id: string;
  name: string;
  nameEn: string;
  country: Region;
  qsRank?: number;
  ieltsMin?: number;
  toeflMin?: number;
  supports: ("pg" | "ug")[];
};

export async function GET() {
  try {
    const merged: Record<string, SchoolOut> = {};

    // Derive which schools have undergrad programs in the data
    const ugSchoolIds = new Set(undergradPrograms.map((p) => p.schoolId));

    for (const s of schools) {
      const supports: ("pg" | "ug")[] = ["pg"];
      if (ugSchoolIds.has(s.id)) supports.push("ug");
      merged[s.id] = {
        id: s.id,
        name: s.name,
        nameEn: s.nameEn,
        country: s.country,
        qsRank: s.qsRank,
        ieltsMin: s.ieltsMin,
        toeflMin: s.toeflMin,
        supports,
      };
    }

    // Schools that only appear in undergrad data (not in main schools[])
    for (const [sid, meta] of Object.entries(undergradOnlySchools)) {
      const existing = merged[sid];
      if (existing) {
        if (!existing.supports.includes("ug")) existing.supports.push("ug");
      } else {
        merged[sid] = {
          id: sid,
          name: meta.name,
          nameEn: meta.nameEn,
          country: meta.country,
          supports: ["ug"],
        };
      }
    }

    const payload = {
      version: 1,
      generatedAt: new Date().toISOString(),
      count: Object.keys(merged).length,
      schools: Object.values(merged).sort(
        (a, b) =>
          (a.qsRank ?? 9999) - (b.qsRank ?? 9999) || a.id.localeCompare(b.id)
      ),
    };

    return new Response(JSON.stringify(payload), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("[api/catalog/schools] failed", err);
    return new Response(JSON.stringify({ error: "catalog_unavailable" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
