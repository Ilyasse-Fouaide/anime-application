import _React from 'react'
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";

const Sleleton = () => {
  return (
    <div className='relative w-full h-[600px] bg-gradient-to-b from-zinc-900 to-zinc-950'>
      <div className='absolute inset-0 flex flex-col lg:flex-row-reverse'>
        <div className='hidden lg:block w-full h-1/2 lg:h-full'></div>
        <div className='relative w-full lg:w-1/2 h-full flex items-end justify-center lg:items-center lg:mt-0'>
          <div className='w-full pl-[25px] pr-[25px] lg:pl-[65px] lg:pr-0'>
            <h1 className='w-full h-[50px] bg-zinc-800'></h1>
            <div className='w-full h-[21px] bg-zinc-800 mt-10'></div>
            <div className='w-full h-[18px] lg:w-[140%] hidden lg:block bg-zinc-800 mt-2'></div>
            <div className='w-full h-[18px] lg:w-[140%] hidden lg:block bg-zinc-800 mt-1'></div>
            <div className='w-full h-[18px] lg:w-[100%] hidden lg:block bg-zinc-800 mt-1'></div>
            <div className='w-full h-[18px] lg:w-[50%] hidden lg:block bg-zinc-800 mt-1'></div>
            <div className='flex justify-center lg:justify-start mt-10'>
              <div className='mr-2 w-[203px] h-[44px] bg-zinc-800'></div>
              <div className='w-[42px] h-[44px] bg-zinc-800'></div>
            </div>
            <div className='flex items-center justify-center lg:justify-start mt-16'>
              {[...Array(6).keys()].map((_el, key) =>
                <div className={`mr-3 h-[10px] bg-zinc-800 rounded-full ${key === 0 ? 'w-[60px]' : 'w-[20px]'}`} key={key}>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:block z-10 absolute top-1/2 left-0 -translate-y-1/2 text-[30px] py-10 pl-4 text-zinc-600'>
        <IoIosArrowBack />
      </div>
      <div className='hidden lg:block z-10 absolute top-1/2 right-0 -translate-y-1/2 text-[30px] py-10 pr-4 text-zinc-600'>
        <IoIosArrowForward />
      </div>
    </div>
  )
}

export default Sleleton