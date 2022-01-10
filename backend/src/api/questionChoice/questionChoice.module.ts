import {Module} from "@nestjs/common";
import {QuestionChoiceController} from "./questionChoice.controller";
import {QuestionChoiceService} from "./questionChoice.service";

@Module({
    imports: [

    ],
    controllers:[QuestionChoiceController],
    providers:[QuestionChoiceService]
})
export class QuestionChoiceModule { }