import {Module} from "@nestjs/common";
import {publishService} from "./publish.service";

@Module({
    imports: [],
    controllers: [publishService],
    providers: [publishService],
})

export class publishModule{}