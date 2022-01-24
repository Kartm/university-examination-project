import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { questionTypeEntity } from './questionType.entity';
import { testEntity } from './test.entity';

@Entity("question")
export class questionEntity{

    @PrimaryGeneratedColumn('uuid')
    question_id: string;

    @ManyToOne(() => testEntity, test => test.test_id)
    @JoinColumn()
    test: testEntity

    @OneToOne(() => questionTypeEntity)
    @JoinColumn()
    questionType: questionTypeEntity

    
}
