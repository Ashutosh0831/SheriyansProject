import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/ashu05/moodify/songs/Haareya_Song___Meri_Pyaari_Bindu___Ayushmann__Parineeti___Arijit_Singh___Sachin-Jigar__Priya_Saraiya_lakGgD8oN.mp3",
    posterUrl:
      "https://ik.imagekit.io/ashu05/moodify/poster/Haareya_Song___Meri_Pyaari_Bindu___Ayushmann__Parineeti___Arijit_Singh___Sachin-Jigar__Priya_Saraiya_0fMa7b_QR.jpeg",
    title:
      "Haareya Song | Meri Pyaari Bindu | Ayushmann, Parineeti | Arijit Singh…",
    mood: "happy",
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
