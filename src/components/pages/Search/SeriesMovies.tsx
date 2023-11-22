import { CardInfoTypes } from "../../Types/types";
import { formatNumber } from "../Card/CardInfo";
import { sliceText } from "./Search";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function SeriesMovies({ images, title, episodes, score, scored_by }: CardInfoTypes) {
  return (
    <div className='flex items-center cursor-pointer hover:bg-zinc-900'>
      <div className='mr-3 w-[60px] aspect-[2/3] flex-shrink-0'>
        <LazyLoadImage
          src={images.jpg.large_image_url}
          placeholderSrc={images.jpg.small_image_url}
          effect="blur"
          alt={title}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
      <div>
        <h4 className='font-medium text-base text-zinc-50'>
          {sliceText(title, 20)}
        </h4>
        <div className='text-xs text-zinc-400'>{episodes ? episodes : "N/A"} Episodes</div>
        <div className='text-[13px] text-zinc-300 font-semibold mt-3'>
          <div>{score ? score : "NA"} by {scored_by ? `(${formatNumber(scored_by)})` : "N/A"}</div>
        </div>
      </div>
    </div>
  )
}

export default SeriesMovies