import {QuestionChoiceInterface} from "./interfaces/questionChoice.interface";
import {Injectable} from "@nestjs/common";
import {CommonApi} from "../../APIHelpers/CommonApi";

@Injectable()
export class QuestionChoiceService
{
    static questionChoices : QuestionChoiceInterface[] = [];

    static getAllQuestionChoice() {
        return this.questionChoices;
    }

    static getOneQuestionChoice(id: string) {
        return CommonApi.findEntity(id, this.questionChoices)[0];
    }

    static addQuestionChoice(questionChoice: QuestionChoiceInterface) {
        return CommonApi.addEntity(questionChoice, this.questionChoices);
    }

    static deleteAllQuestionChoices() {
        return CommonApi.removeAllEntities(this.questionChoices)
    }

    static deleteOneQuestionChoice(id: string) {
        return CommonApi.removeEntity(id, this.questionChoices)
    }

    static updateQuestionChoice(id: string, newQuestionChoice: QuestionChoiceInterface) {
        const [questionChoice, index] = CommonApi.findEntity(id, this.questionChoices);
        if(newQuestionChoice.question)
        {
            questionChoice.question = newQuestionChoice.question;
        }
        if(newQuestionChoice.text)
        {
            questionChoice.text = newQuestionChoice.text;
        }
        if(newQuestionChoice.is_correct)
        {
            questionChoice.is_correct = newQuestionChoice.is_correct;
        }
        this.questionChoices[index] = questionChoice;
        return questionChoice;
    }
}