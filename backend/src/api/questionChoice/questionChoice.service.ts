import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {questionChoiceEntity} from "../../entity/questionChoice.entity";

@Injectable()
export class QuestionChoiceService
{
    constructor(
        @InjectRepository(questionChoiceEntity)
        private repository: Repository<questionChoiceEntity>,
    ) {}

    getAllQuestionChoice() {
        return this.repository.find();
    }

    getOneQuestionChoice(id: string) {
        return this.repository.findOne(id)
    }

    addQuestionChoice(questionChoice: questionChoiceEntity) {
        return this.repository.save(questionChoice)
    }

    deleteAllQuestionChoices() {
        this.repository.find().then(questionChoice => this.repository.remove(questionChoice))
    }

    deleteOneQuestionChoice(id: string) {
        return this.repository.delete(id);
    }

    updateQuestionChoice(id: string, newQuestionChoice: questionChoiceEntity) {
       return this.repository.update(id, newQuestionChoice)
    }
}