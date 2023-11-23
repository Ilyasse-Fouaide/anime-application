import React, { useContext } from 'react';
import { VscListFilter } from "@react-icons/all-files/vsc/VscListFilter";
import { VscSettings } from "@react-icons/all-files/vsc/VscSettings";
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import TypeContext from '../../../context/TypeContext';

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
      <VscListFilter className="mr-0 md:mr-2 w-[24px] h-[24px]" />
      <span className='hidden md:block'>
        {location.pathname.split("/")[2]}
      </span>
      {clicked &&
        <div className='absolute top-full right-0 w-auto md:w-[150%] bg-slate-800'>
          <div className='my-2'>
            {options.map(({ text, to }, key) =>
              <NavLink to={`/${to}`} key={key}>
                <div className='py-3 px-5 text-xs hover:bg-slate-900'>{text}</div>
              </NavLink>
            )}
          </div>
        </div>
      }
    </div>
  )
}

function FilterType() {
  const [clicked, setIsClicked] = React.useState(false);
  const { type, setType } = useContext(TypeContext);

  return (
    <div
      className={`z-[999] select-none relative flex items-center py-2 px-3 transition-colors hover:bg-slate-800 ${clicked ? "bg-slate-800" : ""} cursor-pointer group`}
      onClick={() => setIsClicked(!clicked)}>
      <div
        className={`text-sm uppercase font-semibold inline-flex items-center transition-colors group-hover:text-white ${clicked ? "text-white" : "text-zinc-400 "}`}>
        <VscSettings className="mr-2 w-[24px] h-[24px]" />
        <span className='hidden md:block'>Filter</span>
      </div>
      {clicked && (
        <div className='absolute top-full right-0 w-[150%] bg-slate-800'>
          <div className='my-2'>
            {["all", "tv", "movie", "ova", "ona"].map((el, key) => (
              <div
                className='py-3 px-5 text-xs hover:bg-slate-900 uppercase'
                key={key}
                onClick={(e) => {
                  e.stopPropagation();
                  setType(el)
                }}
              >
                <div className='flex items-center space-x-2'>
                  <div className={`w-[20px] h-[20px] ring-2 ${type === el ? "ring-[var(--red)]" : "ring-slate-500"} bg-slate-900 rounded-full relative`}>
                    {type === el &&
                      <div className='absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 w-[70%] h-[70%] bg-[var(--red)] rounded-full'></div>
                    }
                  </div>
                  <label htmlFor="filter">{el}</label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


function AnimeList() {
  const location = useLocation();

  if (location.pathname === "/videos" || location.pathname === "/videos/") {
    return <Navigate to={"/videos/popular"} />
  }

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <div className='flex justify-between items-center my-5 py-5'>
        <h1 className='border-l-4 border-l-[var(--red)] pl-3 text-xl sm:text-3xl font-semibold text-white'>Anime List</h1>
        <div className='flex items-center'>

          <FilterPopularity />
          <FilterType />

        </div>
      </div>

      <Outlet />

    </div>
  );
}

export default AnimeList;
