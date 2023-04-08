import React, { useState, useEffect } from "react";
import useSongs from "../api/useSongs";
import SongsLoading from "./SongLoader";

const Sidebar = ({
  selectedPlaylist,
  playlistId,
  songHandler,
  selectedSongIdx,
  setSelectedSongIdx,
  setSongs,
  songSelectedPlaylistId,
}) => {
  const [search, setSearch] = useState(null);
  const { loading, data, error } = useSongs(playlistId, search);

  const convertMsToHM = (num) => {
    let arr = num.toString().split("");
    arr.splice(1, 0, ":");
    return arr.join("");
  };
  const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };
  const searchHandler = debounce((e) => {
    const text = e.target.value.trim() || null;
    setSearch(text);
  }, 550);

  useEffect(() => {
    songHandler(data?.getSongs[selectedSongIdx]);
    setSongs(data?.getSongs);
  }, [selectedSongIdx]);

  return (
    <div className="flex-1.5 relative">
      <div className="pt-35">
        <p className="font-bold text-2xl px-40">{selectedPlaylist.title}</p>
        <div className="my-6 mx-40 h-12 rounded-md bg-opacity-8 bg-white flex items-center justify-between">
          <input
            type="search"
            className="border-none box-shadow-none outline-none font-medium text-lg h-90p w-100p mltext-white placeholder-green-500  bg-transparent"
            placeholder="Search Song, Artist"
            onChange={searchHandler}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            className="search-img mr-3 fill-current text-gray-500"
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z" />
          </svg>
        </div>
        {loading && <SongsLoading />}
        <div className="h-5/6 overflow-auto pt-10 px-20">
          {data?.getSongs.map((song, idx, arr) => (
            <div
              className={`flex justify-between items-center p-2 w-full transition duration-300ease-in cursor-pointer ${
                songSelectedPlaylistId === playlistId &&
                song._id === data?.getSongs[selectedSongIdx]?._id
                  ? "bg-[#675D50]"
                  : ""
              }`}
              key={song._id}
              onClick={() => setSelectedSongIdx(idx)}
            >
              <div className="flex items-center gap-4 bg-transparent w-4/5">
                <img
                  src={song.photo}
                  className="w-10 h-10 rounded-3xl"
                  alt="avatar"
                />
                <div className="bg-transparent w-full">
                  <p className="w-full overflow-hidden white-space-nowrap overflow-ellipsis max-w-10rem bg-none">
                    {song.title}
                  </p>
                  <h3 className="font-normal text-base leading-6">
                    {song.artist}
                  </h3>
                </div>
              </div>
              <p className="text-right opacity-60 text-base  ">
                {convertMsToHM(song.duration)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
