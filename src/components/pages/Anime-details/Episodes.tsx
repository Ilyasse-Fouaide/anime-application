import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { IoStar } from '@react-icons/all-files/io5/IoStar';
import { getRequest } from '../../../axios/axiosClient';
import { sliceText } from '../../functions/sliceText';
import moment from 'moment';
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import { IoIosPlay } from '@react-icons/all-files/io/IoIosPlay';
import { Episode } from '../../Types/types';
import SkeletonEpisodes from '../../Skeleton/SkeletonEpisodes';

function Ep({ mal_id, title, aired, score, }: Episode) {
  return (
    <Link to={`/episode/${mal_id}`} className='my-2 py-2 px-5 flex items-center text-white divide-x divide-zinc-500 even:bg-zinc-950 odd:bg-zinc-900 cursor-pointer hover:bg-zinc-800'>
      <div className='pr-5 text-xs sm:text-sm font-semibold w-[55px] flex items-center justify-center'>{mal_id}</div>
      <div className='px-5 w-full flex-grow flex items-center'>
        <div className='mr-2 flex items-center justify-center w-[16px] h-[16px] bg-[var(--red)] rounded-full'>
          <IoIosPlay className="text-[14px] text-white" />
        </div>
        <h3 className='text-xs sm:text-sm md:text-base font-semibold text-[var(--red)] hover:underline'>{sliceText(title, 20)}</h3>
      </div>
      <div className='w-[150px] hidden flex-shrink-0 sm:block px-5 text-zinc-400 text-[13px] md:flex items-center justify-center'>
        <span>{aired ? moment(aired).format("MMM DD, YYYY") : "N/A"}</span>
      </div>
      <div className='w-[90px] hidden flex-shrink-0 px-5 sm:flex items-center justify-center space-x-2'>
        {score ?
          <>
            <span><IoStar /></span>
            <span>{score}</span>
          </>
          :
          <span>N/A</span>
        }
      </div>
    </Link>
  )
}

const Episodes = () => {
  const [episodes, setEpisodes] = React.useState<Episode[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [_hasNext, setHasNext] = React.useState<boolean>(false);
  const [lastPage, setLastPage] = React.useState<number>(1);
  const [more, setMore] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const { id } = useParams<{ id: string | undefined }>();

  React.useEffect(() => {
    setEpisodes([]);
    setLoading(true);
    setMore(true);
    setError(false);
  }, [page])

  React.useEffect(() => {
    getRequest(`anime/${id}/episodes?page=${page}`)
      .then(({ data }) => {
        setEpisodes(data.data);
        setLoading(false);
        setHasNext(data.pagination.has_next_page)
        setLastPage(data.pagination.last_visible_page)
      })
      .catch((error) => {
        setLoading(false)
        setError(true)
        console.log(error);
      })
  }, [page]);

  const handleMore = () => {
    const episode = document.getElementById("episode");
    setMore(!more);
    if (more === false) {
      episode?.scrollIntoView({ behavior: "instant" });
    }
  }

  const handlePageClick = (key: number) => {
    const episode = document.getElementById("episode");
    setPage(key);
    episode?.scrollIntoView({ behavior: "smooth" });
  }

  function delayClick(key: number) {
    setTimeout(() => { handlePageClick(key) }, 1000)
  }

  if (loading) {
    return <SkeletonEpisodes />
  }

  if (error) {
    return "Something went wrong.";
  }

  return (
    <>
      <div id='episode' className={`mt-16 relative`}>

        <div className='overflow-y-hidden' style={{ height: more && episodes.length > 15 ? "705px" : "auto" }}>
          <div className='mb-6'>
            <h3 className='text-white text-lg font-semibold'>Episodes</h3>
          </div>

          {episodes && episodes.sort((a, b) => b.mal_id - a.mal_id).map(({ mal_id, title, aired, score }, key) => {
            return <Ep mal_id={mal_id} title={title} aired={aired} score={score} key={key} />
          })}
        </div>

        {episodes.length > 15 &&
          <>
            <div className={`${more ? "block" : "hidden"} absolute bottom-0 w-full h-[80px] bg-gradient-to-t from-zinc-950`}></div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-zinc-700`}></div>
            <button className='absolute cursor-pointer bottom-0 translate-y-1/2 right-1/2 translate-x-1/2 w-[52px] h-[52px] flex items-center justify-center text-[28px] font-medium text-zinc-100 bg-zinc-700 hover:bg-zinc-600 rounded-full' onClick={handleMore}>
              <IoIosArrowBack className={`${more ? "-rotate-90 -mb-1" : "rotate-90 -mt-1"} `} />
            </button>
          </>
        }

      </div>

      {lastPage > 1 &&
        <div className='mt-10 flex flex-wrap items-center justify-center md:justify-end gap-1'>
          {[...Array(lastPage).keys()].map((_el, key) =>
            <button
              className={`py-1 px-3 ${page === key + 1 ? "bg-[var(--red)] text-black" : "bg-zinc-800 text-white"} hover:bg-[var(--red)] hover:text-zinc-950 font-medium text-sm cursor-pointer`}
              onClick={() => delayClick(key + 1)}
              key={key}
            >
              {key + 1}
            </button>
          )}
        </div>
      }
    </>
  )
}

export default Episodes