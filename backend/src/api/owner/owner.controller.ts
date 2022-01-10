import {OwnerService} from "./owner.service";
import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {OwnerInterface} from "./interfaces/owner.interface";

@Controller("owner")
export class OwnerController
{
    constructor(private ownerService : OwnerService) {
    }

    @Get()
    getAllOwner()
    {
        return this.ownerService.getAllOwner();
    }

    @Get(":id")
    getOneOwner(@Param("id") id : string)
    {
        return this.ownerService.getOneOwner(id);
    }

    @Post()
    addOwner(@Body() Owner : OwnerInterface)
    {
        return this.ownerService.addOwner(Owner);
    }

    @Delete()
    removeALlOwner()
    {
        return this.ownerService.removeAllOwner();
    }

    @Delete(":id")
    removeOneOwner(@Param("id") id : string)
    {
        return this.ownerService.removeOneOwner(id);
    }

    @Patch(":id")
    updateOwner(@Param("id") id : string, @Body() Owner : OwnerInterface)
    {
        return this.ownerService.updateOwner(id, Owner);
    }


}