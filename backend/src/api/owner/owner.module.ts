import {Module} from "@nestjs/common";
import {OwnerController} from "./owner.controller";
import {OwnerService} from "./owner.service";

@Module({
    imports: [

    ],
    controllers:[OwnerController],
    providers:[OwnerService]
})
export class OwnerModule { }