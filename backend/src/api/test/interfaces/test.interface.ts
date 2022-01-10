import {OwnerInterface} from "../../owner/interfaces/owner.interface";
import {SettingsInterface} from "../../settings/interfaces/settings.interface";
import {IIdHaver} from "../../../APIHelpers/IIdHaver";

export interface TestInterface extends IIdHaver{
    settings?: number;
    owner?: number;
    name?: string;
    owner_link?: string;
}

