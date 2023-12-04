import React from 'react'
import { getRequest } from '../../../axios/axiosClient';
import { Link, useParams } from 'react-router-dom';
import { AnimeData } from '../../Types/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sliceText } from '../../functions/sliceText';
import { Tooltip } from 'react-tooltip'
import { IoIosPlay } from '@react-icons/all-files/io/IoIosPlay';
import { IoBookmarkOutline } from '@react-icons/all-files/io5/IoBookmarkOutline';
import { IoStar } from '@react-icons/all-files/io5/IoStar';
import { formatNumber } from '../Card/CardInfo';
import VideosEpisodes from './VideosEpisodes';
import SkeltonAnimeDetail from '../../Skeleton/SkeltonAnimeDetail';
import LazyLoadComponent from '../../LazyLoadComp/LazyLoadComponent';
import Relation from './Relation';
import Review from './Review';
import Recommendations from './Recommendations';
import Episodes from './Episodes';
import { slug } from '../../functions/slug';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';

import 'react-tooltip/dist/react-tooltip.css'

function PlayIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
  )
}

function Trailer({ animeDetail, title }: { animeDetail: any, title: string | undefined }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenClick = () => {
    const body = document.querySelector("body");
    setIsOpen(true);
    body?.classList.add("overflow-hidden")
  }

  const handleCloseClick = () => {
    setIsOpen(false);
  }

  return (
    <>
      <AnimatePresence>
        {isOpen &&
          <>
            <div className='z-40 fixed inset-0 w-full h-[100vh] bg-black/70'></div>
            <motion.div
              className='hidden min-[850px]:block z-50 fixed top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 bg-zinc-800 w-[800px] aspect-video'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className='relative w-[800px] aspect-video bg-zinc-800'>
                <motion.div className='w-full h-full'>
                  <iframe className='w-full h-full' src={animeDetail.trailer.embed_url} frameBorder="0" allowFullScreen></iframe>
                </motion.div>
                <button className='z-50 w-[36px] h-[36px] absolute top-0 -translate-y-1/2 right-0 translate-x-1/2 bg-[var(--red)] rounded-full flex items-center justify-center cursor-pointer' onClick={handleCloseClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[26px] h-[26px] text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          </>
        }
      </AnimatePresence >

      <div className='hidden min-[850px]:block w-[300px]'>
        <div className='w-[300px] aspect-video bg-zinc-800' onClick={handleOpenClick}>
          {/* Image Trailer */}
          <div className='relative w-full h-full rounded-md overflow-hidden cursor-pointer'>
            <img src={animeDetail?.trailer?.images?.small_image_url} alt={title} className='w-full h-full object-cover object-center pointer-events-none' loading='lazy' />
            <div className='z-10 flex items-center justify-center rounded-full w-16 h-16 bg-black/60 absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2'>
              <PlayIcon className='w-10 h-10 text-white -mr-1' />
            </div>
          </div>
        </div>
        <button className='w-full mt-4 py-2 bg-[var(--red)] text-zinc-950 text-sm uppercase font-semibold text-center cursor-pointer'>See More info</button>

        {/* Extra Info */}
        {/* <ul className='mt-3 px-2 py-1 w-full border-b border-b-zinc-700'>
              <li className='text-zinc-200 font-medium text-sm my-1'>Ranked <span className='text-white font-semibold'>#{animeDetail?.rank}</span></li>
              <li className='text-zinc-200 font-medium text-sm my-1'>Popularity <span className='text-white font-semibold'>#{animeDetail?.popularity}</span></li>
              <li className='text-zinc-200 font-medium text-sm my-1'>Members <span className='text-white font-semibold'>#{formatNumber(animeDetail?.members)}</span></li>
            </ul> */}
        {/* <ul className='px-2 py-1 w-full'>
              <li className='text-zinc-400 font-medium text-xs my-1'>Type: <span className='text-zinc-100 font-semibold'>{animeDetail?.type}</span></li>
              <li className='text-zinc-400 font-medium text-xs my-1'>Episodes: <span className='text-zinc-100 font-semibold'>{animeDetail?.episodes}</span></li>
              <li className='text-zinc-400 font-medium text-xs my-1'>Status: <span className='text-zinc-100 font-semibold'>{animeDetail?.status}</span></li>
              <li className='text-zinc-400 font-medium text-xs my-1'>Aired: {" "}
                <span className='text-zinc-100 font-semibold'>
                  {animeDetail?.aired.from ? moment(animeDetail?.aired.from).format("DD MMM, YYYY") : "N/A"}
                  {" to "}
                  {animeDetail?.aired.to ? moment(animeDetail?.aired.to).format("DD MMM, YYYY") : "N/A"}
                </span>
              </li>
              <li className='text-zinc-400 font-medium text-xs my-1'>Premiered: {" "}
                <span className='text-zinc-100 font-semibold'>{animeDetail?.season} {animeDetail?.year}</span>
              </li>
              <li className='text-zinc-400 font-medium text-xs my-1'>Duration: {" "}
                <span className='text-zinc-100 font-semibold'>{animeDetail?.duration}</span>
              </li>
              <li className='text-zinc-400 font-medium text-xs my-1'>Source: {" "}
                <span className='text-zinc-100 font-semibold'>{animeDetail?.source}</span>
              </li>
              <li className='text-zinc-400 font-medium text-xs my-1'>Rating: {" "}
                <span className='text-zinc-100 font-semibold'>{animeDetail?.rating}</span>
              </li>
            </ul> */}
      </div>
    </>
  )
}

function Decription({ animeDetail }: any) {
  const [detail, setDetail] = React.useState(true);

  const handleClick = () => {
    const scroll = document.getElementById("scrollto");
    setDetail(!detail)
    if (!detail) {
      scroll?.scrollIntoView()
    }
  }

  return (
    <>
      {animeDetail?.synopsis.length >= 500 ?
        <>
          <div className='relative mt-6 overflow-hidden' style={{ height: detail ? "5rem" : "auto" }}>
            <div className='text-zinc-50 text-sm font-medium'>
              {animeDetail?.synopsis.split('\n').map((el: string, key: number) => <p className='my-5' key={key}>{el}</p>)}
            </div>
            {detail && <div className='absolute bottom-0 w-full h-[50px] bg-gradient-to-t from-zinc-950'></div>}
          </div>
          <button className='mt-4 w-fit text-xs font-semibold text-zinc-400 hover:text-zinc-100 cursor-pointer transition-colors' onClick={handleClick}>
            {detail ? "MORE" : "LESS"}
          </button>
        </>
        :
        <div className='mt-6 text-zinc-50 text-sm font-medium'>{animeDetail?.synopsis.split('\n').map((el: string, key: number) => <p className='my-5' key={key}>{el}</p>)}</div>
      }

    </>
  )
}

function AnimeDetail() {
  const [animeDetail, setAnimeDtail] = React.useState<AnimeData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { id, title } = useParams();
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setAnimeDtail(null);
    setLoading(true);
  }, [id])

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

  if (loading) {
    return <SkeltonAnimeDetail />;
  }

  if (error) {
    return "Error ..."
  }

  return (
    <>
      <div className='relative w-full h-[400px] min-[425px]:h-[500px] bg-no-repeat bg-cover bg-center overflow-hidden' style={{ backgroundImage: `url('${animeDetail?.images.jpg.small_image_url}')` }}>
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
        <div className='flex'>
          <div className='w-full mr-0 min-[850px]:mr-5'>
            <h1 className='max-w-xl text-[1.5rem] md:text-[30px] text-white font-[500] leading-8 md:leading-9' data-tooltip-id="my-tooltip" data-tooltip-content={`${animeDetail?.title}`}>{sliceText(animeDetail?.title!, 50)}</h1>
            {animeDetail?.title.length! >= 50 &&
              <Tooltip id="my-tooltip" place='bottom' />
            }

            <div className='mt-2 mb-5 md:mb-16 flex items-start md:items-center space-x-2 text-xs sm:text-sm font-medium'>
              <span className='text-zinc-400'>Japanese:</span>
              <h2 className='text-zinc-50'>{animeDetail?.title_japanese}</h2>
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
              <button className='flex items-center uppercase py-[8px] px-[15px] bg-zinc-950 font-semibold text-[var(--red)] cursor-pointer mr-2 border-2 border-[var(--red)] hover:text-orange-400 hover:border-orange-400'>
                <IoIosPlay className="mr-0 min-[320px]:mr-2 text-[23px]" />
                <span className='hidden min-[320px]:block'>
                  watch now
                </span>
              </button>
              <button className='flex items-center uppercase py-[8px] px-[15px] bg-transparent text-zinc-400 font-semibold hover:text-zinc-100 hover:bg-zinc-800 cursor-pointer transition-colors'>
                <IoBookmarkOutline className="mr-0 md:mr-2 text-[26px]" />
                <span className='hidden md:block'>
                  Add To Watch list
                </span>
              </button>
            </div>


            <Decription animeDetail={animeDetail} />

            <div className='mt-5 flex flex-wrap items-center'>
              {animeDetail?.genres.map(({ mal_id, name }, key) =>
                <Link to={`/genre/${mal_id}/${slug(name)}`} className='py-1 px-2 mr-2 my-1 cursor-pointer transition-colors bg-slate-700 hover:bg-slate-600' key={key}>
                  <div className='text-xs uppercase'>{name}</div>
                </Link>
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
          </div>
          <Trailer animeDetail={animeDetail} title={title} />
        </div>

        <LazyLoadComponent>
          <Episodes />
        </LazyLoadComponent>

        <LazyLoadComponent>
          <VideosEpisodes />
        </LazyLoadComponent>

        <div className='mt-5 border-t border-t-zinc-700 py-5'>
          <div className='flex items-center justify-between'>
            <div>
              {animeDetail?.relations.map(({ relation, entry }, key) =>
                <Relation relation={relation} entry={entry} text={"Previous season"} rel={"Prequel"} key={key} />
              )}
            </div>
            <div>
              {animeDetail?.relations.map(({ relation, entry }, key) =>
                <Relation relation={relation} entry={entry} text={"Next season"} rel={"Sequel"} key={key} />
              )}
            </div>
          </div>
        </div>

        <LazyLoadComponent>
          <Review />
        </LazyLoadComponent>

        <LazyLoadComponent>
          <Recommendations />
        </LazyLoadComponent>

      </div>
    </>
  )
}

export default AnimeDetail