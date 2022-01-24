import { ownerEntity } from "src/entity/owner.entity";
import { settingsEntity } from "src/entity/settings.entity";
import {IIdHaver} from "../../../APIHelpers/IIdHaver";

export interface TestInterface extends IIdHaver{
    setting?: settingsEntity;
    owner: ownerEntity
    name?: string;
    owner_link?: string;
    time_start: Date;
    time_end: Date;
}

