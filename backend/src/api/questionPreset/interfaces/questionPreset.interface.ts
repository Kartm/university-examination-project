import { questionTypeEntity } from "src/entity/questionType.entity";
import { templateEntity } from "src/entity/template.entity";
import {IIdHaver} from "../../../APIHelpers/IIdHaver";

export interface QuestionPresetInterface extends IIdHaver
{
    template : templateEntity,
    questionType : questionTypeEntity,
    question_num : number
}