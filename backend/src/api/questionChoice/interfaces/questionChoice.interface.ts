import { questionEntity } from 'src/entity/question.entity';
import { IIdHaver } from '../../../APIHelpers/IIdHaver';

export interface QuestionChoiceInterface extends IIdHaver {
  question?: questionEntity;
  text?: string;
  is_correct?: boolean;
}
