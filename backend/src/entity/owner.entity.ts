import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OwnerInterface } from '../api/owner/interfaces/owner.interface';

@Entity("owner")
export class ownerEntity implements OwnerInterface {

    @PrimaryGeneratedColumn()
    owner_id: number;

    @Column({length: 45})
    name: string;

    
}
