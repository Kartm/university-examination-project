import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {LinkService} from "./link.service";
import { linkEntity } from "src/entity/link.entity";




@Controller("link")
export class LinkController {

    constructor(private linkService: LinkService) {}

    // @Get()
    // getAllLinks() {
    //     return this.linkService.getAllLinks();
    // }

    @Get()
    getOwnerLink()
    {
        return this.linkService.getOwnerLink();
    }

    @Get(":link_id")
    getSingleLink(@Param('link_id') link: string) {
        return this.linkService.getSingleLink(link);
    }

    @Post()
    addLink(@Body() link : linkEntity) {
        return this.linkService.addLink(link);
    }

    @Delete("link_id")
    deleteLink(@Param('link_id') link: linkEntity) {
        return this.linkService.deleteLink(link);
    }

    @Patch("link_id" )
    updateLink(@Param('link_id') link :string, @Body() newLink : linkEntity)
    {
        return this.linkService.updateLink(link, newLink);
    }
}







