import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {testEntity} from "../../entity/test.entity";
import {Repository} from "typeorm";
import {questionChoiceEntity} from "../../entity/questionChoice.entity";
import {participantEntity} from "../../entity/participant.entity";
import {questionAnswerEntity} from "../../entity/questionAnswer.entity";
import {ResultInterface} from "./interfaces/result.interface";
import {QuestionAndQuestionAnswersInterface} from "./interfaces/questionAndQuestionAnswersInterface";
import {questionEntity, QuestionTypeEnum} from "../../entity/question.entity";
import {TestResultsInterface} from "./interfaces/testResults.interface";


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
        const participants = await this.participantRepository.find({where : {test : test}});

        const testResult: TestResultsInterface = {test: test, results: []};

        for (const participant of participants) {
            await this.createResult(participant)
                .then(result => {
                    // console.log(result)
                    testResult.results.push(result)
                });
        }

        return testResult;
    }

    private async createResult(participant: participantEntity) {
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

            // console.log(questionAndQuestionAnswers)
        }

        // Fill questionResults array with questionResults
        for (const questionAndQuestionAnswer of questionAndQuestionAnswers) {
            await this.createQuestionResult(questionAndQuestionAnswer)
                .then(questionResult => {
                    result.questionResults.push(questionResult)
                })
        }

        return result

    }

    private async createQuestionResult(questionAndQuestionAnswer: QuestionAndQuestionAnswersInterface) {
        const question = questionAndQuestionAnswer.question;

        const answerTexts = questionAndQuestionAnswer.questionAnswers.map(questionAnswer => questionAnswer.answer_text)

        const answeredQuestionChoices = questionAndQuestionAnswer.questionAnswers.map(questionAnswer => questionAnswer.questionChoice)

        const allCorrectQuestionChoices = (await this.getQuestionChoicesFromDatabase(question)).filter(questionChoice => questionChoice.is_correct);

        // TODO Implement checking a text question

        let scoreForQuestion = 0

        if(question.question_type === QuestionTypeEnum.MULTI_CHOICE) {
            // participant must select all available correct question choices
            const allQuestionChoicesCorrect = answeredQuestionChoices.every(qc => allCorrectQuestionChoices.includes(qc))

            if(allQuestionChoicesCorrect) {
                scoreForQuestion += question.points
            }
        } else {
            const anyQuestionChoicesCorrect = answeredQuestionChoices.some(qc => qc.is_correct)

            if(anyQuestionChoicesCorrect) {
                scoreForQuestion += question.points
            }
        }

        return {
            questionText: question.name,
            answerTexts: answerTexts,
            points: scoreForQuestion
        };
    }


    private async getQuestionsAnswersWithParticipantId(participant: participantEntity) {
        return this.questionAnswerRepository.find( {where : {participant : participant}});
    }


    private async getQuestionChoicesFromDatabase(question: questionEntity) {
        return await this.questionChoiceRepository.find({where: {question: question, is_correct: true}});
    }
}