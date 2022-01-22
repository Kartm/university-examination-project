import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {ParticipantService} from "./participant.service";
import {ParticipantInterface} from "./interfaces/participant.interface";



@Controller("participant")
export class ParticipantController {

    constructor(private service: ParticipantService) {
    }


    @Get()
    getAllParticipants()
    {
        return ParticipantService.getAllParticipants();
    }

    @Get(":id")
    getOneParticipant(@Param('id') id : string) :ParticipantInterface
    {
        return ParticipantService.getOneParticipant(id);
    }

    @Post()
    addParticipant(@Body() participant : ParticipantInterface)
    {
        return ParticipantService.addParticipant(participant);
    }

    @Delete(":id")
    removeParticipant(@Param("id") id : string)
    {
        return ParticipantService.removeParticipant(id);
    }

    @Patch(":id")
    updateParticipant(@Param('id') id : string, @Body() participant: ParticipantInterface)
    {
        return ParticipantService.updateParticipant(id, participant);
    }

}
