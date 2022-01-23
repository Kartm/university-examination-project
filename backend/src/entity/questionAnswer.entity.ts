import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { QuestionAnswerInterface } from '../api/questionAnswer/interfaces/questionAnswer.interface';
import { participantEntity } from './participant.entity';
import { questionChoiceEntity } from './questionChoice.entity';

@Entity("questionAnswer")
export class questionAnswerEntity implements QuestionAnswerInterface {

    @PrimaryGeneratedColumn('uuid')
    questionAnswer_id: string;

    @Column()
    name: string;

    @OneToOne(() => questionChoiceEntity)
    @JoinColumn()
    questionChoice: questionChoiceEntity;

    @ManyToOne(() => participantEntity, participant => participant.participant_id )
    @JoinColumn()
    participant: participantEntity

    @Column()
    answer_text: string;

    @Column()
    seconds_spent: number;

    @Column()
    tab_focus_lost_count: number;

    @Column()
    check_status: 'Non Displayed' | 'Displaying' | 'Skipped' | 'Done';

}
