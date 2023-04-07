import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_PLAYLIST = gql`
  query Playlists {
    getPlaylists {
      id
      title
    }
  }
`;
import "./playlists.css"

const GetPlayList = () => {
  const { loading, error, data } = useQuery(GET_PLAYLIST);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return data.getPlaylists.map(({ id, title }) => (
    <div key={id} className="navigation">
      <p className="playlist">{title}</p>
    </div>
  ));
};

export default GetPlayList;
