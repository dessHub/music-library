import { createReducer } from "@reduxjs/toolkit";
import { fetchTracks } from "./actions";

export type TrackState = {
  tracks: Track[];
  pending: boolean;
  error: boolean;
  errorMessage: string;
};

export type Album = {
  cover: string,
  cover_big: string,
  cover_medium: string,
  cover_small: string,
  cover_xl: string,
  id: number,
  md5_image: string,
  title: string,
  tracklist: string,
  type: string
}

export type Artist = {
  id: number,
  link: string, 
  name: string,
  picture: string,
  picture_big: string,
  picture_medium: string,
  picture_small: string,
  picture_xl: string,
  tracklist: string,
  type: string
}

type Track = {
  album: Album,
  artist: Artist,
  duration: number,
  explicit_content_cover: number,
  explicit_content_lyrics: number, 
  explicit_lyrics: boolean,
  id: number,
  link: string,
  md5_image: string,
  preview: string,
  rank: number,
  readable: boolean,
  title: string,
  title_short: string,
  title_version: string,
  type: string
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