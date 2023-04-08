import { useQuery, gql } from "@apollo/client";

const getSongs = gql`
  query ($playlistId: Int!, $search: String) {
    getSongs(playlistId: $playlistId, search: $search) {
      _id
      artist
      duration
      photo
      title
      url
    }
  }
`;
const useSongs = (playlistId, search) => {
  const { loading, data, error } = useQuery(getSongs, {
    variables: {
      playlistId,
      search,
    },
  });
  return { loading, data, error };
};

export default useSongs;
