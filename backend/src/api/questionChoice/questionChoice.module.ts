import {Module} from "@nestjs/common";
import {QuestionChoiceController} from "./questionChoice.controller";
import {QuestionChoiceService} from "./questionChoice.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {testEntity} from "../../entity/test.entity";
import {questionChoiceEntity} from "../../entity/questionChoice.entity";
import {questionEntity} from "../../entity/question.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([questionChoiceEntity, questionEntity])
    ],
    controllers:[QuestionChoiceController],
    providers:[QuestionChoiceService]
})
export class QuestionChoiceModule { }