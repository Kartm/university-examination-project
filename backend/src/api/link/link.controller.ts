import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {LinkService} from "./link.service";
import {LinkInterface} from "./interface/link.interface";




@Controller("link")
export class LinkController {

    constructor(private service: LinkService) {


    }



    @Get()
    getAllLinks() {
    return LinkService.getAllLinks();
}

    @Get(":link_id")
    getSingleLink(@Param('link_id') id: string) : LinkInterface {

        return LinkService.getSingleLink(id);
    }

    @Post()
    addLink(@Body() link : LinkInterface) {

        return LinkService.addLink(link);

    }

    @Delete("link_id")
    deleteLink(@Param('link_id') link_id: string) {

        return LinkService.deleteLink(link_id);

    }

    @Patch("link_id" )
    updateLink(@Param('link_id') id : string, @Body() test : LinkInterface)
    {
        return LinkService.updateLink(id, test);
    }
}







