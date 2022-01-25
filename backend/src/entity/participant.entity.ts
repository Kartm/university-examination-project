import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { testEntity } from './test.entity';
import {settingsEntity} from "./settings.entity";

@Entity("participant")
export class participantEntity{

    @PrimaryGeneratedColumn('uuid')
    participant_id: string;

    @Column({ nullable: true })
    test_id: number;

    @OneToOne(() => testEntity, {eager: true})
    @JoinColumn({ name: "test_id" })
    test: testEntity;

    @Column({length: 45})
    email: string;

    @Column({length: 45})
    name: string;

}
