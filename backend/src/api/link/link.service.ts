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

    updateLink(id: number, newLink: LinkInterface) {
        const test : TestInterface = CommonApi.findEntity(id, this.links)[0];

    }

    removeLink(id: number) {
         CommonApi.removeEntity(id, this.links) // why not ; ?
    }

}