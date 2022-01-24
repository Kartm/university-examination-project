import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { questionEntity } from './question.entity';

@Entity("questionChoice")
export class questionChoiceEntity{

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
