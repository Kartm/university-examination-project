import {TemplateService} from "./template.service";
import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {TemplateInterface} from "./interfaces/template.interface";

@Controller("template")
export class TemplateController
{
    constructor(private templateService : TemplateService) {
    }

    @Get()
    getAllTemplate()
    {
        return this.templateService.getAllTemplate();
    }

    @Get(":id")
    getOneTemplate(@Param("id") id : string)
    {
        return this.templateService.getOneTemplate(id);
    }

    @Post()
    addTemplate(@Body() template : TemplateInterface)
    {
        return this.templateService.addTemplate(template)
    }

    @Delete()
    deleteAllTemplate()
    {
        return this.templateService.deleteAllTemplate();
    }

    @Delete(":id")
    deleteOneTemplate(@Param("id") id : string)
    {
        return this.templateService.deleteOneTemplate(id);
    }

    @Patch(":id")
    updateTemplate(@Param("id") id : string, @Body() template : TemplateInterface)
    {
        return this.templateService.updateTemplate(id, template)
    }

}
