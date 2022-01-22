import {ParticipantInterface} from "../../participant/interfaces/participant.interface";
import {QuestionResultInterface} from "./questionResult.interface";

export interface ResultInterface {
    participant: ParticipantInterface,
    questionResults: QuestionResultInterface[],
}