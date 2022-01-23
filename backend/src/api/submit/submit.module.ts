import {Module} from "@nestjs/common";
import {SubmitController} from "./submit.controller";
import {SubmitService} from "./submit.service";

@Module({

    imports: [],
    controllers: [SubmitController],
    providers: [SubmitService]

})
export class SubmitModule{

}