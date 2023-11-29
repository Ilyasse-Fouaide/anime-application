function SkeletonEpisodes() {
  return (
    <div className="mt-16 animate-pulse">
      <div className="mb-6">
        <h3 className="w-[150px] h-[28px] bg-zinc-800"></h3>
      </div>
      {[...Array(15).keys()].map((_el, key) => {
        return (
          <div className="my-2 h-[40px] even:bg-zinc-900 odd:bg-zinc-800" key={key}>

          </div>
        )
      })}

    </div>
  )
}

export default SkeletonEpisodes