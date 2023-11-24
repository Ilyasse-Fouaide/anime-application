import React from 'react'
import { getRequest } from '../../../axios/axiosClient';
import { useParams } from 'react-router-dom';
import { AnimeData } from '../../Types/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sliceText } from '../../functions/sliceText';
import { Tooltip } from 'react-tooltip'

import 'react-tooltip/dist/react-tooltip.css'

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
      <div className='relative w-full h-[500px] bg-no-repeat bg-cover bg-center overflow-hidden' style={{ backgroundImage: `url('${animeDetail?.images.jpg.large_image_url}')` }}>
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
        <div className='absolute inset-0 bg-zinc-950/80 backdrop-blur-md'></div>
        <div className='absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 w-[500px] aspect-square rounded-full bg-zinc-950 blur-3xl'></div>
      </div>

      <div className='max-w-5xl mx-auto p-6'>
        <h1 className='max-w-xl text-[40px] text-zinc-50 font-[500] leading-[45px]' data-tooltip-id="my-tooltip" data-tooltip-content={`${animeDetail?.title}`}>{sliceText(animeDetail?.title!, 50)}</h1>
        {animeDetail?.title.length! >= 50 &&
          <Tooltip id="my-tooltip" place='bottom' />
        }
      </div>
    </>
  )
}

export default AnimeDetail