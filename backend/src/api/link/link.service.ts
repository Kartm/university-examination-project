import {Injectable, NotFoundException} from "@nestjs/common";
import { linkEntity } from "src/entity/link.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {v4 as uuidv4} from "uuid";
import {participantEntity} from "../../entity/participant.entity";


@Injectable()
export class LinkService {
    constructor(
        @InjectRepository(linkEntity)
        private linkRepository: Repository<linkEntity>,
        @InjectRepository(participantEntity)
        private participantRepository: Repository<participantEntity>,
    ) {}

    async getAllLinks(): Promise<linkEntity[]> {
        return await this.linkRepository.find();
    }

    async addLink(link: linkEntity) {
        const newLink = this.linkRepository.create(link);
        await this.linkRepository.save(newLink);
        return newLink;
    }

    async getSingleLink(link: string) {
        return this.checkLink(link)
    }

    async checkLink(linkFromPath: string) {
        const link = await this.linkRepository.findOne(linkFromPath)
        if (!link) return null;
        if (link.used) return null;
        const participant = link.participant
        link.used = true;
        await this.linkRepository.update(link.link_id, link)
        return participant;
    }

    async deleteLink(link: linkEntity) {
        const deletedLink = await this.linkRepository.findOne(link);
        if (!deletedLink) {
            throw new NotFoundException('Link is not found');
        }
        await this.linkRepository.delete(link);
        return {
            message: `Link deleted successfully`,
        };
    }

    async updateLink( link: string, editedLink: linkEntity) {
        const existingLink = await this.linkRepository.findOne(link);
        if (!existingLink) {
            throw new NotFoundException('Link is not found');
        }
        existingLink.used = editedLink.used;

        await this.linkRepository.save(existingLink);
        return editedLink;
    }

    getOwnerLink() {
        return this.generateNewLink();
    }

    private generateNewLink()
    {
        const uuid = uuidv4();
        const path = `http://localhost:3000/${uuid}/results`
        return path;
    }
}
