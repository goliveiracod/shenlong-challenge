import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Galaxy } from '@modules/galaxy/infra/typeorm/entities/Galaxy';
import { Traveler } from '@modules/traveler/infra/typeorm/entities/Traveler';

@Entity('planet')
export class Planet {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  video_conferency_link: string;

  @Column()
  galaxy_id: string;

  @ManyToOne(() => Galaxy)
  @JoinColumn({ name: 'galaxy_id' })
  galaxy: Galaxy;

  @OneToMany(() => Traveler, traveler => traveler.planet)
  travelers: Traveler[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
