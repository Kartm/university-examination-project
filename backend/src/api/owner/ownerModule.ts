import {QuestionPresetService} from "./questionPreset.service";
import {QuestionPresetController} from "./questionPreset.controller";
import {Module} from "@nestjs/common";

@Module({
    controllers: [QuestionPresetController],
    providers: [QuestionPresetService]
})
export class QuestionPresetModule {
}