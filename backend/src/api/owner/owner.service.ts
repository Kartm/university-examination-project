import {Injectable} from "@nestjs/common";
import {CommonApi} from "../../APIHelpers/CommonApi";
import {OwnerInterface} from "./interfaces/owner.interface";

@Injectable()
export class OwnerService {
    Owners: OwnerInterface[] = []

    getAllOwner() {
        return this.Owners;
    }

    getOneOwner(id: string) {
        return CommonApi.findEntity(id, this.Owners)[0];
    }

    addOwner(owner: OwnerInterface) {
        return CommonApi.addEntity(owner, this.Owners);
    }

    removeAllOwner() {
        return CommonApi.removeAllEntities(this.Owners);
    }

    removeOneOwner(id: string) {
        return CommonApi.removeEntity(id, this.Owners);
    }

    updateOwner(id: string, newOwner: OwnerInterface) {
        const [owner, index] = CommonApi.findEntity(id, this.Owners)
        if (newOwner.name) {
            owner.name = newOwner.name;
        }
        this.Owners[index] = owner;
        return owner;

    }
}