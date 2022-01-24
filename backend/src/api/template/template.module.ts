import {Module} from "@nestjs/common";
import {TemplateController} from "./template.controller";
import {TemplateService} from "./template.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {testEntity} from "../../entity/test.entity";
import {templateEntity} from "../../entity/template.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([templateEntity])
    ],
    controllers:[TemplateController],
    providers:[TemplateService]
})
export class TemplateModule{}