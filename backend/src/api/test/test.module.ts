import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestEntity} from "./entities/test.entity";
import {TestsController} from "./test.controller";
import {TestService} from "./test.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([TestEntity])
    ],
    controllers:[TestsController],
    providers:[TestService]
})
export class TestModule { }