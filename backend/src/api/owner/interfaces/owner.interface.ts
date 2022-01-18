import {IIdHaver} from "../../../APIHelpers/IIdHaver";

export interface QuestionPresetInterface extends IIdHaver
{
    template_id : string,
    question_type_id : string,
    question_num : number
}