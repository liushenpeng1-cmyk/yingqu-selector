/**
 * Build-time catalog generator.
 *
 * Generates 4 static JSON files under public/catalog:
 *   - programs.json     (all: pg + ug)
 *   - programs-pg.json  (pg only)
 *   - programs-ug.json  (ug only)
 *   - schools.json
 *
 * These replace the runtime /api/catalog/* route handlers. Responses
 * are served from Vercel CDN as static assets — zero runtime CPU.
 *
 * next.config.ts rewrites /api/catalog/* to /catalog/*.json so the
 * partner-facing URL contract stays identical.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { programs } from "../src/data/programs";
import {
  undergradPrograms,
  undergradOnlySchools,
} from "../src/data/undergrad-programs";
import { schools, type Region } from "../src/data/schools";

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

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "public", "catalog");

const generatedAt = new Date().toISOString();

const pgItems: PgOut[] = programs.map((p) => ({
  id: p.id,
  schoolId: p.schoolId,
  target: "pg",
  name: p.name,
  nameEn: p.nameEn,
  department: p.department,
  category: p.category,
  source: p.source,
}));

const ugItems: UgOut[] = undergradPrograms.map((p) => ({
  id: p.id,
  schoolId: p.schoolId,
  target: "ug",
  name: p.name,
  nameEn: p.nameEn,
  subjectArea: p.subjectArea,
  source: p.source,
}));

function programsPayload(target: "all" | "pg" | "ug", items: (PgOut | UgOut)[]) {
  return {
    version: 1,
    generatedAt,
    target,
    count: items.length,
    programs: items,
  };
}

const ugSchoolIds = new Set(undergradPrograms.map((p) => p.schoolId));
const merged: Record<string, SchoolOut> = {};

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

const schoolsPayload = {
  version: 1,
  generatedAt,
  count: Object.keys(merged).length,
  schools: Object.values(merged).sort(
    (a, b) =>
      (a.qsRank ?? 9999) - (b.qsRank ?? 9999) || a.id.localeCompare(b.id)
  ),
};

mkdirSync(OUT_DIR, { recursive: true });

function write(file: string, data: unknown) {
  const path = resolve(OUT_DIR, file);
  writeFileSync(path, JSON.stringify(data));
  return path;
}

const files = [
  { file: "programs.json", data: programsPayload("all", [...pgItems, ...ugItems]) },
  { file: "programs-pg.json", data: programsPayload("pg", pgItems) },
  { file: "programs-ug.json", data: programsPayload("ug", ugItems) },
  { file: "schools.json", data: schoolsPayload },
];

for (const { file, data } of files) {
  const path = write(file, data);
  const count =
    "programs" in data ? data.programs.length : data.schools.length;
  console.log(`[build-catalog] ${file}: ${count} items -> ${path}`);
}
