import {Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { questionEntity } from "src/entity/question.entity";
import {QuestionController} from "./question.controller";
import {QuestionService} from "./question.service";

@Module({
    imports: [TypeOrmModule.forFeature([questionEntity])],
    controllers:[QuestionController],
    providers:[QuestionService]
})
export class QuestionModule{}