import {Module} from "@nestjs/common";
import {QuestionAnswerController} from "./questionAnswer.controller";
import {QuestionAnswerService} from "./questionAnswer.service";

@Module({
    controllers:[QuestionAnswerController],
    providers:[QuestionAnswerService]
})
export class QuestionAnswerModule {}