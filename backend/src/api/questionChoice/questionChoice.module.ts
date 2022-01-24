import {Module} from "@nestjs/common";
import {QuestionChoiceController} from "./questionChoice.controller";
import {QuestionChoiceService} from "./questionChoice.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {testEntity} from "../../entity/test.entity";
import {questionChoiceEntity} from "../../entity/questionChoice.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([questionChoiceEntity])
    ],
    controllers:[QuestionChoiceController],
    providers:[QuestionChoiceService]
})
export class QuestionChoiceModule { }