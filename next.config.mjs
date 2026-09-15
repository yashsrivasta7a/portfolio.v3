/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Subdomain routing lives in src/middleware.js — a `has: [{ type: 'host' }]`
     rewrite here did not fire behind Vercel's proxy. */
};

export default nextConfig;
