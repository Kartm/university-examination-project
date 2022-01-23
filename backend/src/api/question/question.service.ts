import {Injectable} from "@nestjs/common";
import {QuestionInterface} from "./interfaces/question.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";

@Injectable()
export class QuestionService
{
    static questions: QuestionInterface[] = [];

    static getAllQuestions() {
        return this.questions;
    }

    static getQuestionsOfTest(test_id: string) {
        return this.questions.filter(q => q.test.test_id === test_id)
    }

    static getOneQuestion(id: string) {
        return CommonApi.findEntity(id, QuestionService.questions)[0];
    }

    static addQuestion(question: QuestionInterface) {
        return CommonApi.addEntity(question, this.questions);
    }

    static removeAllQuestions() {
        return CommonApi.removeAllEntities(this.questions);
    }

    static removeOneQuestion(id: string) {
        return CommonApi.removeEntity(id, this.questions)
    }

    static updateQuestion(id: string, newQuestion: QuestionInterface) {
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