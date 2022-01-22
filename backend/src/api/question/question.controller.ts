import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
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
        return this.questionService.getAllQuestions();
    }

    @Get()
    getQuestionsOfTest(@Query('test_id') test_id)
    {
        console.log('getQuestionsOfTest')
        return this.questionService.getQuestionsOfTest(test_id);
    }

    @Get(":id")
    getOneQuestion(@Param("id") id : string)
    {
        return this.questionService.getOneQuestion(id);
    }

    @Post()
    addQuestion(@Body() question : QuestionInterface)
    {
        return this.questionService.addQuestion(question)
    }

    @Delete()
    removeAllQuestions()
    {
        return this.questionService.removeAllQuestions()
    }

    @Delete(":id")
    removeOneQuestion(@Param("id") id : string)
    {
        return this.questionService.removeOneQuestion(id);
    }

    @Patch(":id")
    updateQuestion(@Param("id") id : string, @Body() question : QuestionInterface)
    {
        return this.questionService.updateQuestion(id, question)
    }
}