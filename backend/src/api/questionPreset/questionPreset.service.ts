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
        if(newQuestionPreset.template_id)
        {
            questionPreset.template_id = newQuestionPreset.template_id;
        }
        if(newQuestionPreset.question_type_id)
        {
            questionPreset.question_type_id = newQuestionPreset.question_type_id;
        }
        if(newQuestionPreset.question_num)
        {
            questionPreset.question_num = newQuestionPreset.question_num;
        }
        this.questionPresets[index] = questionPreset;
        return questionPreset;
    }
}