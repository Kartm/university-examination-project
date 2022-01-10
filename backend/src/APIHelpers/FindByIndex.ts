import {NotFoundException} from "@nestjs/common";
import {IIdHaver} from "./IIdHaver";

export class FindByIndex {
    public static findEntity(id : string, array : IIdHaver[]): [IIdHaver, number]
    {
        const arrayIndex = array.findIndex(entity=>entity.id === id)
        const entity = array[arrayIndex];
        if(!entity)
        {
            throw new NotFoundException();
        }
        return [entity, arrayIndex];
    }
}