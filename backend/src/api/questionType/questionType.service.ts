import {Injectable, NotFoundException} from "@nestjs/common";
import {QuestionTypeInterface} from "./interfaces/questionType.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { questionTypeEntity } from "src/entity/questionType.entity";

@Injectable()
export class questionTypeService {
    constructor(
        @InjectRepository(questionTypeEntity)
        private questionTypeRepository: Repository<questionTypeEntity>,
    ) {}
    questionTypes: QuestionTypeInterface[] = []

    async getAllQuestionType(): Promise<questionTypeEntity[]> {
        return await this.questionTypeRepository.find();
    }

    async getOneQuestionType(questionType: questionTypeEntity) {
        return await this.questionTypeRepository.findOne(questionType);
    }

    async addQuestionType(questionType: questionTypeEntity) {
        const newQuestionType = this.questionTypeRepository.create(questionType);
        await this.questionTypeRepository.save(newQuestionType);
        return newQuestionType;
    }

    async removeAllQuestionType() {
        const getAllQuestionType = await this.questionTypeRepository.find();
        getAllQuestionType.forEach(e => {
            this.questionTypeRepository.delete(e);
        });
    }

    async removeOneQuestionType(questionType: questionTypeEntity) {
        const deletedQuestionType = await this.questionTypeRepository.findOne(questionType);
        if (!deletedQuestionType) {
            throw new NotFoundException('questionType is not found');
        }
        await this.questionTypeRepository.delete(questionType);
        return {
            message: `questionType deleted successfully`,
        };
    }

    async updateQuestionType(questionType: questionTypeEntity, editedQuestionType: questionTypeEntity) {
        const existingQuestionType = await this.questionTypeRepository.findOne(questionType);
        if (!existingQuestionType) {
            throw new NotFoundException('Owner is not found');
        }
        existingQuestionType.name = editedQuestionType.name;
        await this.questionTypeRepository.save(existingQuestionType);
        return editedQuestionType;
    }
}