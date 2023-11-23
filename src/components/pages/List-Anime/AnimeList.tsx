import React, { useContext } from 'react';
import { VscListFilter } from "@react-icons/all-files/vsc/VscListFilter";
import { VscSettings } from "@react-icons/all-files/vsc/VscSettings";
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import TypeContext from '../../../context/TypeContext';

function FilterPopularity() {
  const [clicked, setClicked] = React.useState(false);
  const location = useLocation();

  const options = [
    { text: "airing", to: "videos/airing" },
    { text: "upcoming", to: "videos/upcoming" },
    { text: "popular", to: "videos/popular" },
    { text: "favorite", to: "videos/favorite" },
  ];

  return (
    <div className={`z-10 relative mr-2 py-2 px-3 transition-colors hover:bg-slate-800 cursor-pointer text-sm text-zinc-400  uppercase font-semibold inline-flex items-center ${clicked && "bg-slate-800"}`} onClick={() => setClicked(!clicked)}>
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
  const [isClicked, setIsClicked] = React.useState(false);
  const { type, setType } = useContext(TypeContext);

  return (
    <div
      className={`z-10 select-none relative flex items-center py-2 px-3 transition-colors hover:bg-slate-800 ${isClicked ? "bg-slate-800" : ""} cursor-pointer group`}
      onClick={() => setIsClicked(!isClicked)}>
      <div
        className={`text-sm uppercase font-semibold inline-flex items-center transition-colors group-hover:text-white ${isClicked ? "text-white" : type !== "all" ? "text-teal-400" : "text-zinc-400"}`}>
        <VscSettings className="mr-0 md:mr-2 w-[24px] h-[24px]" />
        <span className='hidden md:block'>Filter</span>
      </div>
      {isClicked && (
        <div className='absolute top-full right-0 w-auto md:w-[150%] bg-slate-800 shadow-2xl shadow-zinc-900'>
          <div className='my-2'>
            {["all", "tv", "movie", "ona", "ova"].map((el, key) => (
              <div
                className='py-3 px-5 text-xs hover:bg-slate-900 uppercase'
                key={key}
                onClick={(e) => {
                  e.stopPropagation();
                  setType(el)
                }}
              >
                <div className='flex items-center space-x-3'>
                  <div className={`w-[20px] h-[20px] ring-2 ${type === el ? "ring-[var(--red)]" : "ring-slate-500"} bg-slate-900 rounded-full relative`}>
                    {type === el &&
                      <div className='absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 w-[70%] h-[70%] bg-[var(--red)] rounded-full'></div>
                    }
                  </div>
                  <label htmlFor="filter" className={`font-semibold ${type === el ? "text-white" : "text-slate-400"}`}>{el}</label>
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
  const { type, setType } = useContext(TypeContext);

  if (location.pathname === "/videos" || location.pathname === "/videos/") {
    return <Navigate to={"/videos/popular"} />
  }

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <div className='flex justify-between items-center my-5 py-5'>
        <div>
          <h1 className='border-l-4 border-l-[var(--red)] pl-3 text-xl sm:text-3xl font-semibold text-white'>Anime List</h1>
          {type !== "all" &&
            <p className='group text-sm text-teal-400 hover:text-red-500 mt-2 cursor-pointer' onClick={() => setType("all")}>
              Reset Filter: {" "}
              <span className='text-zinc-400 uppercase group-hover:line-through'>{type}</span>
            </p>
          }
        </div>
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
