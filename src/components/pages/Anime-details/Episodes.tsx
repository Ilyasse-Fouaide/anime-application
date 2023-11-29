import React from 'react'
import { useParams } from 'react-router-dom';
import { IoStar } from '@react-icons/all-files/io5/IoStar';
import { getRequest } from '../../../axios/axiosClient';
import { sliceText } from '../../functions/sliceText';
import moment from 'moment';
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";

const Episodes = () => {
  const [episodes, setEpisodes] = React.useState([]);
  const [page, setpage] = React.useState(1);
  const [more, setMore] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const { id } = useParams();

  React.useEffect(() => {
    getRequest(`anime/${id}/episodes?page=${page}`)
      .then(({ data }) => {
        setEpisodes(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false)
        setError(true)
        console.log(error);
      })
  }, []);

  const handleMore = () => {
    const episode = document.getElementById("episode");
    setMore(!more);
    if (more === false) {
      episode?.scrollIntoView({ behavior: "instant" });
    }
  }

  if (loading) {
    return "Loading ..."
  }

  if (error) {
    return "Something went wrong.";
  }

  return (
    <div id='episode' className={`mt-16 relative`}>

      <div className='overflow-y-hidden' style={{ height: more ? "710px" : "auto" }}>
        <div className='mb-6'>
          <h3 className='text-white text-lg font-semibold'>Episodes</h3>
          <p className='text-sm md:text-base text-zinc-400 mt-[8px]'>{episodes.length} Episodes</p>
        </div>

        {episodes && episodes.sort((a, b) => b.mal_id - a.mal_id).map(({ mal_id, title, aired, score }, key) => {
          return (
            <div className='my-2 py-2 px-5 flex items-center text-white divide-x divide-zinc-500 even:bg-zinc-950 odd:bg-zinc-900 cursor-pointer hover:bg-zinc-800' key={key}>
              <div className='pr-5 text-xs sm:text-sm md:text-base font-semibold w-[30px] md:w-[35px] flex items-center justify-center'>{mal_id}</div>
              <div className='px-5 w-full flex-grow'>
                <h3 className='text-xs sm:text-sm md:text-base font-semibold text-[var(--red)]'>{sliceText(title, 20)}</h3>
              </div>
              <div className='w-[150px] hidden flex-shrink-0 sm:block px-5 text-zinc-400 text-sm md:flex items-center justify-center'>
                <span>{moment(aired).format("MMM DD, YYYY")}</span>
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
            </div>
          )
        })}
      </div>

      {episodes.length > 15 &&
        <>
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-zinc-700`}></div>
          <div className='absolute cursor-pointer bottom-0 translate-y-1/2 right-1/2 translate-x-1/2 w-[52px] h-[52px] flex items-center justify-center text-[28px] font-medium text-zinc-100 bg-zinc-700 hover:bg-zinc-600 rounded-full' onClick={handleMore}>
            <IoIosArrowBack className={`${more ? "-rotate-90 -mb-1" : "rotate-90 -mt-1"} `} />
          </div>
        </>
      }

    </div >
  )
}

export default Episodes