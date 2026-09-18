import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "No song",
    posterUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7lD1O7OQM6zEGxbnzaNAevYujcVv0M0n9CFFQl4iylA&s=10",
    title:
      "No Song",
    mood: "MOOD",
  });
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider
      value={{ song, setSong, songs, setSongs, loading, setLoading }}
    >
      {children}
    </SongContext.Provider>
  );
};
