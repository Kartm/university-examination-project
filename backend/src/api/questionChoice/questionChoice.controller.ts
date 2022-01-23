import {QuestionChoiceService} from "./questionChoice.service";
import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {QuestionChoiceInterface} from "./interfaces/questionChoice.interface";

@Controller("questionChoice")
export class QuestionChoiceController
{
    constructor(private questionChoiceService : QuestionChoiceService) {
    }

    @Get()
    getALlQuestionChoice()
    {
        return QuestionChoiceService.getAllQuestionChoice()
    }


    @Get(":id")
    getOneQuestionChoice(@Param("id") id : string)
    {
        return QuestionChoiceService.getOneQuestionChoice(id);
    }

    @Post()
    addQuestionChoice(@Body() questionChoice : QuestionChoiceInterface)
    {
        return QuestionChoiceService.addQuestionChoice(questionChoice)
    }

    @Delete()
    deleteAllQuestionChoices()
    {
        return QuestionChoiceService.deleteAllQuestionChoices()
    }

    @Delete(":id")
    deleteOneQuestionChoice(@Param("id") id : string)
    {
        return QuestionChoiceService.deleteOneQuestionChoice(id)
    }

    @Patch(":id")
    updateQuestionChoice(@Param("id") id : string, @Body() questionChoice : QuestionChoiceInterface)
    {
        return QuestionChoiceService.updateQuestionChoice(id, questionChoice);
    }

}