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

  const handleNext = () => {
    setIndex(index === limit - 1 ? 0 : index + 1);
  }

  const handlePrev = () => {
    setIndex(index === 0 ? limit - 1 : index - 1);
  }

  const goTo = (i: number) => {
    setIndex(i);
  }

  React.useEffect(() => {
    const fetchAnime = () => {
      axios.get(`https://api.jikan.moe/v4/top/anime?filter=airing&limit=${limit}`)
        .then((response) => {
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

  React.useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);

    return () => clearInterval(interval);

  }, [index])

  if (loading) {
    return "Loading ...";
  }

  return (
    <div className='relative w-full h-[60vh] bg-zinc-950 overflow-x-hidden'>
      <div className='z-[10] absolute top-0 bottom-0 left-0 w-[2000px] bg-gradient-to-r from-zinc-950'></div>
      <div className='z-[10] absolute bottom-0 right-0 left-0 w-full h-[500px] bg-gradient-to-t from-zinc-950'></div>
      {animeData && animeData.map((anime, key) =>
        <div className={`absolute inset-0 transition-opacity bg-no-repeat bg-cover ${key === index ? 'opacity-100' : 'opacity-0'}`} key={key} style={{ backgroundImage: `url('${anime.trailer.images.maximum_image_url}')` }}>
          <div className='absolute top-1/2 -translate-y-1/2 left-0 z-[10] px-[65px] max-w-3xl'>
            <div className='text-[55px] text-zinc-50 font-medium tracking-tighter leading-[60px]'>{anime.title}</div>
            {anime.genres.map((genre, key) =>
              <span className='mt-[15px] text-[13px] text-zinc-400 inline-block mr-2' key={key}>{genre.name}</span>
            )}
            <div className='mt-[15px] text-[14px] text-zinc-200 leading-6'>{anime.synopsis.split("").splice(0, 300).join("") + "..."}</div>
            <div className='flex items-center mt-[60px]'>
              {["", "", "", "", "", ""].map((_el, key) =>
                <div className={`relative mr-3 h-[10px] transition-all duration-150 bg-zinc-500 rounded-full ${key === index ? 'w-[60px]' : 'w-[20px]'}`} key={key}>
                  <div className={`absolute left-0 bottom-0 top-0 bg-[#DD4854]  rounded-full ${key === index ? 'w-[100%] transition-all duration-[10s]' : 'w-0'}`} onClick={() => goTo(key)}></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className='z-[15] py-14 px-2 absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center cursor-pointer text-[36px]' onClick={handleNext}>
        <IoIosArrowForward />
      </div>
      <div className='z-[15] py-14 px-2 absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center cursor-pointer text-[36px]' onClick={handlePrev}>
        <IoIosArrowBack />
      </div>
    </div>
  )
}

export default Hero