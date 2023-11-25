import React from 'react'
import { getRequest } from '../../../axios/axiosClient';
import { AnimeData } from '../../Types/types';

export default function useAnimeFetch(filter: string, page: number) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [anime, setAnime] = React.useState<AnimeData[]>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(false);

  React.useEffect(() => {
    setAnime([]);
  }, [filter])

  React.useEffect(() => {
    setLoading(true)
    getRequest(`top/anime?filter=${filter}&page=${page}`)
      .then(({ data }) => {
        setAnime((prev) => [...prev, ...data.data]);
        setHasMore(data.pagination.has_next_page);
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      })
  }, [page, filter])

  return { loading, error, anime, hasMore }
}
