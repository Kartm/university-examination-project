import {Injectable} from "@nestjs/common";
import {CommonApi} from "../../APIHelpers/CommonApi";
import {QuestionAnswerInterface} from "./interfaces/questionAnswer.interface";

@Injectable()
export class QuestionAnswerService
{
    static questionAnswers: QuestionAnswerInterface[] = [];

    static getAllQuestions() {
        return this.questionAnswers;
    }

    static getOneQuestionAnswer(id: string) {
        return CommonApi.findEntity(id, this.questionAnswers)[0];
    }

    static addQuestionAnswer(questionAnswer: QuestionAnswerInterface) {
        return CommonApi.addEntity(questionAnswer, this.questionAnswers);
    }

    static removeAllQuestionAnswer() {
        return CommonApi.removeAllEntities(this.questionAnswers);
    }

    static removeOneQuestionAnswer(id: string) {
        return CommonApi.removeEntity(id, this.questionAnswers)
    }

    static updateQuestionAnswer(id: string, newQuestionAnswer: QuestionAnswerInterface) {
        const [questionAnswer, index] = CommonApi.findEntity(id, this.questionAnswers);
        if(newQuestionAnswer.question_choice_id)
        {
            questionAnswer.question_choice_id = newQuestionAnswer.question_choice_id;
        }
        if(newQuestionAnswer.participant_id)
        {
            questionAnswer.participant_id = newQuestionAnswer.participant_id;
        }
        if(newQuestionAnswer.answer_text)
        {
            questionAnswer.answer_text = newQuestionAnswer.answer_text;
        }
        this.questionAnswers[index] = questionAnswer;
        return questionAnswer;
    }
}