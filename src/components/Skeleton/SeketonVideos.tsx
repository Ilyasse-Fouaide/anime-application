function SeketonVideos() {
  return (
    <div className="mt-16 marker animate-pulse">
      <div className="mb-6">
        <div className="w-[150px] h-[28px] bg-zinc-800"></div>
      </div>
      <div className="grid grid-cols-1 min-[580px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 min-[580px]:gap-5 lg:gap-6">
        {[...Array(12).keys()].map((_el, key) => {
          return (
            <div className="w-full flex flex-row min-[580px]:flex-col" key={key}>
              <div className="flex-shrink-0 w-[50%] min-[580px]:w-full mr-3 aspect-video bg-zinc-800"></div>
              <div className="mt-3 w-full">
                <div className="w-[100px] h-[16px] bg-zinc-800"></div>
                <div className="mt-2 w-[90%] h-[18px] bg-zinc-800"></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SeketonVideos