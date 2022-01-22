import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ParticipantInterface } from '../api/participant/interfaces/participant.interface';

@Entity("participant")
export class participantEntity implements ParticipantInterface {

    @PrimaryGeneratedColumn()
    participant_id: number;

    @Column()
    test_id: number;

    @Column()
    score: number;

    @Column({length: 45})
    email: string;

    @Column({length: 45})
    name: string;

    
}
