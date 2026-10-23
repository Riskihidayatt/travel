import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Semua foto demo diambil dari Unsplash (placeholder).
    // URL `unsplash.com/photos/<id>/download` akan redirect ke `images.unsplash.com`,
    // jadi kedua host diizinkan.
    remotePatterns: [
      { protocol: "https", hostname: "unsplash.com", pathname: "/photos/**" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
