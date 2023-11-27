function SkeletonReview() {
  return (
    <div className="max-w-[860px] animate-pulse">
      <div className="mt-10">
        <div className="w-[120px] h-[28px] bg-zinc-800"></div>
      </div>
      {[...Array(4).keys()].map((_el, key) =>
        <div className="my-10 flex gap-3 sm:gap-5 lg:gap-6" key={key}>
          <div>
            <div className="w-[24px] sm:w-[46px] lg:w-[62px] aspect-square bg-zinc-800 ring-2 md:ring ring-zinc-800 ring-offset-black ring-offset-2 md:ring-offset-4 rounded-full"></div>
          </div>
          <div className="w-full">
            <div className="w-[150px] h-[19px] md:h-[22px] bg-zinc-800"></div>
            <div className="my-3 h-[20px] w-[112px] bg-zinc-800"></div>
            <div>
              <div className="w-full h-[15px] bg-zinc-800"></div>
              <div className="w-full h-[15px] bg-zinc-800 mt-1"></div>
              <div className="w-[60%] h-[15px] bg-zinc-800 mt-1"></div>
            </div>
            <div className="mt-5 h-[16px] w-[150px] bg-zinc-800"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SkeletonReview