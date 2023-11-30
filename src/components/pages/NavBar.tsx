import React from 'react'
import shurikenLogo from '../../assets/shuriken-icon.svg';
import { Link, NavLink, Outlet } from 'react-router-dom'
import { RiArrowDropDownLine } from "@react-icons/all-files/ri/RiArrowDropDownLine";
import { IoSearch } from "@react-icons/all-files/io5/IoSearch";
import { IoBookmarkOutline } from "@react-icons/all-files/io5/IoBookmarkOutline";
import { AnimatePresence, motion } from 'framer-motion';
import { slug } from '../functions/slug';

interface NavElementType {
  children: React.ReactNode;
  handleClick?: (event?: any) => void;
  isClicked?: boolean;
};

interface Genre {
  id: number,
  genre: string,
}

interface Search {
  search: string,
  to: string
}

const genres: Genre[] = [
  { id: 4, genre: 'Comedy' },
  { id: 15, genre: 'Kids' },
  { id: 10, genre: 'Fantasy' },
  { id: 1, genre: 'Action' },
  { id: 2, genre: 'Music' },
  { id: 19, genre: 'Adventure' },
  { id: 24, genre: 'Sci-Fy' },
  { id: 8, genre: 'Drama' },
  { id: 22, genre: 'Romance' },
  { id: 23, genre: 'School' },
  { id: 27, genre: 'Shounen' },
  { id: 36, genre: 'Slice of Life' },
  { id: 13, genre: 'Historical' },
  { id: 37, genre: 'Supernatural' },
  { id: 18, genre: 'Mecca' },
];

const search: Search[] = [
  { search: 'Popular', to: "videos/popular" },
  { search: 'New Airing', to: "videos/airing" },
  { search: 'Favorite', to: "videos/favorite" },
  { search: 'Simulcast Season', to: "simulcast-season" },
  { search: 'Characters', to: "characters" },
];

const dropDownVariants = {
  hidden: {
    opacity: 0,
    y: -10
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.01
    }
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.4,
      staggerChildren: 0.01
    }
  }
}

const NavElement = ({ children, handleClick, isClicked }: NavElementType): JSX.Element => {
  return (
    <div className={`group relative px-[18px] flex items-center cursor-pointer hover:bg-zinc-950 ${isClicked ? 'bg-zinc-950' : ''}`} onClick={handleClick}>
      {children}
    </div>
  );
};

const InputElement = (): JSX.Element => {
  return (
    <Link to={`search`}>
      <input type="text" placeholder='Search Anime...' className='w-[250] h-[38px] bg-transparent border border-zinc-600 outline-none rounded-sm px-9 text-sm cursor-pointer' />
    </Link>
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
    <header>
      <div className='z-[999] sticky top-0 w-full h-[60px] bg-zinc-800 px-[65px] flex'>

        <nav className='w-full flex justify-center md:justify-between'>
          <div className='flex'>
            <Link to='/' className='h-full flex items-center'>
              <div className='w-[32px] h-[32px] mr-[18px]'>
                <img src={shurikenLogo} alt="Shuriken Logo" className='w-full h-full' />
              </div>
            </Link>
            <div className='h-full hidden lg:flex'>
              <NavElement handleClick={handleClick} isClicked={isClicked}>
                <span className='group-hover:text-white'>Browse</span>
                <div className='pl-1 text-white'>
                  <RiArrowDropDownLine className="text-[24px]" />
                </div>
                <AnimatePresence>
                  {isClicked &&
                    <motion.div
                      variants={dropDownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className='absolute left-0 top-full w-[562px] xl:w-[862px] py-[10px] text-[14px] text-zinc-50 bg-zinc-950 rounded-b-md flex'
                    >
                      <div className='w-[220px] flex-shrink-0 border-r-2 border-r-zinc-800'>
                        <div className='py-[12px] px-[16px] text-[13px] text-zinc-400 cursor-pointer uppercase'>Looking for?</div>
                        {search.map(({ search, to }, key) =>
                          <NavLink to={`${to}`} key={key}>
                            <motion.div variants={dropDownVariants} className='py-[12px] px-[16px] cursor-pointer hover:bg-zinc-800'>{search}</motion.div>
                          </NavLink>
                        )}
                      </div>
                      <div className='w-full'>
                        <div className='py-[12px] px-[16px] text-[13px] text-zinc-400 cursor-pointer uppercase'>Genre</div>
                        <div className='grid grid-cols-2 xl:grid-cols-3'>
                          {genres.map(({ id, genre }, key) =>
                            <Link to={`/genre/${id}/${slug(genre)}`} key={key}>
                              <motion.div variants={dropDownVariants} className='py-[12px] px-[16px] cursor-pointer hover:bg-zinc-800'>{genre}</motion.div>
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  }
                </AnimatePresence>
              </NavElement>
              <NavElement>
                <span className='group-hover:text-white'>Manga</span>
              </NavElement>
              <NavElement>
                <span className='group-hover:text-white'>News</span>
              </NavElement>
            </div>
          </div>
          <div className='hidden md:flex h-full'>
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
      <div className={`-z-[999] transition-opacity ${isClicked ? 'opacity-40 pointer-events-none' : ''}`}>
        <Outlet />
      </div>
      {/* Footer */}
      <div className='w-full h-[50vh] bg-gradient-to-t from-zinc-800 to-zinc-950'></div>
    </header>
  )
}

export default NavBar