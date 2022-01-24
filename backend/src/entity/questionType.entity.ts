import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("questionType")
export class questionTypeEntity{

    @PrimaryGeneratedColumn('uuid')
    question_type_id: string;

    @Column({length: 45})
    name: string;

    
}
