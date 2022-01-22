import {Injectable} from "@nestjs/common";
import {TestInterface} from "../test/interfaces/test.interface";
import {ParticipantInterface} from "../participant/interfaces/participant.interface";
import {TestService} from "../test/test.service";
import {PublishInterface} from "./interface/publish.interface";
import {LinkService} from "../link/link.service";
import {LinkInterface} from "../link/interface/link.interface";

@Injectable()
export class publishService extends TestService {

    publish: PublishInterface[] = [];

    publishExam(test_id: string) {
         this.generateLinks(test_id);

    }



}