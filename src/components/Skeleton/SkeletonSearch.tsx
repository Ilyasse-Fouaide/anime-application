function SkeletonSearch() {
  return (
    <div className='animate-pulse'>
      <div className='mb-16'>
        <div className='h-5 w-[200px] bg-zinc-800'></div>
        <div className='my-3 grid grid-cols-2 md:grid-cols-3 gap-3'>
          <div className='w-full aspect-video bg-zinc-800'></div>
          <div className='w-full aspect-video bg-zinc-800'></div>
          <div className='w-full aspect-video bg-zinc-800'></div>
        </div>
      </div>
      {["", ""].map((_el, key) =>
        <div className='mb-16' key={key}>
          <div className='h-5 w-[200px] bg-zinc-800'></div>
          <div className='my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {["", "", "", "", "", ""].map((_el, key) =>
              <div className='flex items-center' key={key}>
                <div className='mr-3 w-[60px] aspect-[2/3] flex-shrink-0 bg-zinc-800'></div>
                <div className='w-full'>
                  <div className='w-[50%] h-3 bg-zinc-800'></div>
                  <div className='w-[40%] h-3 bg-zinc-800 mt-2'></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SkeletonSearch