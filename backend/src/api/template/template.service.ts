import {Injectable, NotFoundException} from "@nestjs/common";
import {TemplateInterface} from "./interfaces/template.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";
import {InjectRepository} from "@nestjs/typeorm";
import {templateEntity} from "../../entity/template.entity";
import {Repository} from "typeorm";

@Injectable()
export class TemplateService {


    constructor(@InjectRepository(templateEntity) private templateRepository: Repository<templateEntity>) {
    }

    templates: TemplateInterface[] = [];

    async getAllTemplate(): Promise<templateEntity[]> {
        return await this.templateRepository.find();
    }

    async getOneTemplate(template: string) {
        return await this.templateRepository.findOne(template);
    }

    async addTemplate(template: TemplateInterface) {
        const newTemplate = this.templateRepository.create(template);
        await this.templateRepository.save(newTemplate)
        return newTemplate;
    }

    async deleteAllTemplate() {
        this.templateRepository.find().then(template=> this.templateRepository.remove(template))
    }

    async deleteOneTemplate(template: templateEntity) {
        const deletedTemplate = await this.templateRepository.findOne(template);
        if (!deletedTemplate) {
            throw new NotFoundException('Template is not found');
        }
        await this.templateRepository.delete(template);
        return {
            message: `${deletedTemplate.name}  deleted successfully`,
        };

    }

    async updateTemplate(template: string, editedTemplate: templateEntity) {
        const existingTemplate = await this.templateRepository.findOne(template);
        if (!existingTemplate) {
            throw new NotFoundException('Test is not found');
        }
        existingTemplate.name = editedTemplate.name;
        await this.templateRepository.save(existingTemplate);
        return editedTemplate;
    }
}