import React from "react";
import Seeker from "./Seeker";
import { play, pause, playback, previous, playfront, sound } from "../assets";

const Player = ({
  selectedSong,
  selectedSongIdx,
  setSelectedSongIdx,
  songs,
  isPlaying,
  playPauseHandler,
  audio,
}) => {
  const prevSongHandler = () => {
    if (selectedSongIdx > 0) {
      setSelectedSongIdx(selectedSongIdx - 1);
    }
  };
  const nextSongHandler = () => {
    if (selectedSongIdx < songs.length - 1) {
      setSelectedSongIdx(selectedSongIdx + 1);
    }
  };

  return (
    <div className="flex-2 ms-36">
      <div className="flex flex-col items-start pt-5 gap-10">
        <div>
          <p className="pt-12 font-bold text-2xl loading-9 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-md">
            {selectedSong?.title}
          </p>
          <p className="text-base opacity-60 leading-6">
            {selectedSong?.artist}
          </p>
        </div>
        <div className="flex flex-col justify-center gap-10">
          <img src={selectedSong?.photo} className="w-96 h-96 rounded-xl" />
          <Seeker audio={audio} isPlaying={isPlaying} />
        </div>
        <div className="w-96 flex items-center justify-between">
          <img
            src={previous}
            alt={previous}
            onClick={() => prevSongHandler()}
          />

          <div className="w-1/2 flex items-center justify-around">
            <img src={playback} alt={playback} onClick={() => prevSongHandler()} />
            {isPlaying ? (
              <img src={play} alt={play} onClick={playPauseHandler} />
            ) : (
              <img src={pause} alt={pause} onClick={playPauseHandler} />
            )}
            <img
              src={playfront}
              alt={pause}
              onClick={() => nextSongHandler()}
            />
          </div>
          <img src={sound} alt={sound} />
        </div>
      </div>
    </div>
  );
};

export default Player;
