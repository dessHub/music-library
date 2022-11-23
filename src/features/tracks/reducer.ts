import { createReducer } from "@reduxjs/toolkit";
import { fetchTracks } from "./actions";

export type TrackState = {
  tracks: Track[];
  pending: boolean;
  error: boolean;
  errorMessage: string;
};

type Track = {
    name: string
}


const initialState: TrackState = {
  tracks: [],
  pending: false,
  error: false,
  errorMessage: ""
};

export const trackReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchTracks.pending, (state) => {
      state.pending = true;
    })
    .addCase(fetchTracks.fulfilled, (state, { payload }) => {
      const { tracks, error } = payload;
      if (error) {
        state.pending = false;
        state.error = true;
        state.errorMessage = error.message;
      } else {
        state.tracks = tracks;
        state.pending = false;
        state.error = false;
        state.errorMessage = ''
      }
    })
});