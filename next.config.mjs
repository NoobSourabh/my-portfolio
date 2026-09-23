/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // These are complete Framer exports. They must be served as documents (rather
    // than injected into a React page) so their head tags and runtime scripts can
    // initialise every section, animation, and breakpoint correctly.
    return {
      beforeFiles: [
        { source: '/', destination: '/index.html' },
        { source: '/work', destination: '/work.html' },
        { source: '/about', destination: '/about.html' },
        { source: '/contact', destination: '/contact.html' },
        { source: '/work/atlas-finance', destination: '/work--atlas-finance.html' },
        { source: '/work/brightly-studio', destination: '/work--brightly-studio.html' },
        { source: '/work/luma-workspace', destination: '/work--luma-workspace.html' },
        { source: '/work/nova-health', destination: '/work--nova-health.html' },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
}

export default nextConfig
