import type { NextConfig } from "next";

// 合作方(i offer 等)的目录接口改为构建期生成的静态 JSON,
// 通过 rewrite 保留 /api/catalog/* URL 契约;CORS 头仍然开放。
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/api/catalog/schools", destination: "/catalog/schools.json" },
      {
        source: "/api/catalog/programs",
        has: [{ type: "query", key: "target", value: "ug" }],
        destination: "/catalog/programs-ug.json",
      },
      {
        source: "/api/catalog/programs",
        has: [{ type: "query", key: "target", value: "pg" }],
        destination: "/catalog/programs-pg.json",
      },
      { source: "/api/catalog/programs", destination: "/catalog/programs.json" },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/catalog/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/catalog/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
