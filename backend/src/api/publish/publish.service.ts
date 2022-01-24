import {Injectable} from "@nestjs/common";
import {TestInterface} from "../test/interfaces/test.interface";
import {ParticipantInterface} from "../participant/interfaces/participant.interface";
import {TestService} from "../test/test.service";
import {PublishInterface} from "./interface/publish.interface";
import {LinkService} from "../link/link.service";
import {LinkInterface} from "../link/interface/link.interface";
import {testEntity} from "../../entity/test.entity";
import {ownerEntity} from "../../entity/owner.entity";

@Injectable()
export class publishService extends TestService {

    publish: PublishInterface[] = [];

    publishExam(test_id: string, owner_link:string, owner_email){
        this.generateLinks(test_id);
        this.sendOwnerMail(owner_link, owner_email);
    }




    }



