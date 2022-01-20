import {IIdHaver} from "../../../APIHelpers/IIdHaver";

export interface ParticipantInterface extends IIdHaver
{
    test_id ?: number,
    score ?: number,
    email ?: string,
    name ?: string,
}