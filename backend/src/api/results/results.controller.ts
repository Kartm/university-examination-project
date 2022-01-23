import {Controller, Get, Param} from "@nestjs/common";
import {ResultsService} from "./results.service";

@Controller("results")
export class ResultsController
{
    constructor(private resultsService : ResultsService) {
    }

    @Get(":test_id")
    getResults(@Param("test_id") testId : string)
    {
        return this.resultsService.getResults(testId);
    }

}