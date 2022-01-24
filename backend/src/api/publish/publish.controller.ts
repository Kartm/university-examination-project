import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {publishService} from "./publish.service";
import {ownerEntity} from "../../entity/owner.entity";
import {testEntity} from "../../entity/test.entity";

@Controller()
export class publishController{
    constructor(private publishService: publishService) {
    }

    @Get(":test_id")
    getExamPublish(@Param("test_id") test_id: string, @Param("owner_link") owner_link: string, @Param("owner_email") owner_email:string) {
        return this.publishService.publishExam(test_id, owner_link, owner_email);
    }



}