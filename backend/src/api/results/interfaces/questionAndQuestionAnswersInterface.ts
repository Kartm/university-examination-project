import {QuestionAnswerInterface} from "../../questionAnswer/interfaces/questionAnswer.interface";
import {QuestionInterface} from "../../question/interfaces/question.interface";
import {questionEntity} from "../../../entity/question.entity";

export interface QuestionAndQuestionAnswersInterface
{
    question : questionEntity,
    questionAnswers : QuestionAnswerInterface[],
}