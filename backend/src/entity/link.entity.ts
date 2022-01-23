import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { LinkInterface } from '../api/link/interface/link.interface';
import { participantEntity } from './participant.entity';

@Entity("link")
export class linkEntity implements LinkInterface {

    @PrimaryGeneratedColumn('uuid')
    link_id: string;

    @OneToOne(() => participantEntity)
    @JoinColumn()
    participant?: participantEntity;

    @Column()
    user: boolean;

    @Column()
    sent_at: string;

    @Column({length: 45})
    name: string;

    
}
