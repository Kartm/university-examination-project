import {Injectable} from "@nestjs/common";
import {TestInterface} from "../test/interfaces/test.interface";
import {ParticipantInterface} from "../participant/interfaces/participant.interface";
import {QuestionAnswerInterface} from "../questionAnswer/interfaces/questionAnswer.interface";
import {ResultInterface} from "./interfaces/result.interface";
import {TestResultsInterface} from "./interfaces/testResults.interface";
import {QuestionResultInterface} from "./interfaces/questionResult.interface";
import {QuestionAndQuestionAnswersInterface} from "./interfaces/questionAndQuestionAnswersInterface";
import {QuestionInterface} from "../question/interfaces/question.interface";
import {QuestionChoiceInterface} from "../questionChoice/interfaces/questionChoice.interface";
import {TestService} from "../test/test.service";
import {ParticipantService} from "../participant/participant.service";
import {QuestionAnswerService} from "../questionAnswer/questionAnswer.service";
import {QuestionService} from "../question/question.service";
import {QuestionChoiceService} from "../questionChoice/questionChoice.service";
import {InjectRepository} from "@nestjs/typeorm";
import {testEntity} from "../../entity/test.entity";
import {Repository} from "typeorm";
import {questionChoiceEntity} from "../../entity/questionChoice.entity";
import {participantEntity} from "../../entity/participant.entity";
import {questionEntity} from "../../entity/question.entity";
import {questionAnswerEntity} from "../../entity/questionAnswer.entity";


@Injectable()
export class ResultsService {

    constructor(
        @InjectRepository(testEntity)
        private testRepository: Repository<testEntity>,
        @InjectRepository(questionChoiceEntity)
        private questionChoiceRepository: Repository<questionChoiceEntity>,
        @InjectRepository(participantEntity)
        private participantRepository: Repository<participantEntity>,
        @InjectRepository(questionAnswerEntity)
        private questionAnswerRepository: Repository<questionAnswerEntity>,
    ) {
    }

    async getResults(testId: string) {
        const test = await this.testRepository.findOne(testId);
        const participants = await this.participantRepository.find(test);

        const testResult: TestResultsInterface = {test: test, results: []};

        for (const participant of participants) {
            this.createResult(participant)
                .then(result => testResult.results.push(result));
        }

        return testResult;
    }

    private async createResult(participant: ParticipantInterface) {
        const questionAnswers = await this.getQuestionsAnswersWithParticipantId(participant)


        const result: ResultInterface = {participant: participant, questionResults: []};

        const questionAndQuestionAnswers: QuestionAndQuestionAnswersInterface[] = [];

        // This loop is filling up questionAndQuestionAnswers
        for (const questionAnswer of questionAnswers) {
            const question = questionAnswer.questionChoice.question
            // check if this question is added already, if yes put the answer there
            let added = false;

            questionAndQuestionAnswers.forEach(element => {
                if (element.question.question_id === question.question_id) {
                    added = true;
                    element.questionAnswers.push(questionAnswer)
                }
            })

            // If it's the first time adding this question, add it and create one element array with questionAnswer
            if (!added) {
                const questionAndAnswer: QuestionAndQuestionAnswersInterface = {
                    question: question,
                    questionAnswers: [questionAnswer]
                }
                questionAndQuestionAnswers.push(questionAndAnswer)
            }

        }

        // Fill questionResults array with questionResults
        questionAndQuestionAnswers.forEach(questionAndQuestionAnswer => {
            this.createQuestionResult(questionAndQuestionAnswer)
                .then(questionResult => {
                    result.questionResults.push(questionResult)
                })
        })

        return result

    }

    private async createQuestionResult(questionAndQuestionAnswer: QuestionAndQuestionAnswersInterface) {
        const question = questionAndQuestionAnswer.question;

        // TODO add text to question interface
        const questionText = "question.text";

        const answerTexts = questionAndQuestionAnswer.questionAnswers.map(questionAnswer => questionAnswer.answer_text)

        const allQuestionChoices = await this.getQuestionChoicesFromDatabase(question);

        const correctQuestionChoices = allQuestionChoices.filter(questionChoice => questionChoice.is_correct)

        const answeredQuestionChoices = questionAndQuestionAnswer.questionAnswers.map(questionAnswer => questionAnswer.questionChoice)

        // TODO Implement checking a text question
        // check if for every correct question choice, there is an answer
        const correct = correctQuestionChoices.every(correctQuestionChoice =>
            !answeredQuestionChoices.every(questionChoice =>
                questionChoice.questionChoice_id === correctQuestionChoice.questionChoice_id)
        )


        let points = 0;
        if (correct) {
            points = 1;
        }

        return {
            questionText: questionText,
            answerTexts: answerTexts,
            points: points
        };
    }


    private async getQuestionsAnswersWithParticipantId(participant: ParticipantInterface) {
        return this.questionAnswerRepository.find( {where : {participant : participant}});
    }


    private async getQuestionChoicesFromDatabase(question: QuestionInterface) {
        return await this.questionChoiceRepository.find({where: {question: question, is_correct: true}});
    }
}