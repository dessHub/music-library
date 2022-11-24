import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { artistReducer } from "../features/artists";
import { trackReducer } from "../features/tracks";

export const store = configureStore({
  reducer: {
    track: trackReducer,
    artist: artistReducer
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
