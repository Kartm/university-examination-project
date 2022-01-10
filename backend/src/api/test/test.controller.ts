import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from "@nestjs/common";
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

    @Get(":id")
    getOneTest(@Param('id') id : string) : TestInterface
    {
        return this.testService.getOneTest(id);
    }

    @Post()
    addTest(@Body() test : TestInterface)
    {
        return this.testService.addTest(test);
    }

    @Delete(":id")
    removeTest(@Param("id") id : string)
    {
        return this.testService.removeTest(id)
    }

    @Patch(":id")
    updateTest(@Param('id') id : string, @Body() test : TestInterface)
    {
        return this.testService.updateTest(id, test);
    }
}