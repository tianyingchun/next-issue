import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { PLUGIN_INIT_OPTIONS } from './constants.js';
import { Menu } from './entities/menu.entity.js';
import { MenuService } from './services/menu.service.js';
import type { PluginInitOptions } from './types.js';

const services = [MenuService];

@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [Menu],
  compatibility: '>=2.0.0',
  providers: [
    ...services,

    // By definiting the `PLUGIN_INIT_OPTIONS` symbol as a provider, we can then inject the
    // user-defined options into other classes, such as the {@link ExampleService}.
    {
      provide: PLUGIN_INIT_OPTIONS,
      useFactory: () => PluginIssue.options,
    },
  ],
})
export class PluginIssue {
  static options: PluginInitOptions = {
    autoDataInit: false,
  };
  constructor(private menuService: MenuService) {}
  /**
   * The static `init()` method is a convention used by Vendure plugins which allows options
   * to be configured by the user.
   */
  static init(options: Partial<PluginInitOptions>) {
    this.options = { ...PluginIssue.options, ...options };
    return PluginIssue;
  }
  async onApplicationBootstrap() {
    await this.menuService.init();
  }
}
