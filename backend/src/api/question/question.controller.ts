import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {QuestionService} from "./question.service";
import { questionEntity } from "src/entity/question.entity";

@Controller("question")
export class QuestionController
{
    constructor(private questionService : QuestionService) {}


    @Get()
    getAllQuestion()
    {
        return this.questionService.getAllQuestions();
    }


    @Get(":id")
    getOneQuestion(@Param("id") question : string)
    {
        return this.questionService.getOneQuestion(question);
    }

    @Post()
    addQuestion(@Body() question : questionEntity)
    {
        return this.questionService.addQuestion(question);
    }

    @Delete()
    removeAllQuestions()
    {
        return this.questionService.removeAllQuestions();
    }

    @Delete(":id")
    removeOneQuestion(@Param("id") question : string)
    {
        return this.questionService.removeOneQuestion(question);
    }

    @Patch(":id")
    updateQuestion(@Param("id") question : string, @Body() newQuesiton : questionEntity)
    {
        return this.questionService.updateQuestion(question, newQuesiton)
    }
}