function SkeletonCard() {
  return (
    <div className='w-full grid grid-cols-5 gap-7 animate-pulse'>
      {[...Array(25).keys()].map((_el, key) =>
        <div key={key}>
          <div className='w-full aspect-[2/3]'>
            <div className='w-full h-full bg-zinc-800'></div>
          </div>
          <div className='w-1/2 h-3 bg-zinc-800 mt-3'></div>
          <div className='w-[90%] h-3 bg-zinc-800 mt-3'></div>
        </div>
      )}
    </div>
  )
}

export default SkeletonCard