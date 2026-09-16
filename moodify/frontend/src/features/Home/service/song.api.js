import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export async function getSong({ mood }) {
  const response = await api.get("/songs", {
    params: { mood },
  });

  return response.data;
}

export async function allSong({mood = "neutral"}){

  const response = await api.get("/songs/all",{
    params: {mood},
  });

  return response.data;
}