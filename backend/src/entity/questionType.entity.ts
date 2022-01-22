import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionTypeInterface } from '../api/questionType/interfaces/questionType.interface';

@Entity("questionType")
export class questionTypeEntity implements QuestionTypeInterface {

    @PrimaryGeneratedColumn()
    question_type_id: number;

    @Column({length: 45})
    name: string;

    
}
