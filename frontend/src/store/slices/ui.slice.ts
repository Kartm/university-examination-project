import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ui",
  initialState: {
    title: "test title",
  },
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    //   logoutSuccess: (state, action) => {
    //     state.user = null;
    //   },
  },
});
export default slice.reducer;
// actions
const { updateTitle } = slice.actions;
export const updateTitleAction = (title: string) => async (dispatch) => {
  document.title = title;
  dispatch(updateTitle(title));
};
// export const logout = () => async (dispatch) => {
//   try {
//     // const res = await api.post('/api/auth/logout/')
//     return dispatch(logoutSuccess());
//   } catch (e) {
//     return console.error(e.message);
//   }
// };
