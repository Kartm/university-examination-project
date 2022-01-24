import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {questionTypeService} from "./questionType.service";
import {QuestionTypeInterface} from "./interfaces/questionType.interface";
import { questionTypeEntity } from "src/entity/questionType.entity";

@Controller("questionType")
export class QuestionTypeController {
    constructor(private questionTypeService: questionTypeService) {
    }

    @Get()
    getAllQuestionType() {
        return this.questionTypeService.getAllQuestionType();
    }

    @Get(":id")
    getOneQuestionType(@Param("id") questionType: questionTypeEntity) {
        return this.questionTypeService.getOneQuestionType(questionType);
    }

    @Post()
    addQuestionType(@Body() questionType: questionTypeEntity) {
    }

    @Delete()
    removeALlQuestionType() {
        return this.questionTypeService.removeAllQuestionType();
    }

    @Delete(":id")
    removeOneQuestionType(@Param("id") questionType: questionTypeEntity) {
        return this.questionTypeService.removeOneQuestionType(questionType);
    }

    @Patch(":id")
    updateQuestionType(@Param("id") questionType: questionTypeEntity, @Body() NewQuestionType: questionTypeEntity) {
        return this.questionTypeService.updateQuestionType(questionType, NewQuestionType);
    }
}