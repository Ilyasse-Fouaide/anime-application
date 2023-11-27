function SkeletonRecomm() {
  return (
    <div className="pt-10">
      <h3 className="w-[180px] h-[28px] mb-6 bg-zinc-800"></h3>
      <div className="relative">
        <div className="space-x-2 sm:space-x-6 md:space-x-8 lg:space-x-10 xl:space-x-4 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar">
          {[...Array(10).keys()].map((_el, key) => {
            return (
              <div className="relative w-[135px] min-[375px]:w-[160px] sm:w-[125px] md:w-[157px] lg:w-[132px] xl:w-[150px] aspect-[2/3] inline-block" key={key}>
                <div className="w-full h-full bg-zinc-800"></div>
                <h3 className="w-full">
                  <h3 className="mt-3 w-[90%] h-[16px] bg-zinc-800"></h3>
                  <p className="mt-3 w-[30%] h-[16px] bg-zinc-800"></p>
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SkeletonRecomm