import React from 'react'
import { getRequest } from '../../../axios/axiosClient';
import { useParams } from 'react-router-dom';
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import SkeletonRecomm from '../../Skeleton/SkeletonRecomm';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sliceText } from '../../functions/sliceText';

function Recommendations() {
  const [anime, setAnime] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const { id } = useParams();

  React.useEffect(() => {
    setAnime([]);
    setLoading(true);
    setError(false);
  }, [id]);

  React.useEffect(() => {
    getRequest(`anime/${id}/recommendations`)
      .then(({ data }) => {
        setAnime(data.data);
        setLoading(false);
      })
      .catch((_error) => {
        setError(true);
        setLoading(false);
      })
  }, [id]);

  if (loading) {
    return <SkeletonRecomm />
  }

  if (error) {
    return "Error ..."
  }

  if (anime.length === 0 && !error && !loading) {
    return ""
  }

  const slideLeft = () => {
    let left = document.getElementById("slider");
    left!.scrollLeft = left!.scrollLeft - 500
  }

  const slideRight = () => {
    let right = document.getElementById("slider");
    right!.scrollLeft = right!.scrollLeft + 500
  }

  return (
    <div className='pt-10'>
      <h3 className='mb-6 text-white text-lg font-semibold'>Recommendations</h3>
      <div className='relative'>
        <div id='slider' className='space-x-2 sm:space-x-6 md:space-x-8 lg:space-x-10 xl:space-x-4 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar'>
          {anime && anime.map(({ entry, votes }, key) => {
            return (
              <div className='relative w-[135px] min-[375px]:w-[160px] sm:w-[125px] md:w-[157px] lg:w-[132px] xl:w-[150px] aspect-[2/3] inline-block' key={key}>
                <div className='w-full aspect-[2/3]'>
                  <LazyLoadImage
                    src={entry.images.webp.large_image_url}
                    placeholderSrc={entry.images.webp.small_image_url}
                    effect="blur"
                    alt={entry.title}
                    className="w-full aspect-[2/3] object-cover pointer-events-none"
                  />
                </div>
                <div className='text-xs text-zinc-50 font-medium mt-3'>{sliceText(entry.title, 15)}</div>
                <div className='text-xs text-zinc-400 mt-3 flex items-center'>
                  <p className='mr-2'>{votes} Votes</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className='hidden md:block absolute w-[36px] h-[36px] top-1/3 right-0 translate-x-1/2  bg-[var(--red)] p-1 rounded-full cursor-pointer shadow-xl shadow-black/30' onClick={slideRight}>
          <IoIosArrowForward className="w-[26px] h-[26px] -mr-[1px]" />
        </div>
        <div className='hidden md:block absolute w-[36px] h-[36px] top-1/3 left-0 -translate-x-1/2 bg-[var(--red)] p-1 rounded-full cursor-pointer shadow-xl shadow-black/30' onClick={slideLeft}>
          <IoIosArrowBack className="w-[26px] h-[26px] -ml-[1px]" />
        </div>
      </div>
    </div>
  )
}

export default Recommendations