import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export async function getSong({ mood }) {
  const response = await api.get("/api/songs", {
    params: { mood },
  });

  return response.data;
}

export async function allSong({mood}){

  const response = await api.get("/api/songs/all",{
    params: {mood},
  });

  return response.data;
}