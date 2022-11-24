import { createReducer } from "@reduxjs/toolkit";
import { Album } from "../tracks";
import { fetchArtist } from "./actions";

export type ArtistState = {
  artist: Artist | null;
  pending: boolean;
  error: boolean;
  errorMessage: string;
};

export type Tracklist = {
  id: number,
  title: string,
  duration: number,
  [key: string]: unknown
}

export type Artist = {
  id: number,
  link: string, 
  name: string,
  nb_fan?: number,
  picture: string,
  picture_big: string,
  picture_medium: string,
  picture_small: string,
  picture_xl: string,
  tracklist: Tracklist[],
  type: string,
  albums: Album[]
}


const initialState: ArtistState = {
  artist: null,
  pending: false,
  error: false,
  errorMessage: ""
};

export const artistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchArtist.pending, (state) => {
      state.pending = true;
    })
    .addCase(fetchArtist.fulfilled, (state, { payload }) => {
      const { artist, error } = payload;
      if (error) {
        state.pending = false;
        state.error = true;
        state.errorMessage = error.message;
      } else {
        state.artist = artist;
        state.pending = false;
        state.error = false;
        state.errorMessage = ''
      }
    })
});