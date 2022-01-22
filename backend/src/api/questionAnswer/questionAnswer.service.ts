import {Injectable} from "@nestjs/common";
import {CommonApi} from "../../APIHelpers/CommonApi";
import {QuestionAnswerInterface} from "./interfaces/questionAnswer.interface";

@Injectable()
export class QuestionAnswerService
{
    questionAnswers: QuestionAnswerInterface[] = [];

    getAllQuestions() {
        return this.questionAnswers;
    }

    getOneQuestionAnswer(id: string) {
        return CommonApi.findEntity(id, this.questionAnswers)[0];
    }

    addQuestionAnswer(questionAnswer: QuestionAnswerInterface) {
        return CommonApi.addEntity(questionAnswer, this.questionAnswers);
    }

    removeAllQuestionAnswer() {
        return CommonApi.removeAllEntities(this.questionAnswers);
    }

    removeOneQuestionAnswer(id: string) {
        return CommonApi.removeEntity(id, this.questionAnswers)
    }

    updateQuestionAnswer(id: string, newQuestionAnswer: QuestionAnswerInterface) {
        const [questionAnswer, index] = CommonApi.findEntity(id, this.questionAnswers);
        if(newQuestionAnswer.questionChoice)
        {
            questionAnswer.questionChoice = newQuestionAnswer.questionChoice;
        }
        if(newQuestionAnswer.participant)
        {
            questionAnswer.participant = newQuestionAnswer.participant;
        }
        if(newQuestionAnswer.answer_text)
        {
            questionAnswer.answer_text = newQuestionAnswer.answer_text;
        }
        this.questionAnswers[index] = questionAnswer;
        return questionAnswer;
    }
}