import { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import "../style/player.scss";

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
};

const Player = () => {
  const { song } = useSong();
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = song?.url || "";
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [song?.url]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !song?.url) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Play failed:", error);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const skipTime = (amount) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.min(
      Math.max(audio.currentTime + amount, 0),
      audio.duration || 0,
    );
    setCurrentTime(audio.currentTime);
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextTime = Number(event.target.value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleVolumeChange = (event) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      setIsMuted(false);
      audio.volume = volume || 0.8;
      return;
    }

    setIsMuted(true);
    audio.volume = 0;
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration || 0);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="player-card">
      <audio
        ref={audioRef}
        src={song?.url || ""}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="player-header">
        <img
          src={
            song?.posterUrl || "https://via.placeholder.com/80x80?text=Music"
          }
          alt={song?.title || "Song cover"}
          className="player-cover"
        />

        <div className="player-meta">
          <div className="player-title">
            {song?.title || "No song selected"}
          </div>
          <div className="player-mood">
            {song?.mood ? song.mood.toUpperCase() : "MOOD"}
          </div>
        </div>
      </div>

      <div className="player-progress-wrap">
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          className="player-progress"
        />
        <div className="player-time-row">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-controls">
        <button
          type="button"
          onClick={() => skipTime(-10)}
          className="player-btn"
          aria-label="Backward 10 seconds"
        >
          ⏪ 10s
        </button>

        <button
          type="button"
          onClick={togglePlay}
          className="player-btn player-btn--play"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>

        <button
          type="button"
          onClick={() => skipTime(10)}
          className="player-btn"
          aria-label="Forward 10 seconds"
        >
          10s ⏩
        </button>
      </div>

      <div className="player-volume-row">
        <button
          type="button"
          onClick={toggleMute}
          className="player-btn player-btn--small"
          aria-label="Mute or unmute"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="player-volume"
          aria-label="Volume"
        />

        <span className="player-volume-label">
          {Math.round((isMuted ? 0 : volume) * 100)}%
        </span>
      </div>
    </div>
  );
};

export default Player;
