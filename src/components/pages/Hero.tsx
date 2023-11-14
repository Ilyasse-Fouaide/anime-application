import axios from 'axios';
import React from 'react'
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";

interface AnimeData {
  trailer: {
    images: {
      maximum_image_url: string
    }
  }
}

function Hero() {
  const [animeData, setAnimeData] = React.useState<AnimeData[]>([]);

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
    <div className='relative w-full h-[calc(75vh)] bg-slate-950'>
      {animeData &&
        <div className='absolute inset-0'>
          <img src={animeData[0]?.trailer.images.maximum_image_url} className='w-full h-full object-cover pointer-events-none' alt="" />
        </div>
      }
      <div className='py-14 px-5 absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center cursor-pointer text-[36px]'>
        <IoIosArrowForward />
      </div>
      <div className='py-14 px-5 absolute top-1/2 -translate-y-1/2 left-0 flex items-center justify-center cursor-pointer text-[36px]'>
        <IoIosArrowBack />
      </div>
    </div>
  )
}

export default Hero