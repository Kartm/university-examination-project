import {Injectable} from "@nestjs/common";
import {TemplateInterface} from "./interfaces/template.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";

@Injectable()
export class TemplateService {
    templates: TemplateInterface[] = [];

    getAllTemplate() {
        return this.templates;
    }

    getOneTemplate(id: string) {
        return CommonApi.findEntity(id, this.templates)[0];
    }

    addTemplate(template: TemplateInterface) {
        return CommonApi.addEntity(template, this.templates);
    }

    deleteAllTemplate() {
        return CommonApi.removeAllEntities(this.templates)
    }

    deleteOneTemplate(id: string) {
        return CommonApi.removeEntity(id, this.templates);
    }

    updateTemplate(id: string, newTemplate: TemplateInterface) {
        const [template, index] = CommonApi.findEntity(id, this.templates);
        if (newTemplate.name) {
            template.name = newTemplate.name;
        }
        if (newTemplate.setting) {
            template.setting = newTemplate.setting;
        }
        this.templates[index] = template;
        return template;
    }
}