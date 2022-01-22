import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { LinkInterface } from '../api/link/interface/link.interface';

@Entity("link")
export class linkEntity implements LinkInterface {

    @PrimaryGeneratedColumn()
    link_id: number;

    @Column()
    participant_id: string;

    @Column()
    user: boolean;

    @Column()
    sent_at: string;

    @Column({length: 45})
    name: string;

    
}
