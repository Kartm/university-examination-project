import { createSlice } from "@reduxjs/toolkit";
import {
  Exam,
  LocalQuestion,
  ParticipantDraft,
  Question, QuestionChoice,
  QuestionType,
  Settings
} from "../../models/exam.model";
import {
  apiCreateExam,
  apiGetQuestionTypes,
  apiPublishExam, apiUpdateExamParticipants, apiUpdateExamQuestions, apiUpdateExamSettings,
  getExam
} from "../../services/exam.service";

export interface State {
  exam: Exam | null,
  questionTypes: QuestionType[];
}

export interface UpdateExamSettings {
  id: string;
  name: string;
  owner_name: string;
  settings: Settings;
}

export interface UpdateExamParticipants {
  participants: ParticipantDraft[];
}

export interface UpdateExamQuestions {
  questions: LocalQuestion[];
  testId: string;
}

export const questionToLocalQuestion = (q: Question, questionChoices: QuestionChoice[], questionTypes: QuestionType[]): LocalQuestion => (
  {
    id: q.id,
    name: q.name,
    question_type: questionTypes.find(qt => qt.id === q.question_type_id)!,
    question_choices: questionChoices.filter(qc => qc.question_id === q.id),
  }
)

const slice = createSlice({
  name: "exam",
  initialState: {
    exam: null,
    questionTypes: [],
  } as State,
  reducers: {
    setExam: (state, action) => {
      state.exam = action.payload;
    },
    setQuestionTypes: (state, action) => {
      state.questionTypes = action.payload;
    },
  },
});
export default slice.reducer;

const { setExam, setQuestionTypes} = slice.actions;
export const createExam = () => async (dispatch) => {
  try {
    const exam = await apiCreateExam();
    return dispatch(setExam(exam.data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const getExamByUuid = (uuid: string, questionTypes: QuestionType[]) => async (dispatch) => {
  try {
    const exam = await getExam(uuid, questionTypes);
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
export const getQuestionTypes = () => async (dispatch) => {
  try {
    const questionTypes = await apiGetQuestionTypes();
    return dispatch(setQuestionTypes(questionTypes.data));
  } catch (e) {
    return console.error(e.message);
  }
};