import {Module} from "@nestjs/common";
import {LinkService} from "./link.service";
import {LinkController} from "./link.controller";
import { linkEntity } from "src/entity/link.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import {participantEntity} from "../../entity/participant.entity";

@Module( {
    imports: [TypeOrmModule.forFeature([linkEntity, participantEntity])],
    controllers: [LinkController],
    providers: [LinkService]

})

export class LinkModule {}
