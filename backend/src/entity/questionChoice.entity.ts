import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne} from 'typeorm';
import { questionEntity } from './question.entity';

@Entity("questionChoice")
export class questionChoiceEntity{

    @PrimaryGeneratedColumn('uuid')
    questionChoice_id: string;

    @Column({ nullable: true })
    question_id: string;
    
    @ManyToOne(() => questionEntity, {eager: true})
    @JoinColumn({ name: "question_id" })
    question: questionEntity;

    @Column()
    text: string;

    @Column()
    is_correct: boolean;



    
}
