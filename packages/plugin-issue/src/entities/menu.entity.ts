import type {
  ID,
  LocaleString,
  Translatable,
  Translation,
} from '@vendure/core';
import { DeepPartial, VendureEntity } from '@vendure/core';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MenuTranslation } from './menu-translation.entity.js';

/**
 * @description This entity represents a front end campaign
 *
 * @docsCategory entities
 */
@Entity('menu')
export class Menu extends VendureEntity implements Translatable {
  constructor(input?: DeepPartial<Menu>) {
    super(input);
  }

  name: LocaleString;

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => Menu, (type) => type.parent)
  parent: Menu | null;

  @Column('int', { nullable: true })
  parentId: ID | null;

  @OneToMany(() => MenuTranslation, (translation) => translation.base, {
    eager: true,
  })
  translations: Array<Translation<Menu>>;
}
