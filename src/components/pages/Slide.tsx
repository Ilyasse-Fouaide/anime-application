import React, { useRef } from 'react'
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react'
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";

import { AnimeData } from '../Types/types';

import { Navigation } from 'swiper/modules';
import 'swiper/css/autoplay';

import 'swiper/css';

function Slide() {
  const filter = "tv"
  const [animeData, setAnimeData] = React.useState<AnimeData[]>([]);
  const [loading, isLoading] = React.useState<boolean>(true);
  const nextRef = useRef(null);
  const preRef = useRef(null);

  React.useEffect(() => {
    const fetchAnime = () => {
      axios.get(`https://api.jikan.moe/v4/seasons/now?filter=${filter}`)
        .then(({ data }) => {
          console.log(data);
          setAnimeData(data.data);
          isLoading(false);
        })
        .catch((error) => {
          console.log(error);
          isLoading(false);
        });
    };
    fetchAnime();
  }, []);

  return (
    <div className='relative'>
      <Swiper
        modules={[Navigation]}
        breakpoints={{
          0: {
            spaceBetween: 30,
            slidesPerView: 2
          },
          640: {
            spaceBetween: 30,
            slidesPerView: 2
          },
          768: {
            spaceBetween: 30,
            slidesPerView: 3
          },
          1024: {
            spaceBetween: 30,
            slidesPerView: 4
          },
          1280: {
            spaceBetween: 30,
            slidesPerView: 5
          },
          1536: {
            spaceBetween: 30,
            slidesPerView: 6
          },
        }}
        navigation={{
          nextEl: nextRef.current,
          prevEl: preRef.current,
          disabledClass: 'swiper-button-disabled'
        }}
        className='px-[65px]'
      >
        {animeData && animeData.map((anime, key) =>
          <SwiperSlide className='bg-zinc-800 w-[100px]' key={key}>
            <img src={anime.images.jpg.large_image_url} alt="" />
          </SwiperSlide>
        )}
      </Swiper>
      {/* Adding The arrow and shadows */}
      <div className='group z-10 absolute top-0 bottom-0 left-0 w-[65px] h-full text-zinc-50 flex items-center justify-center cursor-pointer text-[26px] disabled:text-red-500' ref={preRef}>
        <IoIosArrowBack />
        <div className='-z-10 absolute top-0 bottom-0 left-0 w-[200%] bg-gradient-to-r from-zinc-950/80 group-hover:from-zinc-950/90'></div>
      </div>
      <div className='group z-10 absolute top-0 bottom-0 right-0 w-[65px] h-full text-zinc-50 flex items-center justify-center cursor-pointer text-[26px]' ref={nextRef}>
        <IoIosArrowForward />
        <div className='-z-10 absolute top-0 bottom-0 right-0 w-[200%] bg-gradient-to-l from-zinc-950/80 group-hover:from-zinc-950/90'></div>
      </div>
    </div>
  )
}

export default Slide