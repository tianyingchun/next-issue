import type { ID } from '@vendure/core';
import { DeepPartial, VendureEntity } from '@vendure/core';
import { Column, Entity, ManyToOne } from 'typeorm';

/**
 * @description This entity represents a front end campaign
 *
 * @docsCategory entities
 */
@Entity('menu')
export class Menu extends VendureEntity {
  constructor(input?: DeepPartial<Menu>) {
    super(input);
  }

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => Menu, (type) => type.parent)
  parent: Menu | null;

  @Column('int', { nullable: true })
  parentId: ID | null;
}
