import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { ParticipantInterface } from '../api/participant/interfaces/participant.interface';
import { testEntity } from './test.entity';

@Entity("participant")
export class participantEntity implements ParticipantInterface {

    @PrimaryGeneratedColumn('uuid')
    participant_id: string;

    @OneToOne(() => testEntity)
    @JoinColumn()
    test: testEntity;

    @Column()
    score: number;

    @Column({length: 45})
    email: string;

    @Column({length: 45})
    name: string;

    
}
