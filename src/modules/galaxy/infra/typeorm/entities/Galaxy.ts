import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Planet } from '@modules/planet/infra/typeorm/entities/Planet';

@Entity('galaxy')
export class Galaxy {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('smallint')
  order: number;

  @OneToMany(() => Planet, planet => planet.galaxy)
  planets: Planet[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
