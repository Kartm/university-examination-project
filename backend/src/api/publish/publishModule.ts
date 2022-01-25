import {Module} from "@nestjs/common";
import {publishService} from "./publish.service";
import {publishController} from "./publish.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {linkEntity} from "../../entity/link.entity";
import {participantEntity} from "../../entity/participant.entity";
import {testEntity} from "../../entity/test.entity";

@Module({
    imports: [TypeOrmModule.forFeature([testEntity, linkEntity, participantEntity])],
    controllers: [publishController],
    providers: [publishService]
})

export class PublishModule {}