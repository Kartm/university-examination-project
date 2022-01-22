import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from "@nestjs/common";
import {TestService} from "./test.service";
import {TestInterface} from "./interfaces/test.interface";
import { testEntity } from "src/entity/test.entity";

@Controller("tests")
export class TestsController
{
    constructor(private service: TestService) {
    }


    @Get()
    getAllTests()
    {
        return this.service.getAllTests();
    }

    @Get(":id")
    getOneTest(@Param('id') test : testEntity) : TestInterface
    {
        return this.service.getOneTest(test);
    }

    @Post()
    addTest(@Body() test : TestInterface)
    {
        return this.service.addTest(test);
    }

    @Delete(":id")
    removeTest(@Param("id") id : string)
    {
        return this.service.removeTest(id);
    }

    @Patch(":id")
    updateTest(@Param('id') id : string, @Body() test : TestInterface)
    {
        return this.service.updateTest(id, test);
    }
}