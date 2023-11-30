import React from 'react'
import useAnimeGenreFetch from './useAnimeGenreFetch'
import { useParams } from 'react-router-dom';
import Card from '../Card/Card';

function GenresAnime() {
  const [page, setPage] = React.useState(1);
  const { id, name } = useParams<{ id: string | undefined, name: string | undefined }>();

  const { animeGenres, loading, error } = useAnimeGenreFetch(id, page);

  if (error) {
    return "Error";
  }

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <h2 className='mb-3 mt-5 text-lg text-white font-semibold'>Top Anime "{name}"</h2>
      <div className='mb-6 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7'>
        {animeGenres && animeGenres.map(({ mal_id, images, title, type, status, episodes, score, scored_by, synopsis }, key) => (
          <div className='relative group overflow-hidden cursor-pointer' key={key}>
            <Card
              mal_id={mal_id}
              images={images}
              title={title}
              type={type}
              status={status}
              episodes={episodes}
              score={score}
              scored_by={scored_by}
              synopsis={synopsis}
              slice={100}
            />
          </div>
        ))}
      </div>
      {loading && "Loading ..."}
    </div>
  )
}

export default GenresAnime