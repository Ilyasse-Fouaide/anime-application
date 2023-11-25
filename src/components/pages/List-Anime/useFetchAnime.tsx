import React from 'react'
import { getRequest } from '../../../axios/axiosClient';
import { AnimeData } from '../../Types/types';
import TypeContext from '../../../context/TypeContext';

export default function useAnimeFetch(filter: string, page: number) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [anime, setAnime] = React.useState<AnimeData[]>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(false);
  const { type } = React.useContext(TypeContext);

  React.useEffect(() => {
    setAnime([]);
    setHasMore(false);
    setLoading(true);
  }, [filter, type]);

  React.useEffect(() => {
    setLoading(true)
    getRequest(`top/anime?sfw&filter=${filter}&page=${page}${type !== "all" ? `&type=${type}` : ""}`)
      .then(({ data }) => {
        setAnime((prev) => page === 1 ? data.data : [...prev, ...data.data]);
        setHasMore(data.pagination.has_next_page);
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      })
  }, [page, filter, type])

  return { loading, error, anime, hasMore }
}
