import {Module} from "@nestjs/common";
import {QuestionTypeController} from "./questionType.controller";
import {QuestionTypeService} from "./questionType.Service";

@Module({
    imports: [

    ],
    controllers:[QuestionTypeController],
    providers:[QuestionTypeService]
})
export class QuestionTypeModule { }