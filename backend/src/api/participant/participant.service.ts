import {Injectable} from "@nestjs/common";
import {ParticipantInterface} from "./interfaces/participant.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";


@Injectable()
export class ParticipantService {

    static participants: ParticipantInterface[] = [];



    static getAllParticipants() {
        return this.participants;
    }

    static addParticipant(participant: ParticipantInterface) {

        return CommonApi.addEntity(participant, this.participants)
    }

    static getOneParticipant(id: string) : ParticipantInterface {
        return CommonApi.findEntity(id, this.participants)[0];
    }

    static updateParticipant(id: string, newParticipant: ParticipantInterface) {
        const participant : ParticipantInterface = CommonApi.findEntity(id, this.participants)[0];
        if(newParticipant.test)
        {
            participant.test = newParticipant.test;
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

    static removeParticipant(id: string) {
        CommonApi.removeEntity(id, this.participants)
    }

}
