/**
 * GET /api/catalog/programs
 *
 * 返回 yingqu-selector 全量专业目录(只读),供合作方预导入做 ID 映射。
 *
 * Query:
 *   ?target=ug         — 仅本科
 *   ?target=pg         — 仅硕士
 *   (omit)             — 全部
 *
 * 响应由 Vercel CDN 缓存,10 分钟窗口内重复请求命中 edge。
 */

import { programs } from "@/data/programs";
import { undergradPrograms } from "@/data/undergrad-programs";

type PgOut = {
  id: string;
  schoolId: string;
  target: "pg";
  name: string;
  nameEn: string;
  department?: string;
  category?: string;
  source?: string;
};
type UgOut = {
  id: string;
  schoolId: string;
  target: "ug";
  name: string;
  nameEn: string;
  subjectArea?: string;
  source?: string;
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const target = url.searchParams.get("target");

    const items: (PgOut | UgOut)[] = [];

    if (target !== "ug") {
      for (const p of programs) {
        items.push({
          id: p.id,
          schoolId: p.schoolId,
          target: "pg",
          name: p.name,
          nameEn: p.nameEn,
          department: p.department,
          category: p.category,
          source: p.source,
        });
      }
    }

    if (target !== "pg") {
      for (const p of undergradPrograms) {
        items.push({
          id: p.id,
          schoolId: p.schoolId,
          target: "ug",
          name: p.name,
          nameEn: p.nameEn,
          subjectArea: p.subjectArea,
          source: p.source,
        });
      }
    }

    return Response.json(
      {
        version: 1,
        generatedAt: new Date().toISOString(),
        target: target ?? "all",
        count: items.length,
        programs: items,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err) {
    console.error("[api/catalog/programs] failed", err);
    return Response.json(
      { error: "catalog_unavailable" },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
