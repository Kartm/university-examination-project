import {Module} from "@nestjs/common";
import {TestsController} from "./test.controller";
import {TestService} from "./test.service";

@Module({
    imports: [

    ],
    controllers:[TestsController],
    providers:[TestService]
})
export class TestModule { }