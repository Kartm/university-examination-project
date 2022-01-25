import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ui",
  initialState: {
    title: "test name",
  },
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});
export default slice.reducer;

const { updateTitle } = slice.actions;
export const updateTitleAction = (title: string) => async (dispatch) => {
  document.title = title;
  dispatch(updateTitle(title));
};
export const updateTimeLeft = (title, time_end: Date) => async (dispatch) => {
  const diff = Math.abs(time_end.getTime() - new Date().getTime());

  const minutes = Math.floor((diff/1000)/60);

  document.title = `${title} | ${minutes} minutes left`;
  dispatch(updateTitle(document.title));
};
