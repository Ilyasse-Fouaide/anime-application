import React from 'react'
import { getRequest } from '../../../axios/axiosClient';
import { useParams } from 'react-router-dom';
import { AnimeData } from '../../Types/types';

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
    return "Loading ...";
  }

  return (
    <div className='relative w-full h-[600px] bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url('${AnimeDetail?.images.jpg.large_image_url}')` }}>
      <div>
        {/* content */}
      </div>
      {/* Effects */}
      <div className='absolute inset-0 bg-zinc-950/80 backdrop-blur-md backdrop-grayscale'></div>
      {/* <div className='absolute inset-'></div> */}
    </div>
  )
}

export default AnimeDetail