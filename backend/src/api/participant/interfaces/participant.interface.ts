import { testEntity } from 'src/entity/test.entity';
import { IIdHaver } from '../../../APIHelpers/IIdHaver';

export interface ParticipantInterface extends IIdHaver {
  test?: testEntity;
  score?: number;
  email?: string;
  name?: string;
}
