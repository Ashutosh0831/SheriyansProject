import { useEffect } from "react";
import "../style/extra.scss";
import { useSong } from "../hooks/useSong";

const SongBox = () => {
  const { song, songs, setSong, handleAllSong } = useSong();

  useEffect(() => {
    handleAllSong();
  }, [handleAllSong]);

  const displaySongs = songs.length ? songs : song ? [song] : [];

  return (
    <>
      <div className="songbox">
        {displaySongs.map((item) => (
          <div
            key={item?._id || item?.url || item?.title}
            role="button"
            tabIndex={0}
            onClick={() => setSong(item)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setSong(item);
              }
            }}
          >
            <img src={item?.posterUrl} alt={item?.title} />
            <h6>{item?.title}</h6>
            {/* <button>{item?.title}</button> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default SongBox;
