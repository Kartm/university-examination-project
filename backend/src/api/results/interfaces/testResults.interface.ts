import {TestInterface} from "../../test/interfaces/test.interface";
import {ResultInterface} from "./result.interface";

export interface  TestResultsInterface
{
    test : TestInterface,
    results : ResultInterface[],
}