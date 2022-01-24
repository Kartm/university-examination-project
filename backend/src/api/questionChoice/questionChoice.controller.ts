import {QuestionChoiceService} from "./questionChoice.service";
import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {questionChoiceEntity} from "../../entity/questionChoice.entity";

@Controller("questionChoice")
export class QuestionChoiceController
{
    constructor(private questionChoiceService : QuestionChoiceService) {
    }

    @Get()
    getALlQuestionChoice()
    {
        return this.questionChoiceService.getAllQuestionChoice()
    }


    @Get(":id")
    getOneQuestionChoice(@Param("id") id : string)
    {
        return this.questionChoiceService.getOneQuestionChoice(id);
    }

    @Post()
    addQuestionChoice(@Body() questionChoice : questionChoiceEntity)
    {
        return this.questionChoiceService.addQuestionChoice(questionChoice)
    }

    @Delete()
    deleteAllQuestionChoices()
    {
        return this.questionChoiceService.deleteAllQuestionChoices()
    }

    @Delete(":id")
    deleteOneQuestionChoice(@Param("id") id : string)
    {
        return this.questionChoiceService.deleteOneQuestionChoice(id)
    }

    @Patch(":id")
    updateQuestionChoice(@Param("id") id : string, @Body() questionChoice : questionChoiceEntity)
    {
        return this.questionChoiceService.updateQuestionChoice(id, questionChoice);
    }

}