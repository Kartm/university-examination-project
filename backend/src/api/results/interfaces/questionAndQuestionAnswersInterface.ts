import {questionEntity} from "../../../entity/question.entity";
import {questionAnswerEntity} from "../../../entity/questionAnswer.entity";

export interface QuestionAndQuestionAnswersInterface
{
    question : questionEntity,
    questionAnswers : questionAnswerEntity[],
}