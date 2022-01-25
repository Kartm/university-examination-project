import {Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { testEntity } from "src/entity/test.entity";
import {TestsController} from "./test.controller";
import {TestService} from "./test.service";
import {linkEntity} from "../../entity/link.entity";
import {participantEntity} from "../../entity/participant.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([testEntity, linkEntity, participantEntity])
    ],
    controllers:[TestsController],
    providers:[TestService]
})
export class TestModule { }