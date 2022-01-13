import {Injectable} from "@nestjs/common";
import {ParticipantInterface} from "./interfaces/participant.interface";
import {TestInterface} from "../test/interfaces/test.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";


@Injectable()
export class ParticipantService {

    participants: ParticipantInterface[] = [];



    getAllParticipants() {
        return this.participants;
    }

    addParticipant(participant: ParticipantInterface) {

        return CommonApi.addEntity(participant, this.participants)
    }

    getOneParticipant(id: string) : ParticipantInterface {
        return CommonApi.findEntity(id, this.participants)[0];
    }

    updateParticipant(id: string, newParticipant: ParticipantInterface) {
        const participant : ParticipantInterface = CommonApi.findEntity(id, this.participants)[0];
        if(newParticipant.test_id)
        {
            participant.test_id = newParticipant.test_id;
        }
        if(newParticipant.score)
        {
            participant.score = newParticipant.score;
        }
        if (newParticipant.email) {
            participant.email = newParticipant.email;
        }
        if(newParticipant.name)
        {
            participant.name = newParticipant.name;
        }
        this.participants[id] = participant;
        return test;
    }

    removeParticipant(id: string) {
        CommonApi.removeEntity(id, this.participants)
    }

}
