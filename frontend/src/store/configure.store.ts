import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ui from "./slices/ui.slice";
import exam from "./slices/exam.slice";

const reducer = combineReducers({
  ui,
  exam,
});

const store = configureStore({
  reducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
