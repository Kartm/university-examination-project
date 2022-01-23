import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { QuestionChoiceInterface } from '../api/questionChoice/interfaces/questionChoice.interface';
import { questionEntity } from './question.entity';

@Entity("questionChoice")
export class questionChoiceEntity implements QuestionChoiceInterface {

    @PrimaryGeneratedColumn('uuid')
    questionChoice_id: string;
    
    @OneToOne(() => questionEntity)
    @JoinColumn()
    question: questionEntity;

    @Column()
    text: string;

    @Column()
    is_correct: boolean;



    
}
