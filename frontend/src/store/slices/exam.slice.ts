import { createSlice } from "@reduxjs/toolkit";
import {
  Exam, LocalExam,
  LocalQuestion, LocalQuestionAnswer, Participant,
  ParticipantDraft,
  Question, QuestionChoice,
  Settings
} from "../../models/exam.model";
import {
  apiCreateExam, apiGetParticipantByLinkUuid, apiGetExamResults,
  apiPublishExam, apiSendParticipantAnswers, apiUpdateExamParticipants, apiUpdateExamQuestions, apiUpdateExamSettings,
  getExam
} from "../../services/exam.service";

export interface State {
  exam: LocalExam | null,
  participant: Participant | null,
  examResults: ExamResults | null,
}

export interface UpdateExamSettings {
  test_id: string;
  name: string;
  owner_name: string;
  owner_email: string;
  time_start: string;
  time_end: string;
  settings: Settings;
}

export interface UpdateExamParticipants {
  participants: ParticipantDraft[];
}

export interface UpdateExamQuestions {
  questions: LocalQuestion[];
  testId: string;
}

export interface ExamSpecificResult {
  participant: Participant,
  questionResults: {
    answerTexts: string[],
    points: number,
    questionText: string;
  }[]
}

export interface ExamResults {
  results: ExamSpecificResult[],
  test: Exam
}

export const questionToLocalQuestion = (q: Question, questionChoices: QuestionChoice[]): LocalQuestion => (
  {
    question_id: q.question_id,
    name: q.name,
    question_type: q.question_type,
    question_choices: questionChoices.filter(qc => qc.question_id === q.question_id),
  }
)

const slice = createSlice({
  name: "exam",
  initialState: {
    exam: null,
    participant: null,
    examResults: null,
  } as State,
  reducers: {
    setExam: (state, action) => {
      state.exam = action.payload;
    },
    setParticipant: (state, action) => {
      state.participant = action.payload;
    },
    setExamResults: (state, action) => {
      state.examResults = action.payload;
    },
  },
});
export default slice.reducer;

const { setExam, setParticipant, setExamResults} = slice.actions;
export const createExam = () => async (dispatch) => {
  try {
    const exam = await apiCreateExam();
    return dispatch(setExam(exam.data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const getExamByUuid = (uuid: string) => async (dispatch) => {
  try {
    const exam = await getExam(uuid);
    return dispatch(setExam(exam.data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const getParticipantByLinkUuid = (uuid: string) => async (dispatch) => {
  try {
    const participant = await apiGetParticipantByLinkUuid(uuid);
    return dispatch(setParticipant(participant.data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const publishExam = (test_id: string) => async (dispatch) => {
  try {
    const response = await apiPublishExam(test_id);
    console.log(response)
    return true;
    // return dispatch(setExam(publishedExam.data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const updateExamSettings = (update: UpdateExamSettings) => async (dispatch) => {
  try {
    const exam = await apiUpdateExamSettings(update);
    return dispatch(setExam(exam.data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const updateExamParticipants = (update: UpdateExamParticipants) => async (dispatch) => {
  try {
    await apiUpdateExamParticipants(update);
    return true;
  } catch (e) {
    return console.error(e.message);
  }
};
export const sendQuestionAnswers = (questionAnswers: LocalQuestionAnswer[], participant_uuid: string) => async (dispatch) => {
  try {
    await apiSendParticipantAnswers(questionAnswers, participant_uuid);
    return true;
  } catch (e) {
    return console.error(e.message);
  }
};
export const updateExamQuestions = (update: UpdateExamQuestions) => async (dispatch) => {
  try {
    await apiUpdateExamQuestions(update);
    return true;
  } catch (e) {
    return console.error(e.message);
  }
};
export const getExamResults = (test_id: string) => async (dispatch) => {
  try {
    const results = await apiGetExamResults(test_id);
    return dispatch(setExamResults(results.data));
  } catch (e) {
    return console.error(e.message);
  }
};