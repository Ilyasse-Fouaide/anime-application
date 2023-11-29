import { useState, useCallback, useRef } from 'react';
import Card from '../Card/Card';
import SkeletonCard from '../../Skeleton/SkeletonCard';
import useAnimeFetch from './useFetchAnime';
import NoMorData from './NoMorData';


function Upcoming() {
  const [filter, _setFilter] = useState("upcoming");
  const [page, setPage] = useState(1);

  const { loading, error, anime, hasMore } = useAnimeFetch(filter, page);

  const observer = useRef<any>();

  const lastElement = useCallback((node: any) => {
    observer.current = new IntersectionObserver((entries, observe) => {
      const isIntersecting = entries[0].isIntersecting
      if (isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
      if (isIntersecting) {
        observe.disconnect();
      }
    }, { threshold: 1 });
    if (node) {
      observer.current.observe(node);
    }
  }, [hasMore])

  return (
    <>
      <h2 className='mb-3 mt-5 text-lg text-white font-semibold'>Upcoming</h2>
      <div className='mb-6 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7'>
        {anime && anime.map(({ mal_id, images, title, type, status, episodes, score, scored_by, synopsis }, key) => (
          <div className='relative group overflow-hidden cursor-pointer' key={key} ref={anime.length - 1 === key ? lastElement : null}>
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
              slice={100}
            />
          </div>
        ))}
      </div>
      {loading && <SkeletonCard />}
      {!hasMore && !loading && !error && <NoMorData />}
    </>
  )
}

export default Upcoming