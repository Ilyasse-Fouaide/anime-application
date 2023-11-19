import React from 'react'
import { getRequest } from '../axios/axiosClient';
import { GenresType } from './Types/types';

function Genres() {
  const [genres, setGenres] = React.useState<GenresType[]>([]);
  const sfw = [{ name: "Boys Love" }, { name: "Girls Love" }];

  const filterArray: GenresType[] = genres.filter((genre) => {
    return sfw.filter((sfws) => {
      return genre.name === sfws.name
    }).length == 0
  });

  React.useEffect(() => {
    getRequest('genres/anime')
      .then(({ data }) => {
        setGenres(data.data)
      })
  }, []);

  return (
    <div className='mt-20 mb-0 lg:mt-0 lg:mb-20'>
      <div className='px-[20px] lg:px-[65px] mb-[16px] grid grid-cols-6 gap-6'>
        {filterArray && filterArray.map(({ name, count }, key) =>
          <div className='bg-red-500 relative w-full aspect-square rounded-lg flex items-end' key={key}>
            <p className='z-10 relative bg-red-500 p-5 uppercase font-bold text-xl text-zinc-50'>{name}</p>
            <div className='absolute border-[8px] border-zinc-50 w-[90%] h-[90%] top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2'></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Genres