import {Controller, Get, Param, Post} from "@nestjs/common";
import {publishService} from "./publish.service";

@Controller()
export class publishController{
    constructor(private publishService: publishService) {
    }

    @Get("test_id")
    getExamPublish(@Param("test_id") test_id: string) {
        return this.publishService.publishExam(test_id);
    }



}