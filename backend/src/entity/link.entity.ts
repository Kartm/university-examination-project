import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { participantEntity } from './participant.entity';

@Entity("link")
export class linkEntity{

    @PrimaryGeneratedColumn('uuid')
    link_id: string;

    @OneToOne(() => participantEntity, {eager: true})
    @JoinColumn()
    participant?: participantEntity;

    //TODO default to false
    @Column()
    used ?: boolean;

}
