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
        return this.questions.filter(q => q.test_id === test_id)
    }

    getOneQuestion(id: string) {
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
        if(newQuestion.test_id)
        {
            question.test_id = newQuestion.test_id;
        }
        if(newQuestion.question_type_id)
        {
            question.question_type_id = newQuestion.question_type_id;
        }
        this.questions[index] = question;
        return question;
    }
}