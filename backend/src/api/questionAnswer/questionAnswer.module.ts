import {Module} from "@nestjs/common";
import {QuestionAnswerController} from "./questionAnswer.controller";
import {QuestionAnswerService} from "./questionAnswer.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {testEntity} from "../../entity/test.entity";
import {questionAnswerEntity} from "../../entity/questionAnswer.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([questionAnswerEntity])
    ],
    controllers:[QuestionAnswerController],
    providers:[QuestionAnswerService]
})
export class QuestionAnswerModule {}