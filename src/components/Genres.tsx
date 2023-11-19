import React from 'react'
import { getRequest } from '../axios/axiosClient';

function Genres() {
  const [genres, setGenres] = React.useState([]);

  React.useEffect(() => {
    getRequest('genres/anime')
      .then(({ data }) => {
        console.log(data);
        setGenres(data)
      })
  }, []);

  return (
    <div className='bg-red-500 h-5 mt-20 mb-0 lg:mt-0 lg:mb-20'>
      <div className='w-full flex justify-center'>
        <div className='font-medium'>Still looking for Anime to watch?</div>
      </div>
    </div>
  )
}

export default Genres