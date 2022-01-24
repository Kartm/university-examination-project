import {Injectable, NotFoundException} from "@nestjs/common";
import { participantEntity } from "src/entity/participant.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class ParticipantService {
    constructor(
        @InjectRepository(participantEntity)
        private participantRepository: Repository<participantEntity>,
    ) {}

    async getAllParticipants(): Promise<participantEntity[]> {
        return await this.participantRepository.find();
    }

    async addParticipant(participant: participantEntity) {
        const newParticipant = this.participantRepository.create(participant);
        await this.participantRepository.save(newParticipant);
        return newParticipant;
    }

    async getOneParticipant(participant: string) {
        return await this.participantRepository.findOne(participant);
    }

    async updateParticipant(participant: string, editedParticipant: participantEntity) {
        const existingParticipant = await this.participantRepository.findOne(participant);
        if (!existingParticipant) {
            throw new NotFoundException('Participant is not found');
        }
        existingParticipant.name = editedParticipant.name;
        existingParticipant.email = editedParticipant.email;
        existingParticipant.score = editedParticipant.score;

        await this.participantRepository.save(existingParticipant);
        return editedParticipant;
    }

    async removeParticipant(participant: participantEntity) {
        const deletedParticipant = await this.participantRepository.findOne(participant);
        if (!deletedParticipant) {
            throw new NotFoundException('Participant is not found');
        }
        await this.participantRepository.delete(participant);
        return {
            message: `${deletedParticipant.name} deleted successfully`,
        };
    }

}


