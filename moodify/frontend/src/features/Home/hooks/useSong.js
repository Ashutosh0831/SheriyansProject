import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSong, allSong } from "../service/song.api";

export const useSong = () => {
  const context = useContext(SongContext);

  const { song, setSong, songs, setSongs, loading, setLoading } = context;

  async function handleGetSong({ mood }) {
    setLoading(true);
    const data = await getSong({ mood });
    setSong(data.song || null);
    setLoading(false);
  }

  async function handleAllSong({ mood = "neutral" } = {}) {
    setLoading(true);
    const data = await allSong({ mood });
    const allSongs = data?.songs || [];
    setSongs(allSongs);
    setSong(allSongs[0] || null);
    setLoading(false);
  }

  return { song, songs, loading, handleGetSong, handleAllSong };
};
