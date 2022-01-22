import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionPresetInterface } from '../api/questionPreset/interfaces/questionPreset.interface';

@Entity("questionPreset")
export class questionPresetEntity implements QuestionPresetInterface {

    @PrimaryGeneratedColumn()
    questionPreset_id: number;

    @Column()
    template_id: string;

    @Column()
    question_type_id: string;

    @Column()
    question_num: number;

    
}
