import { useState, useCallback, useRef } from 'react';
import Card from '../Card/Card';
import SkeletonCard from '../../Skeleton/SkeletonCard';
import useAnimeFetch from './useFetchAnime';

function Popular() {
  const [filter, _setFilter] = useState("bypopularity");
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
    });
    if (node) {
      observer.current.observe(node);
    }
  }, [hasMore])

  return (
    <>
      <h2 className='mb-3 mt-5 text-lg text-white font-semibold'>Popular</h2>
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
            />
          </div>
        ))}
      </div>
      {loading && <SkeletonCard />}
    </>
  )
}

export default Popular