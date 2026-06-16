/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a fully static site (an `out/` folder of HTML/CSS/JS) so it can be
  // hosted on Cloudflare Pages (or any static host) with no Node server.
  output: "export",
  images: {
    // Static hosting has no server-side Image Optimization endpoint, so images
    // are served as-is. Remote images (Unsplash) still load fine.
    unoptimized: true,
  },
};

export default nextConfig;
