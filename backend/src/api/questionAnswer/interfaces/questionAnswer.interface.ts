import { participantEntity } from 'src/entity/participant.entity';
import { questionChoiceEntity } from 'src/entity/questionChoice.entity';
import { IIdHaver } from '../../../APIHelpers/IIdHaver';

export interface QuestionAnswerInterface extends IIdHaver {
  questionChoice: questionChoiceEntity;
  participant: participantEntity;
  answer_text: string;
  seconds_spent: number;
  tab_focus_lost_count: number;
  check_status: 'Non Displayed' | 'Displaying' | 'Skipped' | 'Done';
}
