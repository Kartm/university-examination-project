import {IIdHaver} from "../../../APIHelpers/IIdHaver";

export interface TestInterface extends IIdHaver{
    settings_id?: string;
    owner_id?: string;
    name?: string;
    owner_link?: string;
}

