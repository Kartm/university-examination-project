import {TemplateService} from "./template.service";
import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {TemplateInterface} from "./interfaces/template.interface";
import {templateEntity} from "../../entity/template.entity";

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
    deleteOneTemplate(@Param("id") template: templateEntity)
    {
        return this.templateService.deleteOneTemplate(template);
    }

    @Patch(":id")
    updateTemplate(@Param("id") template: string, @Body() templateE : templateEntity){
        return this.templateService.updateTemplate(template, templateE)
    }

}
