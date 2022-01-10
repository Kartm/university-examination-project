import {Injectable} from "@nestjs/common";
import {LinkInterface} from "./interface/link.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";
import {TestInterface} from "../test/interfaces/test.interface";

@Injectable()

export class LinkService {

    links: LinkInterface[] = [];


    getAllLinks() {
        return this.links;
    }

    addLink(link: LinkInterface) {
        return CommonApi.addEntity(link, this.links);
    }

    getSingleLink(id: number): LinkInterface {
          return CommonApi.findEntity(id, this.links)[0];


    }

    deleteLink(linkId: number) {

        CommonApi.removeEntity(linkId, this.links)

    }





    updateLink(id: string, newLink: LinkInterface) {
        const link_ : LinkInterface = CommonApi.findEntity(id, this.links)[0];

        if(newLink.participant_id)
        {
            link_.participant_id = newLink.participant_id
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

    

    removeLink(id: string) {
         CommonApi.removeEntity(id, this.links) // why not ; ?
    }

}

