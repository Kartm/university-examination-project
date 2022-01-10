import {QuestionChoiceInterface} from "./interfaces/questionChoice.interface";
import {Injectable} from "@nestjs/common";
import {CommonApi} from "../../APIHelpers/CommonApi";

@Injectable()
export class QuestionChoiceService
{
    questionChoices : QuestionChoiceInterface[] = [];

    getAllQuestionChoice() {
        return this.questionChoices;
    }

    getOneQuestionChoice(id: string) {
        return CommonApi.findEntity(id, this.questionChoices)[0];
    }

    addQuestionChoice(questionChoice: QuestionChoiceInterface) {
        return CommonApi.addEntity(questionChoice, this.questionChoices);
    }

    deleteAllQuestionChoices() {
        return CommonApi.removeAllEntities(this.questionChoices)
    }

    deleteOneQuestionChoice(id: string) {
        return CommonApi.removeEntity(id, this.questionChoices)
    }

    updateQuestionChoice(id: string, newQuestionChoice: QuestionChoiceInterface) {
        const [questionChoice, index] = CommonApi.findEntity(id, this.questionChoices);
        if(newQuestionChoice.question_id)
        {
            questionChoice.question_id = newQuestionChoice.question_id;
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