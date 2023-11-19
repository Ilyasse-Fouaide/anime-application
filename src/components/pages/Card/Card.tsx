import { CardTypes } from '../../Types/types'
import CardInfo from './CardInfo'

function Card({ images, title, type, themes, episodes, score, scored_by, synopsis }: CardTypes) {

  return (
    <>
      <div className='w-full aspect-[2/3]'>
        <img
          src={images.jpg.large_image_url}
          alt={title}
          loading='lazy'
          className='object-cover w-full h-full'
        />
      </div>
      <h3 className='text-xs text-zinc-50 font-medium mt-3'>{title}</h3>
      <div className='text-xs text-zinc-400 mt-3 flex items-center'>
        <p className='mr-2'>{type}</p>
        <div className='hidden lg:block w-[2px] h-[10px] bg-zinc-500 mr-2'></div>
        <div className='hidden lg:flex items-center'>
          {themes.length !== 0 ? (
            <>
              {themes.map((theme, key: number) => (
                <p className='mr-1' key={key}>
                  {theme.name}
                </p>
              ))}
            </>
          ) : (
            <p>NA</p>
          )}
        </div>
      </div>
      <div className='z-0 absolute top-2 left-2 shadow-2xl shadow-white border-2 border-yellow-200'>
        <div className='text-[13px] font-medium text-zinc-50 py-[1px] px-[8px] bg-[var(--red)]'>EP {episodes ? episodes : "NA"}</div>
      </div>
      <CardInfo images={images} score={score} scored_by={scored_by} synopsis={synopsis} episodes={episodes} title={title} />
    </>
  )
}

export default Card