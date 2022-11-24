import { RootState } from "../../app/store";
import { createSelector } from "@reduxjs/toolkit";

export const getArtist = (state: RootState) => state.artist;

export const artistSelector = createSelector(getArtist, (state) => state);
