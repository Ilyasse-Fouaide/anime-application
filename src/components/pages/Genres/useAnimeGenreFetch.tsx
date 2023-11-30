import React from 'react'
import { getRequest } from '../../../axios/axiosClient';

function useAnimeGenreFetch(id: string | undefined, page: number) {
  const [animeGenres, setAnimeGenres] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);

  React.useEffect(() => {
    setAnimeGenres([]);
    setLoading(true);
    setError(false);
  }, [id]);

  React.useEffect(() => {
    getRequest(`anime?sfw&genres=${id}&order_by=popularity&page=${page}`)
      .then(({ data }) => {
        setAnimeGenres(data.data);
        setLoading(false);
      }).
      catch((error) => {
        console.log(error);
        setError(true)
        setLoading(false);
      });
  }, [id, page]);

  return { animeGenres, loading, error }
}

export default useAnimeGenreFetch;