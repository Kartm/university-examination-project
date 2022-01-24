import { createSlice } from "@reduxjs/toolkit";
import {
  Exam, LocalExam,
  LocalQuestion,
  ParticipantDraft,
  Question, QuestionChoice,
  Settings
} from "../../models/exam.model";
import {
  apiCreateExam,
  apiPublishExam, apiUpdateExamParticipants, apiUpdateExamQuestions, apiUpdateExamSettings,
  getExam
} from "../../services/exam.service";

export interface State {
  exam: LocalExam | null,
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

export const questionToLocalQuestion = (q: Question, questionChoices: QuestionChoice[]): LocalQuestion => (
  {
    id: q.id,
    name: q.name,
    question_type: q.question_type,
    question_choices: questionChoices.filter(qc => qc.question_id === q.id),
  }
)

const slice = createSlice({
  name: "exam",
  initialState: {
    exam: null,
  } as State,
  reducers: {
    setExam: (state, action) => {
      state.exam = action.payload;
    },
  },
});
export default slice.reducer;

const { setExam } = slice.actions;
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
export const publishExam = (exam: Exam) => async (dispatch) => {
  try {
    const publishedExam = await apiPublishExam(exam);
    return dispatch(setExam(publishedExam.data));
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
export const updateExamQuestions = (update: UpdateExamQuestions) => async (dispatch) => {
  try {
    await apiUpdateExamQuestions(update);
    return true;
  } catch (e) {
    return console.error(e.message);
  }
};