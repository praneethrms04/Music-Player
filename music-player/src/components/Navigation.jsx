import React from "react";
import usePlaylists from "../api/usePlaylist";
import { logo, profile } from "../assets";
import Loader from "./Loader";

const Navigation = ({ playlistId, playlistHandler }) => {
  const { loading, data, error } = usePlaylists();
  const playlistIdHandler = (item) => {
    playlistHandler(item);
  };
  return (
    <nav className="flex-0.8 relative sm:w-96">
      <div className="absolute  w-133.41 h-40 ms-9 pt-10">
        <img src={logo} alt="" />
      </div>
      {loading && <Loader />}
      <ul className="pt-24 ms-10 flex flex-col items-start gap-2 font-medium text-lg leading-8 pt- w-150 h-200 left-32 top-100 transition-all duration-300 ease in">
        {data?.getPlaylists.map((list) => (
          <li
            key={list.id}
            onClick={() => playlistIdHandler(list)}
            style={{
              opacity: list.id === playlistId ? 1 : 0.7,
            }}
          >
            {list.title}
          </li>
        ))}
      </ul>
      <div className="fixed bottom-9 left-10">
        <img src={profile} alt="avatar" className=" rounded-full" />
      </div>
    </nav>
  );
};

export default Navigation;
