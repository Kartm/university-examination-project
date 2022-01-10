import {HttpException, HttpStatus, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TestEntity} from "./entities/test.entity";
import {Repository} from "typeorm";
import {TestInterface} from "./interfaces/test.interface";
import {APIHelpers} from "../../APIHelpers";
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class TestService {
    constructor(@InjectRepository(TestEntity) private testRepository: Repository<TestEntity>) {
    }

    tests: TestInterface[] = [];


    getAllTests() {
        return this.tests;
    }

    addTest(test: TestInterface) {

        test.id = uuidv4();
        console.log(test.id);
        this.tests.push(test);
        return test;
    }

    getOneTest(id: string) : TestInterface {
        return APIHelpers.findEntity(id, this.tests)[0];
    }

    updateTest(id: string, newTest: TestInterface) {
        const test : TestInterface = APIHelpers.findEntity(id, this.tests)[0];
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
        const arrayIndex = APIHelpers.findEntity(id, this.tests)[1]
        this.tests.splice(arrayIndex,1);
    }




}