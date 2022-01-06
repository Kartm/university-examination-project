import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ui",
  initialState: {
    title: "test title",
  },
  reducers: {
    updateTitle: (state, action) => {
      return { ...state, title: action.payload };
    },
    //   logoutSuccess: (state, action) => {
    //     state.user = null;
    //   },
  },
});
export default slice.reducer;
// actions
const { updateTitle } = slice.actions;
export const updateTitleAction =
  ({ title }) =>
  async (dispatch) => {
    dispatch(updateTitle({ title }));
  };
// export const logout = () => async (dispatch) => {
//   try {
//     // const res = await api.post('/api/auth/logout/')
//     return dispatch(logoutSuccess());
//   } catch (e) {
//     return console.error(e.message);
//   }
// };
