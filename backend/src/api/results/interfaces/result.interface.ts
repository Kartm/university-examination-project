import {QuestionResultInterface} from "./questionResult.interface";
import {participantEntity} from "../../../entity/participant.entity";

export interface ResultInterface {
    participant: participantEntity,
    questionResults: QuestionResultInterface[],
}