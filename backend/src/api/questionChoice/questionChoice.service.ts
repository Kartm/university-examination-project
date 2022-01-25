import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {questionChoiceEntity} from "../../entity/questionChoice.entity";
import {questionEntity} from "../../entity/question.entity";

@Injectable()
export class QuestionChoiceService
{
    constructor(
        @InjectRepository(questionChoiceEntity)
        private repository: Repository<questionChoiceEntity>,
        @InjectRepository(questionEntity)
        private questionRepository: Repository<questionEntity>,
    ) {}

    getAllQuestionChoice() {
        return this.repository.find();
    }

    async getQuestionChoiceForAnswerText(question_id: string, answer_text: string): Promise<questionChoiceEntity> {
        const question = await this.questionRepository.findOne({where: {question_id: question_id}})

        const existingQuestionChoices = await this.repository.find({where: {question: question}})

        const existingQuestionChoiceForAnswerText = existingQuestionChoices.find(qc => qc.text === answer_text)

        console.log(question)
        console.log(existingQuestionChoices)

        if(existingQuestionChoiceForAnswerText) {
            return existingQuestionChoiceForAnswerText;
        }

        const newQuestionChoiceEntity: Omit<Omit<questionChoiceEntity, 'questionChoice_id'>, 'question'> = {
            question_id,
            text: answer_text,
            is_correct: false,
        }

        const saved = await this.repository.save(newQuestionChoiceEntity)

        return this.repository.findOne(saved)
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