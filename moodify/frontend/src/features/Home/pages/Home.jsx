import FaceExpress from "../../Expression/pages/FaceExpress";
import Header from "../components/Header";
import Player from "../components/Player";
import SongBox from "../components/SongBox";
import { useSong } from "../hooks/useSong";

const Home = () => {
  const { handleGetSong } = useSong();

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="songbox-container">
          <SongBox />
        </div>
        <FaceExpress onClick={(mood) => handleGetSong({ mood })} />
        <Player />
      </div>
    </>
  );
};

export default Home;
