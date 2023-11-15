import axios from 'axios';
import React, { useState } from 'react'
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import { IoIosPlay } from "@react-icons/all-files/io/IoIosPlay";
import { IoBookmarkOutline } from "@react-icons/all-files/io5/IoBookmarkOutline";
import { FiClock } from "@react-icons/all-files/fi/FiClock";
import Skeleton from "./Sleleton";

interface Children {
  children: React.ReactNode
}

interface Trailer {
  trailer?: {
    images: { maximum_image_url: string }
  }
}

interface AnimeData extends Trailer {
  title: string,
  genres: {
    name: string,
  }[],
  synopsis: string,
  type: string,
  duration: string
}

interface ImageTrailer extends Children, Trailer {
  className: string,
}

const HeroContainer = ({ children, }: Children) => {
  return (
    <div className='relative w-full h-[600px] overflow-x-hidden'>
      {children}
    </div>
  )
}

const ImageTrailer = ({ children, className, trailer }: (ImageTrailer)) => {
  return (
    <div className={`absolute inset-0 bg-no-repeat bg-cover bg-top ${className}`} style={{ backgroundImage: `url('${trailer?.images.maximum_image_url}')` }}>
      {children}
    </div>
  )
}

const HeroContent = ({ title, type, duration, genres, synopsis, index, goTo }: AnimeData & { index: number, goTo: (k: number) => void }) => {
  return (
    <div className='absolute h-[500px] flex flex-col justify-between top-1/2 -translate-y-1/2 left-0 z-[10] px-[65px] max-w-3xl'>
      <div className='text-[30px] sm:text-[40px] md:text-[55px] text-zinc-50 font-medium tracking-tighter mt-[70px] leading-[60px]'>
        {title.length >= 20 ? title.split("").splice(0, 20).join("") + "..." : title}
      </div>

      <div className='flex-grow mt-10 text-[12px] sm:text-[13px]'>
        <span className=' text-zinc-400 inline-block items-center mr-5'>
          <IoIosPlay className="mr-1 inline" />
          {type}
        </span>
        <span className='text-zinc-400 inline-block mr-5'>
          <FiClock className="mr-1 inline" />
          {duration === "Unknown" ? "Unknown" : duration.split("").splice(0, 2).join("") + " min"}
        </span>
        {genres.map((genre, key) =>
          <span className='text-zinc-400 inline-block mr-2' key={key}>{genre.name}</span>
        )}
        <div className='hidden md:block mt-1 text-[14px] text-zinc-200 leading-6'>
          {synopsis.split("").splice(0, 300).join("") + "..."}
        </div>
      </div>

      <div className='flex'>
        <div className='bg-[#DD4854] mr-3 text-zinc-950 font-semibold uppercase inline-flex items-center py-[7px] px-[20px] cursor-pointer'>
          <IoIosPlay className="mr-2 text-[23px]" />
          Watch episode
        </div>
        <div className='py-[7px] px-[6px] bg-transparent border-2 border-[#DD4854] text-[26px] text-[#DD4854] cursor-pointer'>
          <IoBookmarkOutline />
        </div>
      </div>

      <div className='flex items-center mt-[60px]'>
        {["", "", "", "", "", ""].map((_el, key) =>
          <div className={`relative mr-3 h-[10px] transition-all duration-300 bg-zinc-500 cursor-pointer rounded-full overflow-hidden ${key === index ? 'w-[60px]' : 'w-[20px]'}`} key={key} onClick={() => goTo(key)}>
            <div className={`absolute left-0 bottom-0 top-0 bg-[#DD4854] cursor-pointer ${key === index ? 'w-[100%] transition-all duration-[10s]' : 'w-0'}`}></div>
          </div>
        )}
      </div>
    </div>
  )
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
    return <Skeleton />;
  }

  return (
    <div className='relative w-full h-[950px] lg:h-[600px]'>
      {animeData && animeData.map(({ trailer, title, type, duration, genres, synopsis }, key) =>
        <div className={`absolute inset-0 flex flex-col-reverse lg:flex-row duration-1000 ${key === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <div className='bg-zinc-950 w-full lg:w-1/2 lg:h-full flex items-start justify-center lg:items-center mb-24'>

            <div className='w-full pl-[25px] pr-[25px] lg:pl-[65px] lg:pr-0'>
              <h1 className='text-[50px] w-full tracking-tighter text-center lg:text-left font-semibold leading-[1]'>{title}</h1>

              <div className='flex items-center justify-center lg:justify-start text-zinc-500 text-[14px] mt-3 lg:mt-10'>
                <div className='text-center lg:text-left mr-5'>{type}</div>
                <div className='text-center lg:text-left mr-5'>
                  {duration === "Unknown" ? "Unknown" :
                    <>
                      {duration.split("").splice(0, 2).join("") + " min"}
                    </>
                  }
                </div>
                <div className='text-center lg:text-left flex items-center justify-center'>
                  {genres.map((genre, key) =>
                    <div className='mr-2' key={key}>{genre.name}</div>
                  )}
                </div>
              </div>

              <div className='hidden lg:block text-center lg:text-left mt-1'>
                {synopsis.length <= 200 ?
                  <>
                    {synopsis}
                  </>
                  :
                  <>
                    {synopsis.split("").splice(0, 200).join("") + "..."}
                  </>
                }
              </div>

              <div className='flex justify-center lg:justify-start mt-10'>
                <div className='flex items-center uppercase py-[8px] px-[15px] bg-[#DD4854] font-semibold text-zinc-950 cursor-pointer mr-2'>
                  <IoIosPlay className="mr-2 text-[23px]" />
                  watch episode
                </div>
                <div className='py-[7px] px-[6px] bg-transparent border-2 border-[#DD4854] text-[26px] text-[#DD4854] cursor-pointer hover:bg-[#DD4854] hover:text-zinc-950 transition-colors'>
                  <IoBookmarkOutline />
                </div>
              </div>

              <div className='flex items-center justify-center lg:justify-start mt-16'>
                {["", "", "", "", "", ""].map((_el, key) =>
                  <div className={`group relative mr-3 h-[10px] transition-all duration-300 bg-zinc-500 hover:bg-[#DD4854]/70 cursor-pointer rounded-full overflow-hidden ${key === index ? 'w-[60px]' : 'w-[20px]'}`} key={key} onClick={() => goTo(key)}>
                    <div className={`absolute left-0 bottom-0 top-0 bg-[#DD4854] cursor-pointer ${key === index ? 'w-[100%] transition-all duration-[10s]' : 'w-0'}`}></div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='w-full h-full'>
            <div className='relative w-full h-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url('${trailer?.images.maximum_image_url}')` }}>
              <div className='absolute inset-0 bg-gradient-to-r from-zinc-950 hidden lg:block'></div>
              <div className='absolute inset-0 bg-gradient-to-t from-zinc-950'></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hero