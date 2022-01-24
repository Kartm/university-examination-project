import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ownerEntity } from './owner.entity';
import { settingsEntity } from './settings.entity';

@Entity('test')
export class testEntity{
  @PrimaryGeneratedColumn('uuid')
  test_id: string;

  @Column({ type: "int", nullable: true })
  settings_id: number;

  @OneToOne(() => settingsEntity, { eager: true })
  @JoinColumn({ name: "settings_id" })
  setting: settingsEntity;

  @Column({ length: 45, default: '' })
  owner_email: string;

  @Column({ length: 45, default: '' })
  owner_name: string;

  @Column({ length: 45, default: '' })
  name: string;

  @Column({default : '1970-01-01 00:00:00'})
  time_end: Date;

  @Column({default : '1970-01-01 00:00:00'})
  time_start: Date;
}
