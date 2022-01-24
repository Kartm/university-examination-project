import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {QuestionPresetService} from "./questionPreset.service";
import {QuestionPresetInterface} from "./interfaces/questionPreset.interface";
import { questionAnswerEntity } from "src/entity/questionAnswer.entity";
import { questionPresetEntity } from "src/entity/quesitonPreset.entity";

@Controller("questionPreset")
export class QuestionPresetController
{
    constructor(private questionPresetService : QuestionPresetService) {
    }

    @Get()
    getAllQuestionPreset()
    {
        return this.questionPresetService.getAllQuestionPreset()
    }

    @Get(":id")
    getOneQuestionPreset(@Param("id") questionPreset : questionPresetEntity)
    {
        return this.questionPresetService.getOneQuestionPreset(questionPreset)
    }

    @Post()
    addQuestionPreset(@Body() questionPreset : questionPresetEntity)
    {
        return this.questionPresetService.addQuestionPresset(questionPreset);
    }

    @Delete()
    removeAllQuestionPreset()
    {
        return this.questionPresetService.removeAllQuestionPreset();
    }

    @Delete(":id")
    removeOneQuestionPreset(@Param("id") questionPreset : questionPresetEntity)
    {
        return this.questionPresetService.removeOneQuestionPreset(questionPreset);
    }

    @Patch(":id")
    updateQuestionPreset(@Param("id") questionPreset : questionPresetEntity, @Body() newQuestionPreset : questionPresetEntity)
    {
        return this.questionPresetService.updateQuestionPreset(questionPreset, newQuestionPreset);
    }

}