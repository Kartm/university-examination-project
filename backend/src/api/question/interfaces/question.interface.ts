import { questionTypeEntity } from 'src/entity/questionType.entity';
import { testEntity } from 'src/entity/test.entity';
import { IIdHaver } from '../../../APIHelpers/IIdHaver';

export interface QuestionInterface extends IIdHaver {
  test: testEntity;
  questionType: questionTypeEntity;
}
