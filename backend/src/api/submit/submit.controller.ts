import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {SubmitService} from "./submit.service";
import {testEntity} from "../../entity/test.entity";
import {QuestionAnswerService} from "../questionAnswer/questionAnswer.service";
import {questionAnswerEntity} from "../../entity/questionAnswer.entity";

@Controller()
export class SubmitController {

    constructor(private submitService: SubmitService) {
    }

 @Post()
   submitAnswer(@Body() test: testEntity, @Body() answers: questionAnswerEntity[]){
      return this.submitService.submitAnswer(test,answers);
    }



}
