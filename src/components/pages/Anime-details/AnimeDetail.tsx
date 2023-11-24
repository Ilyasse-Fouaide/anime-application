import React from 'react'
import { getRequest } from '../../../axios/axiosClient';
import { useParams } from 'react-router-dom';
import { AnimeData } from '../../Types/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sliceText } from '../../functions/sliceText';
import { Tooltip } from 'react-tooltip'
import { IoIosPlay } from '@react-icons/all-files/io/IoIosPlay';
import { IoBookmarkOutline } from '@react-icons/all-files/io5/IoBookmarkOutline';

import 'react-tooltip/dist/react-tooltip.css'

function Decription({ animeDetail }: any) {
  const [detail, setDetail] = React.useState(true);

  const handleClick = () => {
    setDetail(!detail)
  }

  return (
    <>
      {animeDetail?.synopsis.length >= 500 ?
        <>
          <div className='relative mt-6 overflow-hidden' style={{ height: detail ? "5rem" : "auto" }}>
            <p className='text-zinc-50 text-sm font-medium'>
              {animeDetail?.synopsis}
            </p>
            {detail && <div className='absolute bottom-0 w-full h-[50px] bg-gradient-to-t from-zinc-950'></div>}
          </div>
          <div className='mt-2 w-fit text-xs font-semibold text-zinc-400 hover:text-zinc-100 cursor-pointer transition-colors' onClick={handleClick}>
            MORE DETAIL
          </div>
        </>
        :
        <p className='mt-6 text-zinc-50 text-sm font-medium'>{animeDetail?.synopsis}</p>
      }

    </>
  )
}

function AnimeDetail() {
  const [animeDetail, setAnimeDtail] = React.useState<AnimeData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    const fetchAnimeDetai = () => {
      getRequest(`anime/${id}/full`)
        .then((response) => {
          setAnimeDtail(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        })
    }
    fetchAnimeDetai();
  }, [])

  if (loading) {
    return "";
  }

  return (
    <>
      <div className='relative w-full h-[500px] bg-no-repeat bg-cover bg-center overflow-hidden' style={{ backgroundImage: `url('${animeDetail?.images.jpg.small_image_url}')` }}>
        <div className='relative z-10 w-full h-full flex justify-center'>
          <LazyLoadImage
            src={animeDetail?.images.jpg.large_image_url}
            placeholderSrc={animeDetail?.images.jpg.small_image_url}
            effect="blur"
            alt={animeDetail?.title}
            className="h-full object-cover pointer-events-none select-none"
          />
        </div>

        {/* Effects */}
        <div className='absolute inset-0 bg-zinc-950/80'></div>
      </div>

      <div className='max-w-5xl mx-auto p-6'>
        <h2 className='max-w-xl text-[1.5rem] md:text-[30px] text-zinc-50 font-[500] leading-8 md:leading-9' data-tooltip-id="my-tooltip" data-tooltip-content={`${animeDetail?.title}`}>{sliceText(animeDetail?.title!, 50)}</h2>
        {animeDetail?.title.length! >= 50 &&
          <Tooltip id="my-tooltip" place='bottom' />
        }

        <div className='mt-2 flex items-start md:items-center space-x-2 text-xs sm:text-sm  font-medium'>
          <span className='text-zinc-400'>Japanese:</span>
          <h4 className='text-zinc-50'>{animeDetail?.title_japanese}</h4>
        </div>

        {/* Buttons */}
        <div className='flex justify-start mt-6'>
          <div className='flex items-center uppercase py-[8px] px-[15px] bg-zinc-950 font-semibold text-[var(--red)] cursor-pointer mr-2 border-2 border-[var(--red)] hover:text-orange-400 hover:border-orange-400'>
            <IoIosPlay className="mr-2 text-[23px]" />
            <span>
              watch now
            </span>
          </div>
          <div className='flex items-center uppercase py-[8px] px-[15px] bg-transparent text-zinc-400 font-semibold hover:text-zinc-100 hover:bg-zinc-800 cursor-pointer transition-colors'>
            <IoBookmarkOutline className="mr-2 text-[26px]" />
            <span className='hidden md:block'>
              Add To Watch list
            </span>
          </div>
        </div>

        <div></div>

        <Decription animeDetail={animeDetail} />

      </div >
    </>
  )
}

export default AnimeDetail