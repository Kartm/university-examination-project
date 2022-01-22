import {ParticipantInterface} from "../../participant/interfaces/participant.interface";
import {QuestionResult} from "./questionResult.interface";

export interface ResultInterface {
    participant: ParticipantInterface,
    questionResults: QuestionResult[],
}