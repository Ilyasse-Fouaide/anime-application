import axios from 'axios';
import React, { useState } from 'react'
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";

interface AnimeData {
  trailer: {
    images: {
      maximum_image_url: string
    }
  },
  title: string
}

function Hero() {
  const limit: number = 6
  const [animeData, setAnimeData] = React.useState<AnimeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);

  React.useEffect(() => {
    const fetchAnime = () => {
      axios.get(`https://api.jikan.moe/v4/seasons/now?filter=tv&limit=${limit}`)
        .then((response) => {
          console.log(response.data.data[0]);
          setAnimeData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            console.log("Network Error")
          }
          console.log(error.message)
          setLoading(false);
        });
    }
    fetchAnime();
  }, []);

  const handleNext = () => {
    setIndex(index === limit - 1 ? 0 : index + 1);
  }

  const handlePrev = () => {
    setIndex(index === 0 ? limit - 1 : index - 1);
  }

  if (loading) {
    return "Loading ...";
  }

  return (
    <div className='relative w-full h-[calc(75vh)] bg-slate-950'>
      {animeData && animeData.map((anime, key) =>
        <div className={`absolute inset-0 transition-opacity duration-150 ${key === index ? 'opacity-100' : 'opacity-0'}`}>
          <img src={anime.trailer.images.maximum_image_url} className={`w-full h-full object-center pointer-events-none`} alt={anime.title} />
        </div>
      )}

      <div className='py-14 px-5 absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center cursor-pointer text-[36px]' onClick={handleNext}>
        <IoIosArrowForward />
      </div>
      <div className='py-14 px-5 absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center cursor-pointer text-[36px]' onClick={handlePrev}>
        <IoIosArrowBack />
      </div>
    </div>
  )
}

export default Hero