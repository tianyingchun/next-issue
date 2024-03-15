import { Inject, Injectable } from '@nestjs/common';
import type { ListQueryOptions, PaginatedList } from '@vendure/core';
import {
  ListQueryBuilder,
  RequestContext,
  TransactionalConnection,
  TranslatableSaver,
  CollectionService,
} from '@vendure/core';
import { PLUGIN_INIT_OPTIONS } from '../constants.js';
import { Menu } from '../entities/menu.entity.js';
import { PluginInitOptions } from '../types.js';

@Injectable()
export class MenuService {
  constructor(
    private readonly connection: TransactionalConnection,
    private readonly listQueryBuilder: ListQueryBuilder,
    private readonly collectionService: CollectionService,
    private readonly translatableSaver: TranslatableSaver,
    @Inject(PLUGIN_INIT_OPTIONS) private options: PluginInitOptions
  ) {}

  async init() {
    const ctx = RequestContext.empty();
    const item = await this.connection.getRepository(ctx, Menu).save({
      code: 'main-menu-root',
    });
    const item1 = await this.connection.getRepository(ctx, Menu).save({
      code: 'main-menu-1',
      parentId: item.id,
    });
    await this.connection.getRepository(ctx, Menu).save({
      code: 'main-menu-2',
      parentId: item1.id,
    });
    const { items } = await this.findAll(RequestContext.empty());
    console.log(items);
  }

  findAll(
    ctx: RequestContext,
    options?: ListQueryOptions<Menu>
  ): Promise<PaginatedList<Menu>> {
    return this.listQueryBuilder
      .build(Menu, options, { relations: ['parent'], ctx })
      .getManyAndCount()
      .then(([items, totalItems]) => {
        return {
          items,
          totalItems,
        };
      });
  }
}
