import { Link } from 'react-router-dom'
import { CardTypes } from '../../Types/types'
import CardInfo from './CardInfo'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Card({ mal_id, images, title, type, status, episodes, score, scored_by, synopsis }: CardTypes & { mal_id: number }) {

  return (
    <Link to={`series/${mal_id}/${title.split(" ").join("-")}`}>
      <div className='w-full aspect-[2/3]'>
        <LazyLoadImage
          src={images.jpg.large_image_url}
          placeholderSrc={images.jpg.small_image_url}
          effect="blur"
          alt={title}
          className="w-full aspect-[2/3] object-cover pointer-events-none"
        />
      </div>
      <h3 className='text-xs text-zinc-50 font-medium mt-3'>{title}</h3>
      <div className='text-xs text-zinc-400 mt-3 flex items-center'>
        <p className='mr-2'>{type}</p>
        <div className='hidden lg:block w-[2px] h-[10px] bg-zinc-500 mr-2'></div>
        <div className='hidden lg:block'>{status}</div>
      </div>
      <div className='z-0 absolute top-2 left-2 shadow-2xl shadow-white border-2 border-yellow-200'>
        <div className='text-[13px] font-medium text-zinc-50 py-[1px] px-[8px] bg-[var(--red)]'>EP {episodes ? episodes : "NA"}</div>
      </div>
      <CardInfo images={images} score={score} scored_by={scored_by} synopsis={synopsis} episodes={episodes} title={title} />
    </Link>
  )
}

export default Card