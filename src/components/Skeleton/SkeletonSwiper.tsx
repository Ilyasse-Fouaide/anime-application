function SkeletonSwiper() {
  return (
    <div className="mt-20 mb-0 lg:mt-0 lg:mb-20 animate-pulse">
      <div className='px-[20px] lg:px-[65px]'>
        <div className='mb-[16px]'>
          <h2 className='w-[90%] sm:w-[300px] h-[37px] bg-zinc-800'></h2>
          <p className='w-[50%] sm:w-[500px] h-[24px] mt-[8px] bg-zinc-800'></p>
        </div>
        <div className='grid grid-cols-2 gap-3 min-[640px]:grid-cols-3 min-[640px]:gap-7 min-[768px]:grid-cols-4 min-[1280px]:grid-cols-5 min-[1536px]:grid-cols-6'>
          <div>
            <div className='w-full aspect-[2/3] bg-zinc-800'></div>
            <h3 className='w-[90%] h-[16px] bg-zinc-800 mt-3'></h3>
            <div className='w-[50%] h-[16px] bg-zinc-800 mt-3'></div>
          </div>
          <div>
            <div className='w-full aspect-[2/3] bg-zinc-800'></div>
            <h3 className='w-[90%] h-[16px] bg-zinc-800 mt-3'></h3>
            <div className='w-[50%] h-[16px] bg-zinc-800 mt-3'></div>
          </div>
          <div className="hidden min-[640px]:block">
            <div className='w-full aspect-[2/3] bg-zinc-800'></div>
            <h3 className='w-[90%] h-[16px] bg-zinc-800 mt-3'></h3>
            <div className='w-[50%] h-[16px] bg-zinc-800 mt-3'></div>
          </div>
          <div className="hidden min-[768px]:block">
            <div className='w-full aspect-[2/3] bg-zinc-800'></div>
            <h3 className='w-[90%] h-[16px] bg-zinc-800 mt-3'></h3>
            <div className='w-[50%] h-[16px] bg-zinc-800 mt-3'></div>
          </div>
          <div className="hidden min-[1280px]:block">
            <div className='w-full aspect-[2/3] bg-zinc-800'></div>
            <h3 className='w-[90%] h-[16px] bg-zinc-800 mt-3'></h3>
            <div className='w-[50%] h-[16px] bg-zinc-800 mt-3'></div>
          </div>
          <div className="hidden min-[1536px]:block">
            <div className='w-full aspect-[2/3] bg-zinc-800'></div>
            <h3 className='w-[90%] h-[16px] bg-zinc-800 mt-3'></h3>
            <div className='w-[50%] h-[16px] bg-zinc-800 mt-3'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonSwiper