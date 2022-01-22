import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from "@nestjs/common";
import {TestService} from "./test.service";
import {TestInterface} from "./interfaces/test.interface";

@Controller("tests")
export class TestsController
{
    constructor(private service: TestService) {
    }


    @Get()
    getAllTests()
    {
        return TestService.getAllTests();
    }

    @Get(":test_id/:user_id")
    getOneTest(@Param('test_id') testId : string, @Param('user_id') userId : string) : TestInterface
    {
        return TestService.getOneTest(testId, userId);
    }

    @Post()
    addTest(@Body() test : TestInterface)
    {
        return TestService.addTest(test);
    }

    @Delete(":id")
    removeTest(@Param("id") id : string)
    {
        return TestService.removeTest(id);
    }

    @Patch(":id")
    updateTest(@Param('id') id : string, @Body() test : TestInterface)
    {
        return TestService.updateTest(id, test);
    }
}