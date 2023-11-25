function SkeltonAnimeDetail() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-[500px] bg-gradient-to-b from-zinc-800 flex justify-center">
        <div className="w-[333px] h-full bg-zinc-800"></div>
      </div>
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="w-full md:w-[380px] h-[36px] bg-zinc-800"></h2>
        <div className="mt-2 mb-5 md:mb-16 w-[150px] md:w-[200px] h-[16px] md:h-[20px] bg-zinc-800"></div>
        <div className="w-[50%] md:first-letter:w-[290px] h-[22px] bg-zinc-800"></div>
        <div className="flex justify-start mt-4">
          <div className="h-[44px] w-[177px] bg-zinc-800 mr-2"></div>
          <div className="h-[44px] w-[44px] md:w-[177px] bg-zinc-800"></div>
        </div>
        <div className=" mt-6">
          <div className="w-full h-[14px] bg-zinc-800"></div>
          <div className="w-full h-[14px] bg-zinc-800 mt-1"></div>
          <div className="w-full h-[14px] bg-zinc-800 mt-1"></div>
          <div className="w-[50%] h-[14px] bg-zinc-800 mt-1"></div>
        </div>
        <p className='mt-6 w-[38px] h-[16px] bg-zinc-800'></p>
        <div className="mt-5 flex flex-wrap items-center">
          {[...Array(3).keys()].map((_el, key) => {
            return (
              <div className="w-[73px] h-[24px] bg-zinc-800 mr-2 my-1" key={key}></div>
            )
          })}
        </div>
        <div className="mt-5 py-3 border-b border-b-zinc-600 flex items-center justify-between">
          <div className="w-[95px] md:w-[150px] h-[24px] bg-zinc-800"></div>
          <div className="w-[110px] md:w-[300px] h-[24px] bg-zinc-800"></div>
        </div>
        <div className="py-3 border-b border-b-zinc-600 flex items-center justify-between">
          <div className="w-[95px] md:w-[150px] h-[24px] bg-zinc-800"></div>
          <div className="w-[110px] md:w-[300px] h-[24px] bg-zinc-800"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeltonAnimeDetail