import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { trackReducer } from "../features/tracks";

export const store = configureStore({
  reducer: {
    track: trackReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
