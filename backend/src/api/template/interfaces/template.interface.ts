import { settingsEntity } from 'src/entity/settings.entity';
import { IIdHaver } from '../../../APIHelpers/IIdHaver';

export interface TemplateInterface extends IIdHaver {
  name: string;
  setting: settingsEntity;
}
