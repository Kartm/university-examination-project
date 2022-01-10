import {QuestionTypeService} from "./questionType.Service";
import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {QuestionTypeInterface} from "./interfaces/questionType.interface";

@Controller("questionType")
export class QuestionTypeController
{
    constructor(private questionTypeService : QuestionTypeService) {
    }

    @Get()
    getAllQuestionType()
    {
        return this.questionTypeService.getAllQuestionType();
    }

    @Get(":id")
    getOneQuestionType(@Param("id") id : string)
    {
        console.log(id);
        return this.questionTypeService.getOneQuestionType(id);
    }

    @Post()
    addQuestionType(@Body() questionType : QuestionTypeInterface)
    {
        return this.questionTypeService.addQuestionType(questionType);
    }

    @Delete()
    removeALlQuestionType()
    {
        return this.questionTypeService.removeAllQuestionType();
    }

    @Delete(":id")
    removeOneQuestionType(@Param("id") id : string)
    {
        return this.questionTypeService.removeOneQuestionType(id);
    }

    @Patch(":id")
    updateQuestionType(@Param("id") id : string, @Body() questionType : QuestionTypeInterface)
    {
        return this.questionTypeService.updateQuestionType(id, questionType);
    }


}