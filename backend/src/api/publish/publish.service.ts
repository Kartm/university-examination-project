import {Injectable} from "@nestjs/common";
import {TestService} from "../test/test.service";

@Injectable()
export class publishService extends TestService {


    publishExam(test_id: string){
        this.generateLinks(test_id);
        this.sendOwnerMail(test_id);
    }




    }



