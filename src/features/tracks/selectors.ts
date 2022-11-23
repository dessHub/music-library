import { RootState } from "../../app/store";
import { createSelector } from "@reduxjs/toolkit";

export const getTracks = (state: RootState) => state.track;

export const bikeSelector = createSelector(getTracks, (state) => state);
