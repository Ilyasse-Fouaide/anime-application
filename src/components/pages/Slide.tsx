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
    <div className='relative select-none'>
      <Swiper
        modules={[Navigation]}
        breakpoints={{
          0: {
            spaceBetween: 10,
            slidesPerView: 2
          },
          640: {
            spaceBetween: 30,
            slidesPerView: 3
          },
          768: {
            spaceBetween: 30,
            slidesPerView: 4
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
        className='px-[20px] lg:px-[65px]'
      >
        {animeData &&
          animeData.map(({ images, title, type, themes }, key: number) => (
            <SwiperSlide className='relative cursor-pointer' key={key}>
              <div className='w-full aspect-[2/3]'>
                <img
                  src={images.jpg.large_image_url}
                  alt={title}
                  className='object-cover w-full h-full'
                />
              </div>
              <h3 className='text-xs text-zinc-50 font-medium mt-3'>{title}</h3>
              <div className='text-xs text-zinc-400 mt-3 flex items-center'>
                <p className='mr-2'>{type}</p>
                <div className='hidden lg:block w-[2px] h-[10px] bg-zinc-500 mr-2'></div>
                <div className='hidden lg:flex items-center'>
                  {themes.length !== 0 ? (
                    <>
                      {themes.map((theme, key: number) => (
                        <p className='mr-1' key={key}>
                          {theme.name}
                        </p>
                      ))}
                    </>
                  ) : (
                    <p>UNKNOWN</p>
                  )}
                </div>
              </div>
              <div className='absolute top-0'>adas</div>
            </SwiperSlide>
          ))}

      </Swiper>
      {/* Adding The arrow and shadows */}
      <div className='hidden group z-10 absolute top-0 bottom-0 left-0 w-[65px] h-full text-zinc-50 md:flex items-center justify-center cursor-pointer text-[26px]' ref={preRef}>
        <IoIosArrowBack />
        <div className='-z-10 absolute top-0 bottom-0 left-0 w-[200%] bg-gradient-to-r from-zinc-950/50 group-hover:from-zinc-950/90'></div>
      </div>
      <div className='hidden group z-10 absolute top-0 bottom-0 right-0 w-[65px] h-full text-zinc-50 md:flex items-center justify-center cursor-pointer text-[26px]' ref={nextRef}>
        <IoIosArrowForward />
        <div className='-z-10 absolute top-0 bottom-0 right-0 w-[200%] bg-gradient-to-l from-zinc-950/50 group-hover:from-zinc-950/90'></div>
      </div>
    </div>
  )
}

export default Slide