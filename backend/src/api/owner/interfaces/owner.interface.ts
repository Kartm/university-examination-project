import {TestInterface} from "../../test/interfaces/test.interface";

export interface OwnerInterface
{
    id_owner?: number;
    name?: string;
    tests?: TestInterface[]
}