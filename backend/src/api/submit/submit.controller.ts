import {Controller, Get, Post, Put} from "@nestjs/common";
import {SubmitService} from "./submit.service";

@Controller()
export class SubmitController {

    constructor(private submitService: SubmitService) {
    }

//   @Put(":question_id")
//   submitAnswer()
//       return this.submitService.
// }



}
