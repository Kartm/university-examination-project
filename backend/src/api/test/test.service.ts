import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TestEntity} from "./entities/test.entity";
import {Repository} from "typeorm";
import {TestInterface} from "./interfaces/test.interface";

@Injectable()
export class TestService
{
    constructor(@InjectRepository(TestEntity) private testRepository : Repository<TestEntity>) {
    }

    tests : TestInterface[] = [];

    // async getAllTests() {
    //     // return this.tests;
    //     return this.testRepository
    //         .createQueryBuilder("Test")
    //         .getMany()
    // }
    //
    // async addTest(test: TestInterface) {
    //     // this.tests.push(test);
    //     // return test;
    //     const testEntity = new TestEntity()
    //     testEntity.id = test.id;
    //     testEntity.settings = test.settings
    //     testEntity.name = test.name
    //     testEntity.owner = test.owner;
    //     testEntity.owner_link = test.owner_link;
    //     return await this.testRepository.save(testEntity);
    // }
    async getAllTests() {
        return this.tests;
    }

    async addTest(test: TestInterface) {
        this.tests.push(test);
        return test;
    }

}