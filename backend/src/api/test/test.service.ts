import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TestInterface} from "./interfaces/test.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class TestService {

    tests: TestInterface[] = [];


    getAllTests() {
        return this.tests;
    }

    addTest(test: TestInterface) {

        return CommonApi.addEntity(test, this.tests)
    }

    getOneTest(id: string) : TestInterface {
        return CommonApi.findEntity(id, this.tests)[0];
    }

    updateTest(id: string, newTest: TestInterface) {
        const test : TestInterface = CommonApi.findEntity(id, this.tests)[0];
        if(newTest.settings)
        {
            test.settings = newTest.settings
        }
        if(newTest.owner)
        {
            test.owner = newTest.owner
        }
        if (newTest.name) {
            test.name = newTest.name;
        }
        if(newTest.owner_link)
        {
            test.owner_link = newTest.owner_link;
        }
        this.tests[id] = test;
        return test;
    }

    removeTest(id: string) {
        CommonApi.removeEntity(id, this.tests)
    }




}