import {Injectable} from "@nestjs/common";
import {TestService} from "../test/test.service";

@Injectable()
export class publishService extends TestService {


    publishExam(test_id: string, owner_link:string, owner_email){
        this.generateLinks(test_id);
        this.sendOwnerMail(owner_link, owner_email);
    }




    }



