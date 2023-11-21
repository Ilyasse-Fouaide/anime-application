import { CardInfoTypes } from '../../Types/types'
import numeral from "numeral";

export const formatNumber = (num: number): string | number => {
  if (num >= 1000 && num < 1000000) {
    return numeral(num).format('0a')
  } else if (num > 1000000) {
    return numeral(num).format('0.0a')
  } else {
    return num;
  }
}

function CardInfo({ images, score, scored_by, synopsis, episodes, title }: CardInfoTypes) {

  return (
    <div className='z-10 hidden lg:block absolute inset-0 bg-black transition-transform translate-y-[105%] group-hover:translate-y-0 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url('${images.jpg.large_image_url}')` }}>
      <div className='w-full h-full bg-zinc-900/[.96] p-3'>
        <h3 className='text-[14px] text-zinc-50 font-medium'>{title}</h3>
        <div className='text-[13px] text-zinc-300 font-semibold mt-3'>
          <div>{score ? score : "N/A"} by {scored_by ? `(${formatNumber(scored_by)})` : "N/A"}</div>
        </div>
        <div className='text-[13px] text-zinc-400 font-medium'>{episodes} Espisodes</div>
        <p className='text-[13px] leading-[17px] text-zinc-50 font-medium mt-3'>
          {synopsis ?
            <>
              {synopsis.split("").splice(0, 200).join("") + "..."}
            </>
            :
            <>No Description Availabled</>
          }
        </p>
      </div>
    </div>
  )
}

export default CardInfo