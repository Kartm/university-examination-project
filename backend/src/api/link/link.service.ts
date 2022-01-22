import {Injectable} from "@nestjs/common";
import {LinkInterface} from "./interface/link.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";
import {ParticipantInterface} from "../participant/interfaces/participant.interface";
import {ParticipantService} from "../participant/participant.service";


@Injectable()

export class LinkService {

    static links: LinkInterface[] = [];


    static getAllLinks() {
        return this.links;
    }

    static addLink(link: LinkInterface) {
        return CommonApi.addEntity(link, this.links);
    }

    static getSingleLink(id: string): LinkInterface {
        const link = CommonApi.findEntity(id, this.links)[0];
        if(!link) return null;
        if(link.used) return null;
        const participant : ParticipantInterface = ParticipantService.participants.find(participant => participant === link.participant);
        link.used = true;
        LinkService.updateLink(id, link);
        return participant;
    }
    static checkLink (linkFromPath : string)
    {
        const link : LinkInterface = LinkService.getSingleLink(linkFromPath);
        if(!link) return null;
        if(link.used) return null;
        const participant : ParticipantInterface = ParticipantService.participants.find(participant => participant === link.participant);
        link.used = true;
        LinkService.updateLink(linkFromPath, link);
        return participant;
    }

    static deleteLink(linkId: string) {

        CommonApi.removeEntity(linkId, this.links)

    }





    static updateLink(id: string, newLink: LinkInterface) {
        const link_ : LinkInterface = CommonApi.findEntity(id, this.links)[0];

        if(newLink.participant)
        {
            link_.participant = newLink.participant
        }
        if (newLink.used) {
            link_.used = newLink.used;
        }
        if(newLink.sent_at)
        {
            link_.sent_at = newLink.sent_at;
        }
        this.links[id] = link_;
        return link_;
    }



    static removeLink(id: string) {
         CommonApi.removeEntity(id, this.links) // why not ; ?
    }

}

