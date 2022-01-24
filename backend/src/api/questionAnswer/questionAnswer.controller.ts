import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {QuestionAnswerService} from "./questionAnswer.service";
import {questionAnswerEntity} from "../../entity/questionAnswer.entity";

@Controller("questionAnswer")
export class QuestionAnswerController
{
    constructor(private questionAnswerService : QuestionAnswerService) {
    }
    @Get()
    getAllQuestion()
    {
        return this.questionAnswerService.getAllQuestions();
    }

    @Get(":id")
    getOneQuestionAnswer(@Param("id") id : string)
    {
        return this.questionAnswerService.getOneQuestionAnswer(id);
    }

    @Post()
    addQuestionAnswer(@Body() questionAnswer : questionAnswerEntity)
    {
        return this.questionAnswerService.addQuestionAnswer(questionAnswer)
    }

    @Delete()
    removeAllQuestionAnswer()
    {
        return this.questionAnswerService.removeAllQuestionAnswer()
    }

    @Delete(":id")
    removeOneQuestionAnswer(@Param("id") id : string)
    {
        return this.questionAnswerService.removeOneQuestionAnswer(id);
    }

    @Patch(":id")
    updateQuestionAnswer(@Param("id") id : string, @Body() questionAnswer : questionAnswerEntity)
    {
        return this.questionAnswerService.updateQuestionAnswer(id, questionAnswer)
    }
}