import { useCallback, useContext } from "react";
import { SongContext } from "../song.context";
import { getSong, allSong } from "../service/song.api";

export const useSong = () => {
  const context = useContext(SongContext);

  const { song, setSong, songs, setSongs, loading, setLoading, message, setMessage } = context;

  const handleGetSong = useCallback(
    async ({ mood }) => {
      setLoading(true);
      try{
        const data = await getSong({ mood });
      setSong(data.song || null);
      setMessage(data?.message)
      }catch(err){
        setMessage(err?.response?.data?.message)
      }finally{
        setLoading(false);
      }
    },
    [setLoading, setSong, setMessage],
  );

  const handleAllSong = useCallback(
    async ({ mood } = {}) => {
      setLoading(true);
      try{
        const data = await allSong({ mood });
      const allSongs = data?.songs || [];
      const randomSong =
        allSongs[Math.floor(Math.random() * allSongs.length)] || null;
      setSongs(allSongs);
      setSong(randomSong);
      setMessage(data?.message)
      }catch(err){
        setMessage(err?.response?.data?.message)
      }
      finally{
        setLoading(false);
      }

    },
    [setLoading, setSong, setSongs, setMessage],
  );

  return { song, songs, loading, setSong, message, handleGetSong, handleAllSong };
};
