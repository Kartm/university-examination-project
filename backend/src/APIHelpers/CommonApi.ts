import {NotFoundException} from "@nestjs/common";
import {IIdHaver} from "./IIdHaver";
import {v4 as uuidv4} from "uuid";

export class CommonApi {
    public static addEntity<T extends IIdHaver>(entity : T, array : T[])
    {
        entity.id = uuidv4();
        array.push(entity);
        return entity;
    }

    public static removeEntity<T extends IIdHaver>(id : string | number, array : T[])
{

    const index = this.findEntity(id, array)[1];
    return array.splice(index, 1);

}


    static removeAllEntities<T extends IIdHaver>(array: T[]) {
        array = [];
        return array;
    }

    public static findEntity<T extends IIdHaver>(id : string | number, array : T[]): [T, number]
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