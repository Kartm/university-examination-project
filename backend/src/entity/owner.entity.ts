import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("owner")
export class ownerEntity{

    @PrimaryGeneratedColumn('uuid')
    owner_id: string;

    @Column({length: 45})
    name: string;

    @Column({length: 45})
    email: string;

}
