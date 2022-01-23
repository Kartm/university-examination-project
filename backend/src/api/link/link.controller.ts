import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {LinkService} from "./link.service";
import {LinkInterface} from "./interface/link.interface";




@Controller("link")
export class LinkController {

    constructor(private linkService: LinkService) {


    }



    @Get()
    getAllLinks() {
    return this.linkService.getAllLinks();
}

    @Get(":link_id")
    getSingleLink(@Param('link_id') id: string) : LinkInterface {

        return this.linkService.getSingleLink(id);
    }

    @Post()
    addLink(@Body() link : LinkInterface) {

        return this.linkService.addLink(link);

    }

    @Delete("link_id")
    deleteLink(@Param('link_id') link_id: string) {

        return this.linkService.deleteLink(link_id);

    }

    @Patch("link_id" )
    updateLink(@Param('link_id') id : string, @Body() test : LinkInterface)
    {
        return this.linkService.updateLink(id, test);
    }
}







