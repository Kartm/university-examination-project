import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ui from "./slices/ui.slice";

const reducer = combineReducers({
  ui,
});

const store = configureStore({
  reducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
