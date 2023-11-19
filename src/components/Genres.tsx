import React from 'react'
import { getRequest } from '../axios/axiosClient';
import { GenresType } from './Types/types';

function Genres() {
  const [genres, setGenres] = React.useState<GenresType[]>([]);

  React.useEffect(() => {
    getRequest('genres/anime')
      .then(({ data }) => {
        console.log(data);
        setGenres(data.data)
      })
  }, []);

  return (
    <div className='mt-20 mb-0 lg:mt-0 lg:mb-20'>
      {genres && genres.map(({ name, count }, key) =>
        <div>{name}</div>
      )}
    </div>
  )
}

export default Genres