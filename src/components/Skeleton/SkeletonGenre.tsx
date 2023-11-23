function SkeletonGenre() {
  return (
    <div className='mt-20 mb-0 lg:mt-0 lg:mb-20 animate-pulse'>
      <div className='px-[20px] lg:px-[65px] mb-[16px]'>
        <div className='mb-[16px]'>
          <h2 className='w-[90%] sm:w-[300px] h-[37px] bg-zinc-800'></h2>
          <p className='w-[50%] sm:w-[500px] h-[24px] mt-[8px] bg-zinc-800'></p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
          {[...Array(17).keys()].map((_el, key) =>
            <div className='w-full aspect-[3/2] rounded-lg bg-zinc-800' key={key}></div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SkeletonGenre