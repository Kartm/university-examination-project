import {IIdHaver} from "../../../APIHelpers/IIdHaver";

export interface QuestionAnswerInterface extends IIdHaver
{
    question_choice_id : string,
    participant_id : string,
    answer_text : string
}