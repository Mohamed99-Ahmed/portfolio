import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '/portfolio',  // لتحديد المسار الفرعي
  assetPrefix: '/portfolio/', // لتحديد المسار للصور والمحتويات
  trailingSlash: true, // يضمن أن الروابط تنتهي بـ /
  
};

export default nextConfig;
