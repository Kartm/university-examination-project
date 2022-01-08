import {OwnerInterface} from "../../owner/interfaces/owner.interface";
import {SettingsInterface} from "../../settings/interfaces/settings.interface";

export interface TestInterface {
    id?: number;
    settings?: number;
    owner?: number;
    name?: string;
    owner_link?: string;
}

