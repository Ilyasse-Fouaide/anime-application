import { useState, useEffect, useContext } from 'react';
import { AnimeData } from '../../Types/types';
import { getRequest } from '../../../axios/axiosClient';
import Card from '../Card/Card';
import SkeletonCard from '../../Skeleton/SkeletonCard';
import TypeContext from '../../../context/TypeContext';

function Airing() {
  const [anime, setAnime] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const { type } = useContext(TypeContext);


  useEffect(() => {
    getRequest(`top/anime?page=${page}&filter=airing&sfw${type !== "all" ? `&type=${type}` : ""}`)
      .then((response) => {
        setAnime((prev) => page === 1 ? response.data.data : [...prev, ...response.data.data]);
        setLoading(false);
      })
      .catch((_error) => {
        setLoading(false);
      })
  }, [page, type]);

  const handleScroll = () => {
    if (document.documentElement.scrollTop <= 20) {
      setPage(1);
    }

    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  const debounce = (func: () => void, delay: number) => {
    let timeoutId: any;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  };

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 500);
    window.addEventListener('scroll', debouncedScroll);

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <h2 className='mb-3 mt-5 text-lg text-white font-semibold'>Airing</h2>
      <div className='mb-6 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7'>
        {anime && anime.map(({ mal_id, images, title, type, status, episodes, score, scored_by, synopsis }, key) => (
          <div className='relative group overflow-hidden cursor-pointer' key={key}>
            <Card
              mal_id={mal_id}
              images={images}
              title={title}
              type={type}
              status={status}
              episodes={episodes}
              score={score}
              scored_by={scored_by}
              synopsis={synopsis}
            />
          </div>
        ))}
      </div>
      {loading && <SkeletonCard />}
      {anime.length === 0 && "No data"}
    </>
  )
}

export default Airing