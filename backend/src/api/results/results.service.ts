import {Injectable} from "@nestjs/common";
import {TestInterface} from "../test/interfaces/test.interface";
import {ParticipantInterface} from "../participant/interfaces/participant.interface";
import {QuestionAnswerInterface} from "../questionAnswer/interfaces/questionAnswer.interface";
import {ResultInterface} from "./interfaces/result.interface";
import {TestResultsInterface} from "./interfaces/testResults.interface";
import {QuestionResultInterface} from "./interfaces/questionResult.interface";

@Injectable()
export class ResultsService
{

    getResults(testId: string) {
        const test : TestInterface = getTestFromDatabase(testId);
        const participants : ParticipantInterface[] = getParticipantFromTest(testId);

        let testResult : TestResultsInterface;
        testResult.test = test;

        participants.map(participant => {
            const result = this.createResult(participant);
            testResult.results.push(result);
        })

        return testResult;
    }

    createResult(participant : ParticipantInterface)
    {
        const questionAnswers : QuestionAnswerInterface[] = getQuestionAnswers(participant.id)

        // let result : ResultInterface;
        // result.questionResults = [];

        const result : ResultInterface = {participant : participant, questionResults : []};

        questionAnswers.map(questionAnswer => {

        })

        return result;
1    }

    createQuestionResult(questionAnswers : QuestionAnswerInterface[])
    {
        let questionResult : QuestionResultInterface;

        questionAnswers.map(questionAnswer => {
            const text =
        })
    }

}