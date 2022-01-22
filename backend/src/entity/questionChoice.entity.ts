import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionChoiceInterface } from '../api/questionChoice/interfaces/questionChoice.interface';

@Entity("questionChoice")
export class questionChoiceEntity implements QuestionChoiceInterface {

    @PrimaryGeneratedColumn()
    questionChoice_id: number;

    @Column()
    question_id: string;

    @Column()
    text: string;

    @Column()
    is_correct: boolean;



    
}
