import React from 'react'
import shurikenLogo from '../../assets/shuriken-01.svg';
import { Outlet } from 'react-router-dom'
import { RiArrowDropDownLine } from "@react-icons/all-files/ri/RiArrowDropDownLine";
import { IoSearch } from "@react-icons/all-files/io5/IoSearch";
import { IoBookmarkOutline } from "@react-icons/all-files/io5/IoBookmarkOutline";


interface ComponentTypes {
  children: React.ReactNode;
  handleClick?: (event: any) => void;
};

const NavElement = ({ children, handleClick }: ComponentTypes): JSX.Element => {
  return (
    <li className='group relative px-[18px] flex items-center cursor-pointer hover:bg-zinc-950' onClick={handleClick}>
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
    console.log("Clicked")
  }

  return (
    <div>
      <div className='w-full h-[60px] bg-zinc-800 px-[65px] flex'>

        <a href='' className='w-[170px] px-[18px] h-full flex justify-center items-center'>
          <img src={shurikenLogo} alt="Shuriken Logo" className='w-full' />
        </a>

        <nav className='w-full flex justify-between'>
          <ul className='h-full flex'>
            <NavElement handleClick={handleClick}>
              <span className='group-hover:text-white'>Browse</span>
              <div className='pl-1 text-white'>
                <RiArrowDropDownLine className="text-[24px]" />
              </div>
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
      <Outlet />
    </div>
  )
}

export default NavBar