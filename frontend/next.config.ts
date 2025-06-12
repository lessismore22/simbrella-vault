// next.config.ts
import path from 'path';
import type { Configuration } from 'webpack';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config: Configuration) {
    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve?.alias || {}),
        '@': path.resolve(__dirname),
      },
    };
    return config;
  },
};

export default nextConfig;
