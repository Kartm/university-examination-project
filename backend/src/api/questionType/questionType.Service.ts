import {Injectable} from "@nestjs/common";
import {QuestionTypeInterface} from "./interfaces/questionType.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";

@Injectable()
export class QuestionTypeService
{
    questionTypes: QuestionTypeInterface[] = []

    getAllQuestionType() {
        return this.questionTypes;
    }

    getOneQuestionType(id: string) {
        return CommonApi.findEntity(id, this.questionTypes)[0];
    }

    addQuestionType(questionType: QuestionTypeInterface) {
        return CommonApi.addEntity(questionType, this.questionTypes);
    }

    removeAllQuestionType() {
        return CommonApi.removeAllEntities(this.questionTypes);
    }

    removeOneQuestionType(id: string) {
        return CommonApi.removeEntity(id, this.questionTypes);
    }

    updateQuestionType(id: string, newQuestionType: QuestionTypeInterface) {
        const [questionType, index] = CommonApi.findEntity(id, this.questionTypes)
        if(newQuestionType.name)
        {
            questionType.name = newQuestionType.name;
        }
        this.questionTypes[index] = questionType;
        return questionType;

    }
}