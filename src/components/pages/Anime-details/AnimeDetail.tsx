import React from 'react'
import { getRequest } from '../../../axios/axiosClient';
import { Link, useParams } from 'react-router-dom';
import { AnimeData, animeVideo } from '../../Types/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sliceText } from '../../functions/sliceText';
import { Tooltip } from 'react-tooltip'
import { IoIosPlay } from '@react-icons/all-files/io/IoIosPlay';
import { IoBookmarkOutline } from '@react-icons/all-files/io5/IoBookmarkOutline';
import { IoStar } from '@react-icons/all-files/io5/IoStar';
import 'react-tooltip/dist/react-tooltip.css'
import cat from "../../../assets/cat.svg";

import { formatNumber } from '../Card/CardInfo';

function Episode() {
  const [animeVideo, setAnimeVideo] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [detail, setDetail] = React.useState(true);
  const { id, title: slug } = useParams();

  React.useEffect(() => {
    const getEpisodes = () => {
      getRequest(`anime/${id}/videos`)
        .then(({ data }) => {
          setAnimeVideo(data.data);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
        })
    }

    getEpisodes();
  }, [id]);

  if (loading) {
    return "loading ...";
  }

  const handleClick = () => {
    setDetail(!detail)
  }

  if (animeVideo.episodes.length === 0) {
    return (
      <div className='mt-16 border border-dashed flex flex-col items-center space-y-5 p-5'>
        <div className='w-[250px] h-[250px]'>
          <img src={cat} alt="CAT" className='w-full h-full pointer-events-none' />
        </div>
        <div className='max-w-md text-center'>
          <div className='text-sm font-medium'>We couldn't find any available. Check back later or explore other content</div>
        </div>
      </div>
    )
  }

  const twelveEP = animeVideo.episodes.length > 12;

  return (
    <>
      <div className='relative mt-16 overflow-y-hidden' style={{ height: detail && twelveEP ? "650px" : "auto" }}>
        <div className='grid grid-cols-1 min-[580px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 min-[580px]:gap-5 lg:gap-6'>
          {animeVideo && animeVideo.episodes.map(({ images, title, episode }: { images: { jpg: { image_url: string } }, title: string, episode: string }, key: number) =>
            <div className='w-full flex flex-row min-[580px]:flex-col cursor-pointer' key={key}>
              {images.jpg.image_url ?
                <div className='relative flex-shrink-0 w-[50%] min-[580px]:w-full mr-3 aspect-video'>
                  <img src={images.jpg.image_url} className='w-full h-full' alt={title} />
                  <div className='w-[50px] h-[50px] md:w-[60px] md:h-[60px] absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 bg-zinc-950/50 flex items-center justify-center rounded-full'>
                    <IoIosPlay className="text-white w-[35px] h-[35px] md:w-[45px] md:h-[45px] -mr-[5px]" />
                  </div>
                </div>
                :
                <div className='flex-shrink-0 w-[50%] min-[580px]:w-full mr-3 aspect-video bg-zinc-800 flex items-center justify-center'>
                  <IoIosPlay className="text-zinc-500 w-[45px] h-[45px]" />
                </div>
              }
              <div className='mt-0 min-[580px]:mt-3 font-medium text-white'>
                <div className='text-xs text-zinc-400'>{slug}</div>
                <span className='text-[13px] min-[580px]:text-[14px] text-white'>{episode} - {sliceText(title, 22)}</span>
              </div>
            </div>
          )}
        </div>
        {detail && twelveEP && <div className='absolute bottom-0 w-full h-[500px] bg-gradient-to-t from-zinc-950'></div>}
      </div>
      <div className='mt-4 w-fit text-xs font-semibold text-zinc-400 hover:text-zinc-100 cursor-pointer transition-colors' onClick={handleClick}>
        {twelveEP &&
          <>
            {detail ? "MORE EPISODES" : "LESS EPISODES"}
          </>
        }
      </div>
    </>
  )
}

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
  }, [id])

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

        <Episode />

      </div>
    </>
  )
}

export default AnimeDetail