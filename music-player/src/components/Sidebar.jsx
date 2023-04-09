import React, { useState, useEffect } from "react";
import useSongs from "../api/useSongs";

import { searchicon } from "../assets";

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
    <div className=" ml-0 ">
      <div className="pt-30 ">
        <p className="font-bold  lg:text-2xl pt-5 ms-0">
          {selectedPlaylist.title}
        </p>
        <div className="px-20  mt-5 h-12 rounded-md bg-opacity-8 bg-[#4D4D4D] flex items-center justify-between">
          <input
            type="search"
            className="border-none box-shadow-none outline-none font-medium text-lg text-[#fff] bg-transparent"
            placeholder="Search Song, Artist"
            onChange={searchHandler}
          />
          <img
            src={searchicon}
            alt=""
            className="mr-0 fill-current text-gray-500"
          />
        </div>
        {loading && (
          <div
            className="h-8 w-8 ms-44 mt-5 flex justify-center items-center animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        )}
        <div className="pt-5 ms-0 w-full">
          {data?.getSongs.map((song, idx, arr) => (
            <div
              className={`flex justify-between items-center p-2 transition duration-300 ease-in cursor-pointer ${
                songSelectedPlaylistId === playlistId &&
                song._id === data?.getSongs[selectedSongIdx]?._id
                  ? "bg-[#4D4D4D]"
                  : ""
              }`}
              key={song._id}
              onClick={() => setSelectedSongIdx(idx)}
            >
              <div className="flex items-center gap-4 bg-transparent w-full">
                <img
                  src={song.photo}
                  className="w-10 h-10 rounded-3xl"
                  alt="avatar"
                />
                <div className="bg-transparent ">
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
