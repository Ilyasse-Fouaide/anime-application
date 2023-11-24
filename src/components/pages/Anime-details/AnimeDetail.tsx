import React from 'react'
import { getRequest } from '../../../axios/axiosClient';
import { useParams } from 'react-router-dom';
import { AnimeData } from '../../Types/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function AnimeDetail() {
  const [AnimeDetail, setAnimeDtail] = React.useState<AnimeData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    const fetchAnimeDetai = () => {
      getRequest(`anime/${id}/full`)
        .then((response) => {
          console.log(response.data.data)
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
    <div className='relative w-full h-[500px] bg-no-repeat bg-cover bg-center overflow-hidden' style={{ backgroundImage: `url('${AnimeDetail?.images.jpg.large_image_url}')` }}>
      <div className='relative z-10 w-full h-full flex justify-center'>
        <LazyLoadImage
          src={AnimeDetail?.images.jpg.large_image_url}
          placeholderSrc={AnimeDetail?.images.jpg.small_image_url}
          effect="blur"
          alt={AnimeDetail?.title}
          className="h-full pointer-events-none"
        />
      </div>

      {/* Effects */}
      <div className='absolute inset-0 bg-zinc-950/80 backdrop-blur-md'></div>
      <div className='absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 w-[500px] aspect-square rounded-full bg-zinc-950 blur-3xl'></div>
    </div>
  )
}

export default AnimeDetail