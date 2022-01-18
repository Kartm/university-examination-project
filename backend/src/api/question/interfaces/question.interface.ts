import {IIdHaver} from "../../../APIHelpers/IIdHaver";

export interface QuestionInterface extends IIdHaver
{
    test_id : string,
    question_type_id : string
}