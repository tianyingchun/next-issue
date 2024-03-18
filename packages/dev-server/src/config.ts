/* eslint-disable @typescript-eslint/naming-convention */
// import { PluginIssue } from '@issue/plugin-issue';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import type { VendureConfig } from '@vendure/core';
import { DefaultLogger, LogLevel } from '@vendure/core';
import { getDirname } from './get-dir-name.js';

export const config: VendureConfig = {
  apiOptions: {
    port: 3001,
    shopListQueryLimit: 100000,
    adminListQueryLimit: 100000,
    adminApiPlayground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    adminApiDebug: true,
    shopApiPlayground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    shopApiDebug: true,
  },
  paymentOptions: {
    paymentMethodHandlers: [],
  },
  authOptions: {
    disableAuth: false,
    tokenMethod: ['cookie', 'bearer'],
    authTokenHeaderKey: 'auth-token',
    // keep 1 month
    sessionCacheTTL: 60 * 60 * 24 * 30,
    superadminCredentials: {
      identifier: 'superadmin',
      password: 'superadmin',
    },
  },
  dbConnectionOptions: {
    type: 'mysql',
    port: 3306,
    timezone: 'Z',
    database: 'vendure-issue',
    host: '127.0.0.1',
    username: 'root',
    password: 'root',
    synchronize: true,
    charset: 'utf8mb4',
  },
  logger: new DefaultLogger({
    level: LogLevel.Debug,
  }),
  plugins: [
    AssetServerPlugin.init({
      assetUploadDir: getDirname(import.meta.url, './static/assets'),
      route: 'assets',
    }),
    AdminUiPlugin.init({
      port: 3002,
      route: 'admin',
      adminUiConfig: {
        hideVendureBranding: true,
        brand: 'Vendure',
      },
    }),
    // PluginIssue.init({ autoDataInit: true }),
  ],
};
