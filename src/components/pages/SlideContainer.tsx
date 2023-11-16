import React, { useRef } from 'react'
import axios from 'axios';
import axiosClient from '../../axios/axiosClient';
import { Swiper, SwiperSlide } from 'swiper/react'
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";
import numeral from "numeral";


import { AnimeData } from '../Types/types';

import { Navigation } from 'swiper/modules';
import 'swiper/css/autoplay';

import 'swiper/css';

export interface SlideContainerType {
  api: string,
  header: string,
  paragraph: string,
}

function SlideContainer({ api, header, paragraph }: SlideContainerType) {
  const [animeData, setAnimeData] = React.useState<AnimeData[]>([]);
  const [loading, isLoading] = React.useState<boolean>(true);
  const nextRef = useRef(null);
  const preRef = useRef(null);

  React.useEffect(() => {
    const fetchAnime = () => {
      axiosClient.get(api)
        .then(({ data }) => {
          setAnimeData(data.data);
          isLoading(false);
        })
        .catch((error) => {
          console.log(error);
          // if (error.response && error.response.status === 429) {
          //   const delay = (seconds: number) => {
          //     setTimeout(() => {
          //       fetchAnime();
          //     }, seconds)
          //   }

          //   delay(1000);
          // }
          isLoading(false);
        });
    };

    fetchAnime();

  }, []);

  if (loading) {
    return "Loading ...";
  }

  const formatNumber = (num: number): string | number => {
    if (num >= 1000 && num < 1000000) {
      return numeral(num).format('0a')
    } else if (num > 1000000) {
      return numeral(num).format('0.0a')
    } else {
      return num;
    }
  }

  return (
    <div className='mb-20'>
      <div className='px-[20px] lg:px-[65px] mb-[16px]'>
        <h2 className='text-[20px] md:text-[25px] text-white font-bold'>{header}</h2>
        <p className='text-sm md:text-base text-zinc-400 mt-[8px]'>{paragraph}</p>
      </div>
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
            animeData.map(({ images, title, type, themes, episodes, score, scored_by, synopsis }, key: number) => (
              <SwiperSlide className='relative group overflow-hidden cursor-pointer' key={key}>
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
                      <p>NA</p>
                    )}
                  </div>
                </div>
                <div className='z-0 absolute top-2 left-2 shadow-2xl shadow-white'>
                  <div className='text-[13px] font-medium text-zinc-50 py-[1px] px-[8px] bg-[var(--red)]'>EP {episodes ? episodes : "NA"}</div>
                </div>
                {/* // ! More info ------------------------------------------ */}
                <div className='z-10 hidden lg:block absolute inset-0 bg-black transition-transform translate-y-full group-hover:translate-y-0 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url('${images.jpg.large_image_url}')` }}>
                  <div className='w-full h-full bg-zinc-900/[.96] p-3'>
                    <h3 className='text-[14px] text-zinc-50 font-medium'>{title}</h3>
                    <div className='text-[13px] text-zinc-300 font-semibold mt-3'>
                      <div>{score ? score : "NA"} by {scored_by ? `(${formatNumber(scored_by)})` : "NA"}</div>
                    </div>
                    <div className='text-[13px] text-zinc-400 font-medium'>{episodes} Espisodes</div>
                    <p className='text-[13px] leading-[17px] text-zinc-50 font-medium mt-3'>
                      {synopsis ?
                        <>
                          {synopsis.length <= 200 ?
                            <>
                              {synopsis}
                            </>
                            :
                            <>
                              {synopsis.split("").splice(0, 200).join("") + "..."}
                            </>
                          }
                        </>
                        :
                        <>No Description Availabled</>
                      }
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}

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
    </div>
  )
}

export default SlideContainer