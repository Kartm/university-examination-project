import {IIdHaver} from "../../../APIHelpers/IIdHaver";

export interface LinkInterface extends IIdHaver {
    link_id?: number;
    participant_id?: number;
    used?: boolean;
    sent_at?: string;
    link?: string;
}