import {Injectable} from "@nestjs/common";
import {TestInterface} from "../test/interfaces/test.interface";
import {SubmitInterface} from "./interface/submit.interface";
import {settingsEntity} from "../../entity/settings.entity";
import {ownerEntity} from "../../entity/owner.entity";

@Injectable()
export class SubmitService implements SubmitInterface{

    id: string;
    name: string;
    owner: ownerEntity;
    owner_link: string;
    setting: settingsEntity;
    time_end: Date;
    time_start: Date;



    checkTime() {
       const start=  Math.round(this.time_start.getDate() /1000);
       const end=   Math.round(this.time_end.getDate() /1000)
        const diff = end - start;
        if (diff>0)
        {
            return true
        } else
        {
            false; }
    }

    submitAnswer() {
        if 


    }



}