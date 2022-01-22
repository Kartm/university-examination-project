import {Injectable} from "@nestjs/common";
import {QuestionInterface} from "./interfaces/question.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";

@Injectable()
export class QuestionService
{
    questions: QuestionInterface[] = [];

    getAllQuestions() {
        return this.questions;
    }

    getOneQuestion(id: string) {
        return CommonApi.findEntity(id, this.questions)[0];
    }

    addQuestion(question: QuestionInterface) {
        return CommonApi.addEntity(question, this.questions);
    }

    removeAllQuestions() {
        return CommonApi.removeAllEntities(this.questions);
    }

    removeOneQuestion(id: string) {
        return CommonApi.removeEntity(id, this.questions)
    }

    updateQuestion(id: string, newQuestion: QuestionInterface) {
        const [question, index] = CommonApi.findEntity(id, this.questions);
        if(newQuestion.test)
        {
            question.test = newQuestion.test;
        }
        if(newQuestion.questionType)
        {
            question.questionType = newQuestion.questionType;
        }
        this.questions[index] = question;
        return question;
    }
}