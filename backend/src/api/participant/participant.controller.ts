import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {ParticipantService} from "./participant.service";
import {ParticipantInterface} from "./interfaces/participant.interface";
import { participantEntity } from "src/entity/participant.entity";

@Controller("participant")
export class ParticipantController {
    constructor(private service: ParticipantService) {}

    @Get()
    getAllParticipants()
    {
        return this.service.getAllParticipants();
    }

    @Get(":id")
    getOneParticipant(@Param('id') participant : string)
    {
        return this.service.getOneParticipant(participant);
    }

    @Post()
    addParticipant(@Body() participant : ParticipantInterface)
    {
        return this.service.addParticipant(participant);
    }

    @Delete(":id")
    removeParticipant(@Param("id") participant : participantEntity)
    {
        return this.service.removeParticipant(participant);
    }

    @Patch(":id")
    updateParticipant(@Param('id') participant :string, @Body() editedParticipant: participantEntity)
    {
        return this.service.updateParticipant(participant, editedParticipant);
    }

}
