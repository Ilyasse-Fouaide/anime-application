import React from 'react'
import { getRequest } from '../../../axios/axiosClient';
import { useParams } from 'react-router-dom';
import { AnimeData } from '../../Types/types';

function AnimeDetail() {
  const [AnimeDetail, setAnimeDtail] = React.useState<AnimeData[]>([]);
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
    <div className='w-full h-[600px] bg-gray-100' ></div>
  )
}

export default AnimeDetail