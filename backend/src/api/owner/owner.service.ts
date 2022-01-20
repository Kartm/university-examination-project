import {Injectable} from "@nestjs/common";
import {ownerInterface} from "./interfaces/owner.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";

@Injectable()
export class ownerService
{
    owners : ownerInterface[] = [];


    getAllowner() {
        return this.owners;
    }

    getOneowner(id: string) {
        return CommonApi.findEntity(id, this.owners)[0];
    }

    addQuestionPresset(owner: ownerInterface) {
        return CommonApi.addEntity(owner, this.owners);
    }

    removeAllowner() {
        return CommonApi.removeAllEntities(this.owners);
    }

    removeOneowner(id: string) {
        return CommonApi.removeEntity(id, this.owners);
    }

    updateowner(id: string, newowner: ownerInterface) {
        const [owner, index] = CommonApi.findEntity(id, this.owners);
        if(newowner.template_id)
        {
            owner.template_id = newowner.template_id;
        }
        if(newowner.question_type_id)
        {
            owner.question_type_id = newowner.question_type_id;
        }
        if(newowner.question_num)
        {
            owner.question_num = newowner.question_num;
        }
        this.owners[index] = owner;
        return owner;
    }
}