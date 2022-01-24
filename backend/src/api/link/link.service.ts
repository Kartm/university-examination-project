import {Injectable, NotFoundException} from "@nestjs/common";
import {LinkInterface} from "./interface/link.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";
import {ParticipantInterface} from "../participant/interfaces/participant.interface";
import {ParticipantService} from "../participant/participant.service";
import { linkEntity } from "src/entity/link.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {testEntity} from "../../entity/test.entity";


@Injectable()
export class LinkService {
    constructor(
        @InjectRepository(linkEntity)
        private linkRepository: Repository<linkEntity>,
    ) {}
    links: LinkInterface[] = [];

    async getAllLinks(): Promise<linkEntity[]> {
        return await this.linkRepository.find();
    }

    async addLink(link: LinkInterface) {
        const newLink = this.linkRepository.create(link);
        await this.linkRepository.save(newLink);
        return newLink;
    }

    async getSingleLink(link: string) {
        return await this.linkRepository.findOne(link);
    }

    // static checkLink (linkFromPath : string)
    // {
    //     const link : LinkInterface = LinkService.getSingleLink(linkFromPath);
    //     if(!link) return null;
    //     if(link.used) return null;
    //     const participant : ParticipantInterface = ParticipantService.participants.find(participant => participant === link.participant);
    //     link.used = true;
    //     LinkService.updateLink(linkFromPath, link);
    //     return participant;
    // }

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
        existingLink.name = editedLink.name;
        existingLink.sent_at = editedLink.sent_at;

        await this.linkRepository.save(existingLink);
        return editedLink;
    }

}
