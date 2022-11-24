import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../../service/ApiService";

type Payload = {
    id: string | number
}


export const fetchArtist = createAsyncThunk(
    "artist/fetchArtist",
    async (payload: Payload) => {
      const response = await ApiService.get(`/artists/${payload.id}`)
        .then((res) => {
          return {artist: res.data};
        })
        .catch((error) => {
          console.log('err==', error)
          return error;
        });
  
      return response;
    }
  );