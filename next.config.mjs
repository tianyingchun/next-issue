import { getNextConfig, getNextConfigEnv } from '@hyperse-io/next-env';
import bundleAnalyzer from '@next/bundle-analyzer';
import withNextIntl from 'next-intl/plugin';
import { z } from 'zod';

const plugins = [];

plugins.push(
  withNextIntl('./src/i18n.ts'),
  bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })
);

// We use a custom env to validate the build env
const buildEnv = getNextConfigEnv(
  z.object({
    NEXT_BUILD_ENV_OUTPUT: z
      .enum(['standalone', 'export'], {
        description:
          'For standalone mode: https://nextjs.org/docs/app/api-reference/next-config-js/output',
      })
      .optional(),
  }),
  {
    isProd: process.env.ANALYZE === 'production',
  }
);

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 * @type {import("next").NextConfig}
 */
const config = {
  reactStrictMode: true,
  output: buildEnv.NEXT_BUILD_ENV_OUTPUT,
  experimental: {
    // typedRoutes: true,
    // Turbo seemingly supports HMR for JSON files, quite handy to handle i18n messages.
  },
  /** We run eslint as a separate task in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  // transpilePackages: ['@acme/api', '@acme/db', '@trpc/next-layout'],
};

export default getNextConfig(
  plugins.reduce((config, plugin) => plugin(config), config)
);
