import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {QuestionService} from "./question.service";
import {QuestionInterface} from "./interfaces/question.interface";

@Controller("question")
export class QuestionController
{
    constructor(private questionService : QuestionService) {
    }
    @Get()
    getAllQuestion()
    {
        return QuestionService.getAllQuestions();
    }

    @Get(":id")
    getOneQuestion(@Param("id") id : string)
    {
        return QuestionService.getOneQuestion(id);
    }

    @Post()
    addQuestion(@Body() question : QuestionInterface)
    {
        return QuestionService.addQuestion(question)
    }

    @Delete()
    removeAllQuestions()
    {
        return QuestionService.removeAllQuestions()
    }

    @Delete(":id")
    removeOneQuestion(@Param("id") id : string)
    {
        return QuestionService.removeOneQuestion(id);
    }

    @Patch(":id")
    updateQuestion(@Param("id") id : string, @Body() question : QuestionInterface)
    {
        return QuestionService.updateQuestion(id, question)
    }
}