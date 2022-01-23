import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {QuestionAnswerService} from "./questionAnswer.service";
import {QuestionAnswerInterface} from "./interfaces/questionAnswer.interface";

@Controller("questionAnswer")
export class QuestionAnswerController
{
    constructor(private questionAnswerService : QuestionAnswerService) {
    }
    @Get()
    getAllQuestion()
    {
        return QuestionAnswerService.getAllQuestions();
    }

    @Get(":id")
    getOneQuestionAnswer(@Param("id") id : string)
    {
        return QuestionAnswerService.getOneQuestionAnswer(id);
    }

    @Post()
    addQuestionAnswer(@Body() questionAnswer : QuestionAnswerInterface)
    {
        return QuestionAnswerService.addQuestionAnswer(questionAnswer)
    }

    @Delete()
    removeAllQuestionAnswer()
    {
        return QuestionAnswerService.removeAllQuestionAnswer()
    }

    @Delete(":id")
    removeOneQuestionAnswer(@Param("id") id : string)
    {
        return QuestionAnswerService.removeOneQuestionAnswer(id);
    }

    @Patch(":id")
    updateQuestionAnswer(@Param("id") id : string, @Body() questionAnswer : QuestionAnswerInterface)
    {
        return QuestionAnswerService.updateQuestionAnswer(id, questionAnswer)
    }
}