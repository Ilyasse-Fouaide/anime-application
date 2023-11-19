import React from 'react'
import { getRequest } from '../axios/axiosClient';
import { GenresType } from './Types/types';

function Genres() {
  const [genres, setGenres] = React.useState<GenresType[]>([]);
  const sfw = [{ name: "Boys Love" }, { name: "Girls Love" }, { name: "Ecchi" }, { name: "Hentai" }];

  const filterArray: GenresType[] = genres.filter((genre) => {
    if (genre.count) {
      return genre.count >= 900 && sfw.filter((sfws) => {
        return genre.name === sfws.name
      }).length == 0
    }
  });

  React.useEffect(() => {
    getRequest('genres/anime')
      .then(({ data }) => {
        setGenres(data.data)
      })
  }, []);

  return (
    <div className='mt-20 mb-0 lg:mt-0 lg:mb-20'>
      <div className='px-[20px] lg:px-[65px] mb-[16px]'>
        <h2 className='text-[20px] md:text-[25px] text-white font-bold'>Top Genres</h2>
        <p className='text-sm md:text-base text-zinc-400 mt-[8px]'>Explore Top Genre Picks for Your Watching Pleasure!</p>
      </div>
      <div className='px-[20px] lg:px-[65px] mb-[16px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
        {filterArray && filterArray.map(({ name, count }, key) =>
          <div className='bg-[var(--red)] relative w-full aspect-square rounded-lg flex items-end' key={key}>
            <p className='z-10 relative bg-[var(--red)] p-4 uppercase font-bold text-xl text-zinc-50 rounded-lg break-words'>
              {name.split("").splice(0, 12).join("")}
              {" "}
              <span className='text-base'>{`(${count})`}</span>
            </p>
            <div className='absolute border-[8px] border-zinc-50 w-[85%] h-[85%] top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2'></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Genres