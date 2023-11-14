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
  title: string,
  genres: {
    name: string,
  }[],
  synopsis: string,
}

function Hero() {
  const limit: number = 6
  const [animeData, setAnimeData] = React.useState<AnimeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);

  React.useEffect(() => {
    const fetchAnime = () => {
      axios.get(`https://api.jikan.moe/v4/top/anime?filter=airing&limit=${limit}`)
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
    <div className='relative w-full h-[60vh] bg-zinc-950 overflow-x-hidden'>
      <div className='z-[10] absolute top-0 bottom-0 left-0 w-[3000px] bg-gradient-to-r from-black'></div>
      <div className='z-[10] absolute bottom-0 right-0 left-0 w-full h-[500px] bg-gradient-to-t from-black/90'></div>
      {animeData && animeData.map((anime, key) =>
        <div className={`absolute inset-0 transition-opacity bg-no-repeat bg-cover ${key === index ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: `url('${anime.trailer.images.maximum_image_url}')` }}>
          <div className='absolute top-1/2 -translate-y-1/2 left-0 z-[10] px-[65px] max-w-3xl'>
            <div className='text-[55px] font-medium tracking-tighter leading-[60px]'>{anime.title}</div>
            <div className='mt-[15px]'>{anime.synopsis.split("").splice(0, 300).join("") + "..."}</div>
          </div>
        </div>
      )}
      <div className='z-[15] py-14 px-5 absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center cursor-pointer text-[36px]' onClick={handleNext}>
        <IoIosArrowForward />
      </div>
      <div className='z-[15] py-14 px-5 absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center cursor-pointer text-[36px]' onClick={handlePrev}>
        <IoIosArrowBack />
      </div>
    </div>
  )
}

export default Hero