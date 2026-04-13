import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 从静态 export 切到默认 Vercel serverless 模式,以支持 /api/catalog/* route handlers。
  // 页面本身仍是 "use client",用户侧体验无变化;Vercel CDN 照常缓存页面。
};

export default nextConfig;
