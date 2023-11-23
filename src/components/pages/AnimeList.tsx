import React, { useState, useEffect } from 'react';
import { AnimeData } from '../Types/types';
import { getRequest } from '../../axios/axiosClient';
import Card from './Card/Card';
import SkeletonCard from '../Skeleton/SkeletonCard';
import { VscListFilter } from "@react-icons/all-files/vsc/VscListFilter";
import { VscSettings } from "@react-icons/all-files/vsc/VscSettings";
import { Link, useLocation } from 'react-router-dom';

type Filter = 'airing' | 'upcoming' | 'popular' | 'favorite'

function FilterPopularity() {
  const [clicked, setIsClicked] = React.useState(false);
  const location = useLocation();

  return (
    <div className={`z-[999] relative mr-2 py-2 px-3 transition-colors hover:bg-slate-800 cursor-pointer text-sm text-zinc-400  uppercase font-semibold inline-flex items-center ${clicked && "bg-slate-800"}`} onClick={() => setIsClicked(!clicked)}>
      <VscListFilter className="mr-2 w-[24px] h-[24px]" />
      {location.pathname.split("/")[1]}
      {clicked &&
        <div className='absolute top-full right-0 w-[150%] bg-slate-800'>
          <div className='my-2'>
            {["airing", "upcoming", "popular", "favorite"].map((el, key) =>
              <Link to={`/${el}`}>
                <div className='py-3 px-5 text-xs hover:bg-slate-900' key={key}>{el}</div>
              </Link>
            )}
          </div>
        </div>
      }
    </div>
  )
}

function AnimeList() {
  const [anime, setAnime] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const location = useLocation();

  const fetchAnime = () => {
    getRequest(`top/anime?page=${page}&filter=bypopularity`)
      .then((response) => {
        setAnime((prev) => [...prev, ...response.data.data]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      })
  };

  useEffect(() => {
    fetchAnime();
  }, [page]);

  const handleScroll = () => {
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
    <div className='max-w-5xl mx-auto p-6'>
      <div className='flex justify-between items-center mt-10'>
        <h1 className='text-3xl font-semibold text-white'>Anime List</h1>
        <div className='flex items-center'>

          <FilterPopularity />
          <div className='py-2 px-3 transition-colors hover:bg-slate-800 cursor-pointer text-sm text-zinc-400 hover:text-white uppercase font-semibold inline-flex items-center'>
            <VscSettings className="mr-2 w-[24px] h-[24px]" />
            Filter
          </div>

        </div>
      </div>
      <h2 className='mb-3 mt-5 text-lg text-white font-semibold'>Popular</h2>

      {location.pathname === "/popular" && "Popluar"}

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
    </div>
  );
}

export default AnimeList;
