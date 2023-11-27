import React from 'react'
import { getRequest } from '../../../axios/axiosClient';
import { useParams } from 'react-router-dom';

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
      .catch((error) => {
        setError(true);
        setLoading(false);
      })
  }, [id]);

  if (loading) {
    return "loading ..."
  }

  if (error) {
    return "Error ..."
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
        <div id='slider' className='space-x-2 sm:space-x-6 lg:space-x-8 xl:space-x-4 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar'>
          {anime && anime.map(({ entry }, key) => {
            return (
              <div className='relative w-[160px] sm:w-[125px] md:w-[157px] lg:w-[132px] xl:w-[150px] aspect-[2/3] inline-block' key={key}>
                <img src={entry.images.webp.large_image_url} alt={entry.title} className='w-full h-full object-cover object-center' />
                <div>
                  <h3 className='text-xs text-zinc-50 font-medium mt-3'>{entry.title}</h3>
                  {/* <div className='text-xs text-zinc-400 mt-3 flex items-center'>
                    <p className='mr-2'>type</p>
                    <div className='hidden lg:block w-[2px] h-[10px] bg-zinc-500 mr-2'></div>
                    <div className='hidden lg:block'>status</div>
                  </div> */}
                </div>
              </div>
            )
          })}
        </div>
        <div onClick={slideLeft}>Left</div>
        <div onClick={slideRight}>Right</div>
      </div>
    </div>
  )
}

export default Recommendations