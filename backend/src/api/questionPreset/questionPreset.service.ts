import {Injectable} from "@nestjs/common";
import {QuestionPresetInterface} from "./interfaces/questionPreset.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";

@Injectable()
export class QuestionPresetService
{
    questionPresets : QuestionPresetInterface[] = [];


    getAllQuestionPreset() {
        return this.questionPresets;
    }

    getOneQuestionPreset(id: string) {
        return CommonApi.findEntity(id, this.questionPresets)[0];
    }

    addQuestionPresset(questionPreset: QuestionPresetInterface) {
        return CommonApi.addEntity(questionPreset, this.questionPresets);
    }

    removeAllQuestionPreset() {
        return CommonApi.removeAllEntities(this.questionPresets);
    }

    removeOneQuestionPreset(id: string) {
        return CommonApi.removeEntity(id, this.questionPresets);
    }

    updateQuestionPreset(id: string, newQuestionPreset: QuestionPresetInterface) {
        const [questionPreset, index] = CommonApi.findEntity(id, this.questionPresets);
        if(newQuestionPreset.template)
        {
            questionPreset.template = newQuestionPreset.template;
        }
        if(newQuestionPreset.questionType)
        {
            questionPreset.questionType = newQuestionPreset.questionType;
        }
        if(newQuestionPreset.question_num)
        {
            questionPreset.question_num = newQuestionPreset.question_num;
        }
        this.questionPresets[index] = questionPreset;
        return questionPreset;
    }
}