import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {questionChoiceEntity} from "../../entity/questionChoice.entity";
import {ResultsService} from "./results.service";
import {ResultsController} from "./results.controller";
import {testEntity} from "../../entity/test.entity";
import {participantEntity} from "../../entity/participant.entity";
import {questionAnswerEntity} from "../../entity/questionAnswer.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([testEntity, questionChoiceEntity, participantEntity, questionAnswerEntity])
    ],
    controllers:[ResultsController],
    providers:[ResultsService]
})
export class ResultsModule { }