import {ResultInterface} from "./result.interface";
import {testEntity} from "../../../entity/test.entity";

export interface  TestResultsInterface
{
    test : testEntity,
    results : ResultInterface[],
}