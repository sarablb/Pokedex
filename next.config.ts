import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    // Questo abilita il supporto a Styled Components in Next.js
    styledComponents: true,
  },
  // Altre opzioni se necessario...
};

export default nextConfig;