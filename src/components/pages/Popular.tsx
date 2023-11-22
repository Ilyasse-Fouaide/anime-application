import React, { useState, useEffect } from 'react';
import { AnimeData } from '../Types/types';
import { getRequest } from '../../axios/axiosClient';
import Card from './Card/Card';

function Popular() {
  const [anime, setAnime] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('bypopularity');

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await getRequest(`top/anime?page=${page}&filter=${filter}`);
        setAnime((prev) => [...prev, ...response.data.data]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching anime:', error);
        setLoading(false);
      }
    };

    fetchAnime();
  }, [page, filter]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  // Debounce function to limit the frequency of handleScroll calls
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
    <div className='max-w-5xl mx-auto'>
      <div className='w-full grid grid-cols-5 gap-6'>
        {anime.map(({ mal_id, images, title, type, themes, episodes, score, scored_by, synopsis }, key) => (
          <div className='relative group overflow-hidden cursor-pointer' key={key}>
            <Card
              mal_id={mal_id}
              images={images}
              title={title}
              type={type}
              themes={themes}
              episodes={episodes}
              score={score}
              scored_by={scored_by}
              synopsis={synopsis}
            />
          </div>
        ))}
        {loading && <p>Loading ...</p>}
      </div>
    </div>
  );
}

export default Popular;
