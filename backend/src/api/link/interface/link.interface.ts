import {IIdHaver} from "../../../APIHelpers/IIdHaver";

export interface LinkInterface extends IIdHaver {
    participant_id?: string;
    used?: boolean;
    sent_at?: string;
    link?: string;
}