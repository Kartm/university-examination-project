import {Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { testEntity } from "src/entity/test.entity";
import {TestsController} from "./test.controller";
import {TestService} from "./test.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([testEntity])
    ],
    controllers:[TestsController],
    providers:[TestService]
})
export class TestModule { }