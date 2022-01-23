import { ParticipantInterface } from 'src/api/participant/interfaces/participant.interface';
import { participantEntity } from 'src/entity/participant.entity';
import { IIdHaver } from '../../../APIHelpers/IIdHaver';

export interface LinkInterface extends IIdHaver {
  participant?: ParticipantInterface;
  used?: boolean;
  sent_at?: string;
  link?: string;
}
