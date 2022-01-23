import {Injectable} from "@nestjs/common";
import {TestInterface} from "../test/interfaces/test.interface";

@Injectable()
export class SubmitService implements TestInterface {


    checkTime(){

    }

    submitAnswer(){
        let isGoing = this.time_end;
        let hasFinished = this.time_start;




    }

}