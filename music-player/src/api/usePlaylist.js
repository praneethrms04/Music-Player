import { useQuery, gql } from '@apollo/client'

const getPlaylists = gql`
query {
  getPlaylists {
    id
    title
  }
}
`
const usePlaylists = () => {
   const { loading, data, error } = useQuery(getPlaylists)
   return { loading, data, error }
}

export default usePlaylists;
