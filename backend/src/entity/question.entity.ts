import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionInterface } from '../api/question/interfaces/question.interface';

@Entity("question")
export class questionEntity implements QuestionInterface {

    @PrimaryGeneratedColumn()
    question_id: number;

    @Column()
    test_id: string;

    @Column()
    question_type_id: string;

    
}
