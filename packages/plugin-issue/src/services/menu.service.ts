import { Inject, Injectable } from '@nestjs/common';
import type {
  ID,
  ListQueryOptions,
  PaginatedList,
  Translated,
  TranslatedInput,
} from '@vendure/core';
import {
  ListQueryBuilder,
  RequestContext,
  TransactionalConnection,
  TranslatableSaver,
  TranslatorService,
  assertFound,
  LanguageCode,
} from '@vendure/core';
import { PLUGIN_INIT_OPTIONS } from '../constants.js';
import { MenuTranslation } from '../entities/menu-translation.entity.js';
import { Menu } from '../entities/menu.entity.js';
import { PluginInitOptions } from '../types.js';

@Injectable()
export class MenuService {
  constructor(
    private readonly connection: TransactionalConnection,
    private readonly listQueryBuilder: ListQueryBuilder,
    private readonly translator: TranslatorService,
    private readonly translatableSaver: TranslatableSaver,
    @Inject(PLUGIN_INIT_OPTIONS) private options: PluginInitOptions
  ) {}

  async init() {
    const ctx = RequestContext.empty();

    const item = await this.create(ctx, {
      code: 'main-menu-root',
      translations: [
        {
          languageCode: LanguageCode.en,
          name: 'main menu root',
        },
      ],
    });
    const item1 = await this.create(ctx, {
      code: 'main-menu-1',
      parentId: item.id,
      translations: [
        {
          languageCode: LanguageCode.en,
          name: 'main menu 1',
        },
      ],
    });

    await this.create(ctx, {
      code: 'main-menu-2',
      parentId: item1.id,
      translations: [
        {
          languageCode: LanguageCode.en,
          name: 'Main menu 2',
        },
      ],
    });
    const { items } = await this.findAll(RequestContext.empty());
    console.log(items);
  }

  findOne(
    ctx: RequestContext,
    id: ID
  ): Promise<Translated<Menu> | undefined | null> {
    return this.connection
      .getRepository(ctx, Menu)
      .findOne({ where: { id }, relations: ['parent'] })
      .then((menuItem) => {
        return menuItem && this.translator.translate(menuItem, ctx, ['parent']);
      });
  }

  async create(
    ctx: RequestContext,
    input: TranslatedInput<Menu> & { code: string; parentId?: ID }
  ): Promise<Translated<Menu>> {
    const menuItem = await this.translatableSaver.create({
      ctx,
      input,
      entityType: Menu,
      translationType: MenuTranslation,
    });
    return assertFound(this.findOne(ctx, menuItem.id));
  }

  findAll(
    ctx: RequestContext,
    options?: ListQueryOptions<Menu>
  ): Promise<PaginatedList<Menu>> {
    return this.listQueryBuilder
      .build(Menu, options, { relations: ['parent'], ctx })
      .getManyAndCount()
      .then(([menuItems, totalItems]) => {
        const items = menuItems.map((processOption) =>
          this.translator.translate(processOption, ctx, ['parent'])
        );
        return {
          items,
          totalItems,
        };
      });
  }
}
