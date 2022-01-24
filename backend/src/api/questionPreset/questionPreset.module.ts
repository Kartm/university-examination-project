import {QuestionPresetService} from "./questionPreset.service";
import {QuestionPresetController} from "./questionPreset.controller";
import {Module} from "@nestjs/common";
import { questionPresetEntity } from "src/entity/quesitonPreset.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([questionPresetEntity])],
    controllers: [QuestionPresetController],
    providers: [QuestionPresetService]
})
export class QuestionPresetModule {
}