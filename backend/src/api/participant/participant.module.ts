import {ParticipantController} from "./participant.controller";
import {ParticipantService} from "./participant.service";
import {Module} from "@nestjs/common";
import { testEntity } from "src/entity/test.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import {participantEntity} from "../../entity/participant.entity";

@Module( {
    imports: [
        TypeOrmModule.forFeature([participantEntity])
    ],
    controllers:[ParticipantController],
    providers: [ParticipantService]
})
export class ParticipantModule{}