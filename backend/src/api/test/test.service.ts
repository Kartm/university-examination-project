import {HttpException, HttpStatus, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TestEntity} from "./entities/test.entity";
import {Repository} from "typeorm";
import {TestInterface} from "./interfaces/test.interface";

@Injectable()
export class TestService {
    constructor(@InjectRepository(TestEntity) private testRepository: Repository<TestEntity>) {
    }

    tests: TestInterface[] = [];

    // async getAllTests() {
    //     // return this.tests;
    //     return this.testRepository
    //         .createQueryBuilder("Test")
    //         .getMany()
    // }
    //
    // async addTest(test: TestInterface) {
    //     const testEntity = new TestEntity()
    //     testEntity.id = test.id;
    //     testEntity.settings = test.settings
    //     testEntity.name = test.name
    //     testEntity.owner = test.owner;
    //     testEntity.owner_link = test.owner_link;
    //     return await this.testRepository.save(testEntity);
    // }
    getAllTests() {
        return this.tests;
    }

    addTest(test: TestInterface) {
        test.id = this.getNextId();
        this.tests.push(test);
        return test;
    }

    getOneTest(id: number) {
        return this.getAtIndex(id)
    }

    updateTest(id: number, newTest: TestInterface) {
        const test = this.getAtIndex(id);
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
        return this.getAtIndex(id);
    }

    removeTest(id: number) {
        this.getAtIndex(id);
        this.tests.splice(id,1);
        this.updateIds();
    }

    private getAtIndex(id: number): TestInterface {
        console.log(id, this.tests.length)
        if (this.tests.length <= id) {
            throw new NotFoundException("Could not find test");
        } else if (id < 0) {
            throw new NotFoundException("Could not find test");
        }
        const test = this.tests[id];
        return {...test};
    }

    private getNextId(): number {
        return this.tests.length;
    }

    private updateIds() {
        for (let i = 0; i < this.tests.length; i++) {
            this.tests[i].id = i;
        }
    }


}