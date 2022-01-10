import {NotFoundException} from "@nestjs/common";

export class APIHelpers{
    public static findEntity<T>(id : string, array : T[]): [T, number]
    {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const arrayIndex = array.findIndex(entity=>entity.id === id)
        const entity = array[arrayIndex];
        if(!entity)
        {
            throw new NotFoundException();
        }
        return [entity, arrayIndex];
    }
}