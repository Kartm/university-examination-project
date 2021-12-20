import {Body, Controller, Get, Post} from "@nestjs/common";
import {TestService} from "./test.service";
import {TestInterface} from "./interfaces/test.interface";

@Controller("tests")
export class TestsController
{
    constructor(private testService: TestService) {
    }


    @Get()
    getAllTests()
    {
        return this.testService.getAllTests();
    }

    @Post()
    addTest(@Body() test : TestInterface)
    {
        return this.testService.addTest(test);
    }
}