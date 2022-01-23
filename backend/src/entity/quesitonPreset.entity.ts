import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { QuestionPresetInterface } from '../api/questionPreset/interfaces/questionPreset.interface';
import { questionTypeEntity } from './questionType.entity';
import { templateEntity } from './template.entity';

@Entity("questionPreset")
export class questionPresetEntity implements QuestionPresetInterface {

    @PrimaryGeneratedColumn('uuid')
    questionPreset_id: string;

    @OneToOne(() => templateEntity)
    @JoinColumn()
    template: templateEntity

    @OneToOne(() => questionTypeEntity)
    @JoinColumn()
    questionType: questionTypeEntity

    @Column()
    question_num: number;

    
}
