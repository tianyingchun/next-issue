import withNextIntl from 'next-intl/plugin';
import { getNextConfig } from '@hyperse/next-env';
import bundleAnalyzer from '@next/bundle-analyzer';

const plugins = [];

plugins.push(
  withNextIntl(),
  bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })
);

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 * @type {import("next").NextConfig}
 */
const config = {
  reactStrictMode: true,
  experimental: {
    // typedRoutes: true,
    // Turbo seemingly supports HMR for JSON files, quite handy to handle i18n messages.
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  /** We run eslint as a separate task in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  // transpilePackages: ['@acme/api', '@acme/db', '@trpc/next-layout'],
};

export default getNextConfig(
  plugins.reduce((config, plugin) => plugin(config), config)
);
