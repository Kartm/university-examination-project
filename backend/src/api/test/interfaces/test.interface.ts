import {OwnerInterface} from "../../owner/interfaces/owner.interface";
import {SettingsInterface} from "../../settings/interfaces/settings.interface";

export interface TestInterface {
    id?: number;
    settings?: SettingsInterface;
    owner?: OwnerInterface;
    name?: string;
    owner_link?: string;
}