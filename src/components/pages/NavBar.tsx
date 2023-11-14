import React from 'react'
import shurikenLogo from '../../assets/shuriken-01.svg';
import { Outlet } from 'react-router-dom'
import { RiArrowDropDownLine } from "@react-icons/all-files/ri/RiArrowDropDownLine";
import { IoSearch } from "@react-icons/all-files/io5/IoSearch";
import { IoBookmarkOutline } from "@react-icons/all-files/io5/IoBookmarkOutline";


interface NavElementType {
  children: React.ReactNode;
  handleClick?: (event?: any) => void;
  isClicked?: boolean;
};

interface Genre {
  genre: string,
}

const genres: Genre[] = [
  { genre: 'actions' },
  { genre: 'Music' },
  { genre: 'Shonen' },
  { genre: 'Adventure' },
  { genre: 'Romance' },
  { genre: 'Slice of life' },
  { genre: 'Comedy' },
  { genre: 'Sci-Fi' },
  { genre: 'Sports' },
  { genre: 'Drama' },
  { genre: 'Seinen' },
  { genre: 'Supernatural' },
  { genre: 'Fantasy' },
  { genre: 'Shojo' },
  { genre: 'Thriller' },
]

const NavElement = ({ children, handleClick, isClicked }: NavElementType): JSX.Element => {
  return (
    <li className={`group relative px-[18px] flex items-center cursor-pointer hover:bg-zinc-950 ${isClicked && 'bg-zinc-950'}`} onClick={handleClick}>
      {children}
    </li>
  );
};

const InputElement = (): JSX.Element => {
  return (
    <input type="text" className='w-[420px] h-[38px] bg-transparent border border-zinc-600 outline-none rounded-sm px-9 text-sm' />
  )
}

function NavBar() {
  const [isClicked, setIsClicked] = React.useState<boolean>(false);

  const handleClick = (): void => {
    const bodyElement: HTMLBodyElement | null = document.querySelector('body');
    setIsClicked(!isClicked);
    if (!isClicked) {
      bodyElement?.classList.add('overflow-hidden')
    } else {
      bodyElement?.classList.remove('overflow-hidden')
    }
  }

  return (
    <div>
      <div className='sticky top-0 w-full h-[60px] bg-zinc-800 px-[65px] flex'>

        <a href='' className='w-[170px] px-[18px] h-full flex justify-center items-center'>
          <img src={shurikenLogo} alt="Shuriken Logo" className='w-full' />
        </a>

        <nav className='w-full flex justify-between'>
          <ul className='h-full flex'>
            <NavElement handleClick={handleClick} isClicked={isClicked}>
              <span className='group-hover:text-white'>Browse</span>
              <div className='pl-1 text-white'>
                <RiArrowDropDownLine className="text-[24px]" />
              </div>
              {isClicked &&
                <div className='z[999] absolute left-0 top-full w-[862px] py-[10px] text-[14px] text-zinc-50 bg-zinc-950 rounded-b-md flex justify-center cursor-default'>
                  <div className='w-[220px] flex-shrink-0 border-r-2 border-r-zinc-800'>
                    <div className='py-[12px] px-[16px] text-[13px] text-zinc-400 cursor-pointer uppercase'>Looking for?</div>
                    {["Popular", "New", "Alphabetic", "Simulcast Season", "Characters"].map((item, key) =>
                      <>
                        <div className='py-[12px] px-[16px] cursor-pointer hover:bg-zinc-800' key={key}>{item}</div>
                      </>
                    )}
                  </div>
                  <div className='w-full'>
                    <div className='py-[12px] px-[16px] text-[13px] text-zinc-400 cursor-pointer uppercase'>Genre</div>
                    <div className='grid grid-cols-3'>
                      {genres.map(({ genre }, key) =>
                        <>
                          <div className='py-[12px] px-[16px] cursor-pointer hover:bg-zinc-800' key={key}>{genre}</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              }
            </NavElement>
            <NavElement>
              <span className='group-hover:text-white'>Manga</span>
            </NavElement>
            <NavElement>
              <span className='group-hover:text-white'>News</span>
            </NavElement>
          </ul>
          <div className='flex h-full'>
            <div className='relative px-[18px] flex items-center'>
              <InputElement />
              <IoSearch className="text-[18px] absolute top-1/2 -translate-y-1/2 left-7 cursor-pointer" />
            </div>
            <NavElement>
              <IoBookmarkOutline className="text-[24px] group-hover:text-white" />
            </NavElement>
          </div>
        </nav>

      </div>
      <div className={`${isClicked && 'opacity-50'}`}>
        <Outlet />
      </div>
    </div>
  )
}

export default NavBar