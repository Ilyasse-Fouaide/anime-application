import { Link } from 'react-router-dom'
import { CardTypes } from '../../Types/types'
import CardInfo from './CardInfo'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { slug } from '../../functions/slug';
import { IoStar } from '@react-icons/all-files/io5/IoStar';
import { sliceText } from '../../functions/sliceText';

function Card({ mal_id, images, title, type, episodes, score, scored_by, synopsis, slice }: CardTypes & { mal_id: number, slice: number }) {

  return (
    <Link to={`/series/${mal_id}/${slug(title)}`}>
      <div className='w-full aspect-[2/3]'>
        <LazyLoadImage
          src={images.jpg.large_image_url}
          placeholderSrc={images.jpg.small_image_url}
          effect="blur"
          alt={title}
          className="w-full aspect-[2/3] object-cover pointer-events-none"
        />
      </div>
      <h3 className='text-xs text-zinc-50 font-medium mt-3'>{sliceText(title, 30)}</h3>
      <div className='text-xs text-zinc-400 mt-3 flex items-center'>
        <p className='mr-2'>{type}</p>
        <IoStar className="cursor-pointer mr-2 text-[var(--red)]" />
        <span>{score ? score : "N/A"}</span>
      </div>
      <CardInfo images={images} score={score} scored_by={scored_by} synopsis={synopsis} episodes={episodes} title={title} slice={slice} />
    </Link>
  )
}

export default Card