import {ParticipantController} from "./participant.controller";
import {ParticipantService} from "./participant.service";
import {Module} from "@nestjs/common";

@Module( {

    imports: [],
    controllers:[ParticipantController],
    providers: [ParticipantService]



})


export class ParticipantModule{}