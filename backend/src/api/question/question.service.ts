import {Injectable, NotFoundException} from "@nestjs/common";
import {QuestionInterface} from "./interfaces/question.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { questionEntity } from "src/entity/question.entity";

@Injectable()
export class QuestionService
{
    constructor(
        @InjectRepository(questionEntity)
        private questionRepository: Repository<questionEntity>,
    ) {}
    static questions: QuestionInterface[] = [];

    async getAllQuestions() {
        return await this.questionRepository.find();
    }

    async getOneQuestion(question: string) {
        return await this.questionRepository.findOne(question);
    }

    async addQuestion(question: questionEntity) {
        const newQuestion = this.questionRepository.create(question);
        await this.questionRepository.save(newQuestion);
        return newQuestion;
    }

    async removeAllQuestions() {
        const getAllQuestion = await this.questionRepository.find();
        getAllQuestion.forEach(e => {
            this.questionRepository.delete(e);
        });
    }

    async removeOneQuestion(question: string) {
        const deletedQuestion = await this.questionRepository.findOne(question);
        if (!deletedQuestion) {
            throw new NotFoundException('Owner is not found');
        }
        await this.questionRepository.delete(question);
        return {
            message: `Question deleted successfully`,
        };
    }

    async updateQuestion(question: string, editedQuestion: questionEntity) {
        const existingQuestion = await this.questionRepository.findOne(question);
        if (!existingQuestion) {
            throw new NotFoundException('Question is not found');
        }
        await this.questionRepository.save(existingQuestion);
        return editedQuestion;
    }
}