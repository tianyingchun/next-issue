import type { Translation } from '@vendure/core';
import { DeepPartial, VendureEntity, LanguageCode } from '@vendure/core';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { Menu } from './menu.entity.js';

@Entity('menu_translation')
export class MenuTranslation
  extends VendureEntity
  implements Translation<Menu>
{
  constructor(input?: DeepPartial<Translation<Menu>>) {
    super(input);
  }

  /**
   * 选项名
   */
  @Column('varchar')
  name: string;

  @Column('varchar')
  languageCode: LanguageCode;

  @ManyToOne(() => Menu, (base) => base.translations, {
    onDelete: 'CASCADE',
  })
  base: Relation<Menu>;
}
