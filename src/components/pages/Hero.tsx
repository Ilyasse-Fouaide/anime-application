import axios from 'axios';
import React, { useRef, useState } from 'react'
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import { IoIosPlay } from "@react-icons/all-files/io/IoIosPlay";
import { IoBookmarkOutline } from "@react-icons/all-files/io5/IoBookmarkOutline";
import { FiClock } from "@react-icons/all-files/fi/FiClock";
import Skeleton from "./Sleleton";

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

function Hero() {
  const limit: number = 6
  const [animeData, setAnimeData] = React.useState<AnimeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);
  const synopsisRef = useRef<HTMLDivElement | null>(null);

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

  }, [index]);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className='relative w-full h-[950px] lg:h-[600px]'>
      {animeData && animeData.map(({ trailer, title, type, duration, genres, synopsis }, key) =>
        <div className={`absolute inset-0 flex flex-col lg:flex-row-reverse duration-500 ${key === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <div className='w-full h-1/3 lg:h-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url('${trailer?.images.maximum_image_url}')` }}>
            <div className='relative w-full h-full'>
              <div className='absolute inset-0 bg-gradient-to-r from-zinc-950 hidden lg:block'></div>
              <div className='absolute inset-0 bg-gradient-to-t from-zinc-950'></div>
            </div>
          </div>
          <div className='bg-transparent w-full lg:w-1/2 lg:h-full flex items-start justify-center lg:items-center mb-24 -mt-20 lg:-mt-0 z-10'>

            <div className='w-full pl-[25px] pr-[25px] lg:pl-[65px] lg:pr-0'>
              <h1 className='text-[26px] md:text-[50px] w-full lg:w-[200%] tracking-tighter text-center lg:text-left font-semibold leading-[1]'>
                {/* {title} */}
                {title.length < 20 ?
                  <>
                    {title}
                  </>
                  :
                  <>
                    {title.split("").splice(0, 20).join("") + "..."}
                  </>
                }
              </h1>

              <div className='w-full lg:w-[200%] flex flex-col sm:flex-row items-center justify-center lg:justify-start text-zinc-500 text-[12px] lg:text-[14px] mt-3 lg:mt-10'>
                <div className='text-center lg:text-left mr-5'>
                  <IoIosPlay className="mr-1 inline" />
                  {type}
                </div>
                <div className='text-center lg:text-left mr-5'>
                  <FiClock className="mr-1 inline" />
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

              <div className='w-full lg:w-[140%] hidden lg:block text-center lg:text-left mt-1 bg-slate-300' ref={synopsisRef}>
                <div className='w-full h-[72px]'>

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
        </div>
      )}
      <div className='z-10 absolute top-1/2 left-0 -translate-y-1/2 text-[30px] py-10 pl-4 cursor-pointer hover:opacity-50'>
        <IoIosArrowBack />
      </div>
      <div className='z-10 absolute top-1/2 right-0 -translate-y-1/2 text-[30px] py-10 pr-4 cursor-pointer hover:opacity-50'>
        <IoIosArrowForward />
      </div>
    </div>
  )
}

export default Hero