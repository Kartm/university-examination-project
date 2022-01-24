import {Injectable} from "@nestjs/common";
import {CommonApi} from "../../APIHelpers/CommonApi";
import {QuestionAnswerInterface} from "./interfaces/questionAnswer.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {testEntity} from "../../entity/test.entity";
import {Repository} from "typeorm";
import {questionAnswerEntity} from "../../entity/questionAnswer.entity";

@Injectable()
export class QuestionAnswerService
{
    constructor(
        @InjectRepository(questionAnswerEntity)
        private repository: Repository<questionAnswerEntity>,
    ) {}

     async getAllQuestions() {
         return await this.repository.find();
     }

     async getOneQuestionAnswer(id: string) {
         return await this.repository.findOne(id);
     }

     addQuestionAnswer(questionAnswer: questionAnswerEntity) {
        return this.repository.save(questionAnswer)
    }

     async removeAllQuestionAnswer() {
         this.repository.find()
             .then(test => {
                 this.repository.remove(test);
             });
     }

     removeOneQuestionAnswer(id: string) {
        return this.repository.delete(id);
    }

     async updateQuestionAnswer(id: string, newQuestionAnswer: questionAnswerEntity) {
         return this.repository.update(id, newQuestionAnswer);
     }
}