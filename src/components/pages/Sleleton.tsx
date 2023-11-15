import _React from 'react'
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";

const Sleleton = () => {
  return (
    <div className='relative w-full h-[600px] bg-gradient-to-b from-zinc-900 to-zinc-950'>
      <div className='absolute h-[500px] w-[800px] flex flex-col justify-between top-1/2 -translate-y-1/2 left-0 z-[10] px-[65px] max-w-3xl animate-pulse'>
        <div className='w-[70%] h-[100px] mt-[70px] bg-zinc-800'></div>
        <div className='flex-grow mt-10'>
          <div className='w-[50%] h-[15px] bg-zinc-800'></div>
          <div className='w-full h-[15px] mt-5 bg-zinc-800'></div>
          <div className='w-full h-[15px] mt-2 bg-zinc-800'></div>
          <div className='w-full h-[15px] mt-2 bg-zinc-800'></div>
          <div className='w-full h-[15px] mt-2 bg-zinc-800'></div>
          <div className='w-[50%] h-[15px] mt-2 bg-zinc-800'></div>
        </div>
        <div className='flex'>
          <div className='w-[213px] h-[44px] bg-zinc-800'></div>
        </div>
        <div className='flex items-center mt-[60px]'>
          {["", "", "", "", "", ""].map((_el, key) =>
            <div className={`relative mr-3 h-[10px] transition-all duration-300 bg-zinc-800 cursor-pointer rounded-full overflow-hidden ${key === 0 ? "w-[60px]" : "w-[20px]"}`}>
              <div className={`absolute left-0 bottom-0 top-0 cursor-pointer`}></div>
            </div>
          )}
        </div>
      </div>
      <div className='z-[15] py-14 px-2 absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center cursor-pointer text-[30px] text-zinc-700' >
        <IoIosArrowForward />
      </div>
      <div className='z-[15] py-14 px-2 absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center cursor-pointer text-[30px] text-zinc-700'>
        <IoIosArrowBack />
      </div>
    </div>
  )
}

export default Sleleton