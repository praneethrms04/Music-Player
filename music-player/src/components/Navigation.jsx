import React from "react";
import usePlaylists from "../api/usePlaylist";
import NavLoading from "./NavLoading";
import {logo} from "../assets"

const Navigation = ({ playlistId, playlistHandler }) => {
  const { loading, data, error } = usePlaylists();
  const playlistIdHandler = (item) => {
    playlistHandler(item);
  };
  return (
    <nav className="flex-0.8 relative sm:w-96 lg:w-200">
      <div className="absolute w-133.41 h-40 ms-9 pt-10">
      <img src={logo} alt="" />
  
      </div>
      {loading && <NavLoading />}
      <ul className="pt-24 ms-10  flex flex-col items-start gap-2 font-medium text-lg leading-8 pt- w-150 h-200 left-32 top-100 transition-all duration-300 ease in">
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
      <div className="absolute bottom-32 left-32">
        {/* <img
          src={
            "https://img.freepik.com/premium-vector/portrait-young-man-with-beard-hair-style-male-avatar-vector-illustration_266660-423.jpg?w=2000"
          }
          alt="avatar"
          className="w-48 h-48 rounded-full"
        /> */}
      </div>
    </nav>
  );
};

export default Navigation;
