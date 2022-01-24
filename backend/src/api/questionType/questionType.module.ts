import {Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { questionTypeEntity } from "src/entity/questionType.entity";
import {QuestionTypeController} from "./questionType.controller";
import {questionTypeService} from "./questionType.service";

@Module({
    imports: [TypeOrmModule.forFeature([questionTypeEntity])],
    controllers:[QuestionTypeController],
    providers:[questionTypeService]
})
export class QuestionTypeModule { }