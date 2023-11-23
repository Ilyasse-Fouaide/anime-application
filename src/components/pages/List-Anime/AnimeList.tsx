import React from 'react';
import { VscListFilter } from "@react-icons/all-files/vsc/VscListFilter";
import { VscSettings } from "@react-icons/all-files/vsc/VscSettings";
import { Link, Outlet, useLocation } from 'react-router-dom';

function FilterPopularity() {
  const [clicked, setIsClicked] = React.useState(false);
  const location = useLocation();

  const options = [
    { text: "airing", to: "videos/airing" },
    { text: "upcoming", to: "videos/upcoming" },
    { text: "popular", to: "videos/popular" },
    { text: "favorite", to: "videos/favorite" },
  ];

  return (
    <div className={`z-[999] relative mr-2 py-2 px-3 transition-colors hover:bg-slate-800 cursor-pointer text-sm text-zinc-400  uppercase font-semibold inline-flex items-center ${clicked && "bg-slate-800"}`} onClick={() => setIsClicked(!clicked)}>
      <VscListFilter className="mr-2 w-[24px] h-[24px]" />
      {location.pathname.split("/")[2]}
      {clicked &&
        <div className='absolute top-full right-0 w-[150%] bg-slate-800'>
          <div className='my-2'>
            {options.map(({ text, to }, key) =>
              <Link to={`/${to}`}>
                <div className='py-3 px-5 text-xs hover:bg-slate-900' key={key}>{text}</div>
              </Link>
            )}
          </div>
        </div>
      }
    </div>
  )
}

function AnimeList() {

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

      <Outlet />

    </div>
  );
}

export default AnimeList;
