import { createSlice } from "@reduxjs/toolkit";
import {
  Exam,
  ExamDraft,
  LocalQuestion,
  ParticipantDraft,
  Question,
  QuestionType,
  Settings
} from "../../models/exam.model";
import {
  apiCreateExam,
  apiGetExamTemplates, apiGetQuestionTypes,
  apiPublishExam, apiUpdateExamParticipants, apiUpdateExamQuestions, apiUpdateExamSettings,
  apiUseExamTemplate,
  getExam
} from "../../services/exam.service";

export interface State {
  exam: Exam | null,
  examTemplates: ExamDraft[],
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
}

export const questionToLocalQuestion = (q: Question, questionTypes: QuestionType[]): LocalQuestion => (
  {
    id: q.id,
    name: q.name,
    question_type: questionTypes.find(qt => qt.id === q.question_type_id)!,
    question_choices: [], // todo
  }
)

const slice = createSlice({
  name: "exam",
  initialState: {
    exam: null,
    examTemplates: [],
    questionTypes: [],
  } as State,
  reducers: {
    setExam: (state, action) => {
      state.exam = action.payload;
    },
    setExamTemplates: (state, action) => {
      state.examTemplates = action.payload;
    },
    setQuestionTypes: (state, action) => {
      state.questionTypes = action.payload;
    },
  },
});
export default slice.reducer;

const { setExam, setExamTemplates, setQuestionTypes} = slice.actions;
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
export const getExamTemplates = () => async (dispatch) => {
  try {
    const exam = await apiGetExamTemplates();
    return dispatch(setExamTemplates(exam.data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const useExamTemplate = (examTemplate: ExamDraft) => async (dispatch) => {
  try {
    const exam = await apiUseExamTemplate(examTemplate);
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