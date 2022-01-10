import {Injectable} from "@nestjs/common";
import {TestInterface} from "./interfaces/test.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";

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
        if(newTest.settings_id)
        {
            test.settings_id = newTest.settings_id
        }
        if(newTest.owner_name)
        {
            test.owner_name = newTest.owner_name
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