import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionAnswerInterface } from '../api/questionAnswer/interfaces/questionAnswer.interface';

@Entity("questionAnswer")
export class questionAnswerEntity implements QuestionAnswerInterface {

    @PrimaryGeneratedColumn()
    questionAnswer_id: number;

    @Column()
    name: string;

    @Column()
    question_choice_id: string;

    @Column()
    participant_id: string;

    @Column()
    answer_text: string;

    @Column()
    seconds_spent: number;

    @Column()
    tab_focus_lost_count: number;

    @Column()
    check_status: 'Non Displayed' | 'Displaying' | 'Skipped' | 'Done';

}
