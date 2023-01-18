import { configureStore } from "@reduxjs/toolkit";
import dataStoreReducer from "../features/dataStore/dataStoreSlice";

export const store = configureStore({
  reducer: {
    savedData: dataStoreReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;