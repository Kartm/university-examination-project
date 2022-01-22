import {IIdHaver} from "../../../APIHelpers/IIdHaver";

export interface QuestionAnswerInterface extends IIdHaver
{
    question_choice_id : string,
    participant_id : string,
    answer_text : string,
    seconds_spent: number,
    tab_focus_lost_count: number,
    check_status: 'Non Displayed' | 'Displaying' | 'Skipped' | 'Done'
}