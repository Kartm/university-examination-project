import {Controller, Get, Param, Post, Put} from "@nestjs/common";
import {SubmitService} from "./submit.service";

@Controller()
export class SubmitController {

    constructor(private submitService: SubmitService) {
    }

 @Get(":question_id")
   submitAnswer(@Param("question_id") id: string){
      return this.submitService.submitAnswer();
    }



}
