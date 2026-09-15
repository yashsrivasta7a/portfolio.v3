/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * `me.yashsrivasta7a.in` serves the /me page at its own root.
   *
   * A rewrite rather than a redirect, so the visitor keeps the clean subdomain
   * in the address bar instead of being bounced to a path. The apex still
   * serves the same page at yashsrivasta7a.in/me, which is why that page
   * carries a canonical tag — otherwise search engines see one page at two
   * addresses and split it between them.
   */
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/me",
        has: [{ type: "host", value: "me.yashsrivasta7a.in" }],
      },
    ];
  },
};

export default nextConfig;
