import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { testEntity } from './test.entity';

export enum QuestionTypeEnum {
    OPEN = "OPEN",
    SINGLE_CHOICE = "SINGLE_CHOICE",
    MULTI_CHOICE = "MULTI_CHOICE"
}

@Entity("question")
export class questionEntity{

    @PrimaryGeneratedColumn('uuid')
    question_id: string;

    @ManyToOne(() => testEntity, test => test.test_id)
    @JoinColumn()
    test: testEntity

    @Column({
        type: "enum",
        enum: QuestionTypeEnum,
    })
    question_type: QuestionTypeEnum;


    @Column({length: 45})
    name: string;
}
