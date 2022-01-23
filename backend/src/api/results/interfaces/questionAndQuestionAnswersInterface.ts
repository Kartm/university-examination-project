import {QuestionAnswerInterface} from "../../questionAnswer/interfaces/questionAnswer.interface";
import {QuestionInterface} from "../../question/interfaces/question.interface";

export interface QuestionAndQuestionAnswersInterface
{
    question : QuestionInterface,
    questionAnswers : QuestionAnswerInterface[],
}