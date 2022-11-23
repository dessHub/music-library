import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../../service/ApiService";

type Payload = {
    params: string
}


export const fetchTracks = createAsyncThunk(
    "tracks/fetchTracks",
    async (payload: Payload) => {
      const response = await ApiService.get(`/tracks?${payload.params}`)
        .then((res) => {
          return {tracks: res.data};
        })
        .catch((error) => {
          console.log('err', error)
          return error;
        });
  
      return response;
    }
  );