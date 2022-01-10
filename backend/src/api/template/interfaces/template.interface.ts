import {IIdHaver} from "../../../APIHelpers/IIdHaver";

export interface TemplateInterface extends IIdHaver
{
    name : string,
    settings_id : string
}