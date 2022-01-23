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


@Injectable()
export class ResultsService {

    getResults(testId: string) {
        const test = this.getTestFromDatabase(testId);
        const participants: ParticipantInterface[] = this.getParticipantsFromTest(testId);

        const testResult: TestResultsInterface = {test: test, results: []};

        participants.forEach(participant => {
            const result = this.createResult(participant);
            testResult.results.push(result);
        })

        return testResult;
    }

    private createResult(participant: ParticipantInterface): ResultInterface {
        const questionAnswers: QuestionAnswerInterface[] = this.getQuestionsAnswersWithParticipantId(participant.id)


        const result: ResultInterface = {participant: participant, questionResults: []};

        const questionAndQuestionAnswers: QuestionAndQuestionAnswersInterface[] = [];

        // This loop is filling up questionAndQuestionAnswers
        questionAnswers.forEach(questionAnswer => {
            // Get the question that the answer is answering
            const questionChoiceId = questionAnswer.question_choice_id;
            const questionChoice = this.getQuestionChoiceFromDatabase(questionChoiceId)
            const question = this.getQuestionFromDatabase(questionChoice.question_id);

            // check if this question is added already, if yes put the answer there
            let added = false;

            questionAndQuestionAnswers.forEach(element => {
                if (element.question.id === question.id) {
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

        })

        // Fill questionResults array with questionResults
        questionAndQuestionAnswers.forEach(questionAndQuestionAnswer => {
            const questionResult = this.createQuestionResult(questionAndQuestionAnswer)
            result.questionResults.push(questionResult)
        })

        return result

    }

    private createQuestionResult(questionAndQuestionAnswer: QuestionAndQuestionAnswersInterface): QuestionResultInterface {
        const question = questionAndQuestionAnswer.question;

        // TODO add text to question interface
        const questionText = "question.text";

        const answerTexts = questionAndQuestionAnswer.questionAnswers.map(questionAnswer => questionAnswer.answer_text)

        const allQuestionChoices = this.getQuestionChoicesFromDatabase(question.id);

        const correctQuestionChoices = allQuestionChoices.filter(questionChoice => questionChoice.is_correct)

        const answeredQuestionChoices = questionAndQuestionAnswer.questionAnswers.map(questionAnswer => {
            return this.getQuestionChoiceFromDatabase(questionAnswer.question_choice_id);
        })

        // TODO Implement checking a text question
        // check if for every correct question choice, there is an answer
        const correct = correctQuestionChoices.every(correctQuestionChoice =>
            !answeredQuestionChoices.every(questionChoice =>
                questionChoice.id === correctQuestionChoice.id)
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


    private getTestFromDatabase(testId: string): TestInterface {
        return TestService.getOneTestWithoutIs(testId);
    }

    private getParticipantsFromTest(testId: string): ParticipantInterface[] {
       const participants = ParticipantService.getAllParticipants();
       return participants.filter(participant => participant.test_id === testId)
    }

    private getQuestionsAnswersWithParticipantId(participantId: string): QuestionAnswerInterface[] {
        const allQuestionAnswers = QuestionAnswerService.getAllQuestions();
        return allQuestionAnswers.filter(questionAnswer => questionAnswer.participant_id === participantId);
    }


    private getQuestionChoiceFromDatabase(questionChoiceId: string): QuestionChoiceInterface {
        return QuestionAnswerService.getOneQuestionAnswer(questionChoiceId);
    }

    private getQuestionFromDatabase(questionId: string): QuestionInterface {
        return QuestionService.getOneQuestion(questionId)
    }


    private getQuestionChoicesFromDatabase(question_id: string): QuestionChoiceInterface[] {
        const allQuestionChoices = QuestionChoiceService.getAllQuestionChoice();
        return allQuestionChoices.filter(questionChoice => questionChoice.question_id === question_id)
    }
}