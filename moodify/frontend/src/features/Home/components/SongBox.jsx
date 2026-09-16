import { useEffect } from "react";
import "../style/extra.scss";
import { useSong } from "../hooks/useSong";

const SongBox = () => {
  const { song, songs, handleAllSong } = useSong();

  useEffect(() => {
    handleAllSong({ mood: "neutral" });
  }, []);

  const displaySongs = songs.length ? songs : song ? [song] : [];

  return (
    <>
      <div className="songbox">
        {displaySongs.map((item) => (
          <div key={item?._id || item?.url || item?.title}>
            <img src={item?.posterUrl} alt={item?.title} />
            <h6>{item?.title}</h6>
          </div>
        ))}
      </div>
    </>
  );
};

export default SongBox
