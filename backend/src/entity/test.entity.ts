import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TestInterface } from '../api/test/interfaces/test.interface';
import { ownerEntity } from './owner.entity';
import { settingsEntity } from './settings.entity';

@Entity('test')
export class testEntity implements TestInterface {
  @PrimaryGeneratedColumn('uuid')
  test_id: string;

  @OneToOne(() => settingsEntity, { eager: true })
  @JoinColumn()
  setting: settingsEntity;

  @OneToOne(() => ownerEntity, { eager: true })
  @JoinColumn()
  owner: ownerEntity;

  @Column({ length: 45 })
  owner_link?: string;

  @Column({ length: 45 })
  name: string;

  @Column({default : '1970-01-01 00:00:00'})
  time_end: Date;

  @Column({default : '1970-01-01 00:00:00'})
  time_start: Date;
}
