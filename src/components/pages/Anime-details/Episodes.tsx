import React from 'react'
import { useParams } from 'react-router-dom';
import { IoStar } from '@react-icons/all-files/io5/IoStar';
import { getRequest } from '../../../axios/axiosClient';
import { sliceText } from '../../functions/sliceText';
import moment from 'moment';

const Episodes = () => {
  const [episodes, setEpisodes] = React.useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    getRequest(`anime/${id}/episodes`)
      .then(({ data }) => {
        setEpisodes(data.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <div className='mt-16'>

      {episodes && episodes.map(({ mal_id, title, aired, score }, key) => {
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
              <span><IoStar /></span>
              <span>{score}</span>
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default Episodes