import {Injectable, NotFoundException} from "@nestjs/common";
import {QuestionPresetInterface} from "./interfaces/questionPreset.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";
import { questionAnswerEntity } from "src/entity/questionAnswer.entity";
import { questionPresetEntity } from "src/entity/quesitonPreset.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class QuestionPresetService {
    constructor(
        @InjectRepository(questionPresetEntity)
        private questionPresetRepository: Repository<questionPresetEntity>,
    ) {}
    questionPresets : QuestionPresetInterface[] = [];


    async getAllQuestionPreset() {
        return await this.questionPresetRepository.find();
    }

    async getOneQuestionPreset(quesitonPreset: questionPresetEntity) {
        return await this.questionPresetRepository.findOne(quesitonPreset);
    }

    async addQuestionPresset(questionPreset: QuestionPresetInterface) {
        const newQuestionPreset = this.questionPresetRepository.create(questionPreset);
        await this.questionPresetRepository.save(questionPreset);
        return newQuestionPreset;
    }

    async removeAllQuestionPreset() {
        const getAllQuestionPreset = await this.questionPresetRepository.find();
        getAllQuestionPreset.forEach(e => {
            this.questionPresetRepository.delete(e);
        });
    }

    async removeOneQuestionPreset(questionPreset: questionPresetEntity) {
        const deletedQuestionPreset = await this.questionPresetRepository.findOne(questionPreset);
        if (!deletedQuestionPreset) {
            throw new NotFoundException('QuestionPreset is not found');
        }
        await this.questionPresetRepository.delete(questionPreset);
        return {
            message: `QuestionPreset deleted successfully`,
        };
    }

    async updateQuestionPreset(quesitonPreset: questionPresetEntity, editedQuestionPreset: QuestionPresetInterface) {
        const existingQuestionPreset = await this.questionPresetRepository.findOne(quesitonPreset);
        if (!existingQuestionPreset) {
            throw new NotFoundException('Owner is not found');
        }
        existingQuestionPreset.question_num = editedQuestionPreset.question_num;
        await this.questionPresetRepository.save(existingQuestionPreset);
        return editedQuestionPreset;
    }
}