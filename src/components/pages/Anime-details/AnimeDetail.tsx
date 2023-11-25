import React from 'react'
import { getRequest } from '../../../axios/axiosClient';
import { useParams } from 'react-router-dom';
import { AnimeData } from '../../Types/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sliceText } from '../../functions/sliceText';
import { Tooltip } from 'react-tooltip'
import { IoIosPlay } from '@react-icons/all-files/io/IoIosPlay';
import { IoBookmarkOutline } from '@react-icons/all-files/io5/IoBookmarkOutline';
import { IoStar } from '@react-icons/all-files/io5/IoStar';
import 'react-tooltip/dist/react-tooltip.css'

import { formatNumber } from '../Card/CardInfo';
import Episode from './Episode';
import SkeltonAnimeDetail from '../../Skeleton/SkeltonAnimeDetail';


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
          <div className='mt-4 w-fit text-xs font-semibold text-zinc-400 hover:text-zinc-100 cursor-pointer transition-colors' onClick={handleClick}>
            {detail ? "MORE" : "LESS"}
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
  const [error, setError] = React.useState(false);
  const [inView, setInview] = React.useState(false);

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
          setError(true)
        })
    }
    fetchAnimeDetai();
  }, [id])

  const lastElement = React.useCallback((node: any) => {
    const observer = new IntersectionObserver((enties, observe) => {
      const isIntersecting = enties[0].isIntersecting;
      if (isIntersecting) {
        setInview(true);
      }
      if (isIntersecting) {
        observe.disconnect();
      }
    }, { threshold: 1 });
    if (node) {
      observer.observe(node);
    }
  }, []);

  if (loading) {
    return <SkeltonAnimeDetail />;
  }

  if (error) {
    return "Error ..."
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
        <h2 className='max-w-xl text-[1.5rem] md:text-[30px] text-white font-[500] leading-8 md:leading-9' data-tooltip-id="my-tooltip" data-tooltip-content={`${animeDetail?.title}`}>{sliceText(animeDetail?.title!, 50)}</h2>
        {animeDetail?.title.length! >= 50 &&
          <Tooltip id="my-tooltip" place='bottom' />
        }

        <div className='mt-2 mb-5 md:mb-16 flex items-start md:items-center space-x-2 text-xs sm:text-sm font-medium'>
          <span className='text-zinc-400'>Japanese:</span>
          <h4 className='text-zinc-50'>{animeDetail?.title_japanese}</h4>
        </div>

        <div className='flex items-center space-x-3 text-[13px] md:text-[15px] font-medium text-zinc-50'>
          <div className='flex items-center space-x-2'>
            <span>{animeDetail?.score ? animeDetail?.score : "N/A"}</span>
            <IoStar className="cursor-pointer" />
            <span>{animeDetail?.scored_by ? `(${formatNumber(animeDetail?.scored_by!)})` : "N/A"}</span>
          </div>
          <div className='h-[10px] w-[1px] bg-zinc-400'></div>
          <div className='space-x-1'>
            <span className='text-zinc-400'>Favorites:</span>
            <span>{animeDetail?.favorites ? formatNumber(animeDetail?.favorites!) : "N/A"}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex justify-start mt-4'>
          <div className='flex items-center uppercase py-[8px] px-[15px] bg-zinc-950 font-semibold text-[var(--red)] cursor-pointer mr-2 border-2 border-[var(--red)] hover:text-orange-400 hover:border-orange-400'>
            <IoIosPlay className="mr-0 min-[320px]:mr-2 text-[23px]" />
            <span className='hidden min-[320px]:block'>
              watch now
            </span>
          </div>
          <div className='flex items-center uppercase py-[8px] px-[15px] bg-transparent text-zinc-400 font-semibold hover:text-zinc-100 hover:bg-zinc-800 cursor-pointer transition-colors'>
            <IoBookmarkOutline className="mr-0 md:mr-2 text-[26px]" />
            <span className='hidden md:block'>
              Add To Watch list
            </span>
          </div>
        </div>

        <Decription animeDetail={animeDetail} />

        <div className='mt-5 flex flex-wrap items-center'>
          {animeDetail?.genres.map((genre, key) =>
            <div className='text-xs uppercase py-1 px-2 transition-colors bg-slate-700 hover:bg-slate-600 mr-2 my-1 cursor-pointer' key={key}>{genre.name}</div>
          )}
        </div>

        <div className='mt-5 py-3 border-b border-b-zinc-600 flex items-start justify-between text-zinc-50 font-medium'>
          <div>Producers</div>
          <div className='text-xs max-w-[50%] text-right'>
            {animeDetail?.producers.length === 0 && 'N/A'}
            {animeDetail?.producers.map(({ name }, key) =>
              <span key={key}>{`${name}, `}</span>
            )}
          </div>
        </div>

        <div className='py-3 border-b border-b-zinc-600 flex items-start justify-between text-zinc-50 font-medium'>
          <div>Studio</div>
          <div className='text-xs max-w-[50%] text-right'>
            {animeDetail?.studios.length === 0 && 'N/A'}
            {animeDetail?.studios.map(({ name }, key) =>
              <span key={key}>{`${name}`}</span>
            )}
          </div>
        </div>

        <div ref={lastElement}>
          {inView &&
            <Episode />
          }
        </div>

      </div>
    </>
  )
}

export default AnimeDetail