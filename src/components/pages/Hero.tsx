import axios from 'axios';
import React from 'react'

function Hero() {
  const [animeData, setAnimeData] = React.useState([]);

  React.useEffect(() => {
    const fetchAnime = () => {
      axios.get('https://api.jikan.moe/v4/seasons/now?filter=tv&limit=6')
        .then((response) => {
          console.log(response.data.data[0]);
          setAnimeData(response.data.data);
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            console.log("Network Error")
          }
          console.log(error)
        });
    }
    fetchAnime();
  }, []);

  return (
    <div className='relative w-full h-[calc(100vh-60px)] bg-slate-950'>
      {animeData &&
        <div className='absolute inset-0'>
          <img src={animeData[0]?.trailer.images.maximum_image_url} className='w-full h-full object-center pointer-events-none' alt="" />
        </div>
      }
      <div className='py-14 px-5 bg-white/50 absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center cursor-pointer'>Next</div>
      <div className='py-14 px-5 bg-white/50 absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center cursor-pointer'>Prev</div>
    </div>
  )
}

export default Hero