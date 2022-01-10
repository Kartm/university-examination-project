import {IIdHaver} from "../../../APIHelpers/IIdHaver";

export interface QuestionChoiceInterface extends IIdHaver
{
    question_id : string,
    text : string,
    is_correct : boolean,
}