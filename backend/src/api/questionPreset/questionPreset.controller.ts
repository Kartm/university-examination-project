import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {QuestionPresetService} from "./questionPreset.service";
import {QuestionPresetInterface} from "./interfaces/questionPreset.interface";

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
    getOneQuestionPreset(@Param("id") id : string)
    {
        return this.questionPresetService.getOneQuestionPreset(id)
    }

    @Post()
    addQuestionPreset(@Body() questionPreset : QuestionPresetInterface)
    {
        return this.questionPresetService.addQuestionPresset(questionPreset);
    }

    @Delete()
    removeAllQuestionPreset()
    {
        return this.questionPresetService.removeAllQuestionPreset();
    }

    @Delete(":id")
    removeOneQuestionPreset(@Param("id") id : string)
    {
        return this.questionPresetService.removeOneQuestionPreset(id);
    }

    @Patch(":id")
    updateQuestionPreset(@Param("id") id : string, @Body() questionPreset : QuestionPresetInterface)
    {
        return this.questionPresetService.updateQuestionPreset(id, questionPreset);
    }

}