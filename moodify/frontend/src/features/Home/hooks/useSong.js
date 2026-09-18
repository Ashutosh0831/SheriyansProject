import { useCallback, useContext } from "react";
import { SongContext } from "../song.context";
import { getSong, allSong } from "../service/song.api";

export const useSong = () => {
  const context = useContext(SongContext);

  const { song, setSong, songs, setSongs, loading, setLoading } = context;

  const handleGetSong = useCallback(
    async ({ mood }) => {
      setLoading(true);
      const data = await getSong({ mood });
      setSong(data.song || null);
      setLoading(false);
    },
    [setLoading, setSong],
  );

  const handleAllSong = useCallback(
    async ({ mood } = {}) => {
      setLoading(true);
      const data = await allSong({ mood });
      const allSongs = data?.songs || [];
      const randomSong =
        allSongs[Math.floor(Math.random() * allSongs.length)] || null;
      setSongs(allSongs);
      setSong(randomSong);
      setLoading(false);
    },
    [setLoading, setSong, setSongs],
  );

  return { song, songs, loading, setSong, handleGetSong, handleAllSong };
};
