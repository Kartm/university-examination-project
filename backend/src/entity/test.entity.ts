import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TestInterface } from '../api/test/interfaces/test.interface';

@Entity("test")
export class testEntity implements TestInterface {

    @PrimaryGeneratedColumn()
    test_id: number;

    @Column()
    settings_id?: string;
    
    @Column()
    owner_id?: string;

    @Column({length: 45})
    owner_link?: string;

    @Column({length: 45})
    name: string;

    
}
