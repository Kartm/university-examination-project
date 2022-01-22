import {Injectable, NotImplementedException} from "@nestjs/common";
import {TestInterface} from "../test/interfaces/test.interface";
import {ParticipantInterface} from "../participant/interfaces/participant.interface";
import {QuestionAnswerInterface} from "../questionAnswer/interfaces/questionAnswer.interface";
import {ResultInterface} from "./interfaces/result.interface";
import {TestResultsInterface} from "./interfaces/testResults.interface";
import {QuestionResultInterface} from "./interfaces/questionResult.interface";
import {QuestionAndQuestionAnswersInterface} from "./interfaces/questionAndQuestionAnswersInterface";
import {QuestionInterface} from "../question/interfaces/question.interface";
import {QuestionChoiceInterface} from "../questionChoice/interfaces/questionChoice.interface";



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

    createResult(participant: ParticipantInterface) : ResultInterface {
        const questionAnswers: QuestionAnswerInterface[] = this.getQuestionsAnswersWithParticipantId(participant.id)


        const result: ResultInterface = {participant: participant, questionResults: []};

        const questionAndQuestionAnswers : QuestionAndQuestionAnswersInterface[] = [];

        // This loop is filling up questionAndQuestionAnswers
        questionAnswers.forEach(questionAnswer => {
            // Get the question that the answer is answering
            const questionChoiceId = questionAnswer.question_choice_id;
            const questionChoice = this.getQuestionChoiceFromDatabase(questionChoiceId)
            const question = this.getQuestionFromDatabase(questionChoice.question_id);

            // check if this question is added already, if yes put the answer there
            let added = false;

            questionAndQuestionAnswers.forEach(element => {
                if(element.question.id === question.id)
                {
                    added = true;
                    element.questionAnswers.push(questionAnswer)
                }
            })

            // If it's the first time adding this question, add it and create one element array with questionAnswer
            if(!added)
            {
                const questionAndAnswer : QuestionAndQuestionAnswersInterface = {question : question, questionAnswers : [questionAnswer]}
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

    private createQuestionResult(questionAndQuestionAnswer: QuestionAndQuestionAnswersInterface) : QuestionResultInterface {
        const question = questionAndQuestionAnswer.question;

        // TODO add text to question interface
        const questionText = "question.text";

        const questionTexts = questionAndQuestionAnswer.questionAnswers.map(questionAnswer => questionAnswer.answer_text)



    }







    private getTestFromDatabase(testId: string) : TestInterface {
        // TODO
        throw new NotImplementedException();
    }

    private getParticipantsFromTest(testId: string) : ParticipantInterface[] {
        // TODO
        throw new NotImplementedException()
    }

    private getQuestionsAnswersWithParticipantId(participantId : string) : QuestionAnswerInterface[]
    {
        // TODO
        throw new NotImplementedException()
    }


    private getQuestionChoiceFromDatabase(questionChoiceId: string) : QuestionChoiceInterface {
        // TODO
        throw new NotImplementedException()
    }

    private getQuestionFromDatabase(question_id: string) : QuestionInterface {
        // TODO
        throw new NotImplementedException()
    }


}