import { createSlice } from "@reduxjs/toolkit";
import {Exam} from "../../models/exam.model";
import {getExam} from "../../services/exam.service";

export interface State {
  exam: Exam | null
}

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
export const getExamByUuid = (uuid: string) => async (dispatch) => {
  try {
    const exam = await getExam(uuid);
    return dispatch(setExam(exam.data));
  } catch (e) {
    return console.error(e.message);
  }
};