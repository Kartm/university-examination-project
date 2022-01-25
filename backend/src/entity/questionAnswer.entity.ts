import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { participantEntity } from './participant.entity';
import { questionChoiceEntity } from './questionChoice.entity';

@Entity("questionAnswer")
export class questionAnswerEntity{

    @PrimaryGeneratedColumn('uuid')
    questionAnswer_id: string;

    @Column({ nullable: true })
    questionChoiceId: string;

    @OneToOne(() => questionChoiceEntity, {eager: true})
    @JoinColumn({ name: "questionChoiceId"})
    questionChoice: questionChoiceEntity;

    @Column({ nullable: true })
    participant_id: string;

    @ManyToOne(() => participantEntity, participant => participant.participant_id )
    @JoinColumn({ name: "participant_id" })
    participant: participantEntity

    @Column()
    answer_text: string;
}
