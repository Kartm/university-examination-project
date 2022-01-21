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
