import React from 'react'
import axios from 'axios';
import { getRequest } from '../../axios/axiosClient';
import { Swiper, SwiperSlide } from 'swiper/react'
import numeral from "numeral";

import { AnimeData } from '../Types/types';

import { Navigation } from 'swiper/modules';
import 'swiper/css/autoplay';

import 'swiper/css';
import 'swiper/css/navigation';
import Card from './Card/Card';

export interface SlideContainerType {
  api: string,
  header?: string,
  paragraph?: string,
}

function SlideContainer({ api, header, paragraph }: SlideContainerType) {
  const [animeData, setAnimeData] = React.useState<AnimeData[]>([]);
  const [loading, isLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const fetchAnime = () => {
      getRequest(api, cancelToken.token)
        .then(({ data }) => {
          setAnimeData(data.data);
          isLoading(false);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.error("axios error: ", error.message);
          } else {
            console.error(error);
          }
          isLoading(false);
        });
    };

    fetchAnime();

    return () => cancelToken.cancel("Canceled")

  }, []);

  const formatNumber = (num: number): string | number => {
    if (num >= 1000 && num < 1000000) {
      return numeral(num).format('0a')
    } else if (num > 1000000) {
      return numeral(num).format('0.0a')
    } else {
      return num;
    }
  }

  if (loading) {
    return "Loading ...";
  }

  return (
    <div className='mt-20 mb-0 lg:mt-0 lg:mb-20'>
      <div className='px-[20px] lg:px-[65px] mb-[16px]'>
        <h2 className='text-[20px] md:text-[25px] text-white font-bold'>{header}</h2>
        <p className='text-sm md:text-base text-zinc-400 mt-[8px]'>{paragraph}</p>
      </div>
      <div className='relative select-none'>
        <Swiper
          modules={[Navigation]}
          navigation={{
            enabled: true
          }}
          slidesPerGroup={6}
          breakpoints={{
            0: {
              spaceBetween: 10,
              slidesPerView: 2,
              navigation: {
                enabled: false
              },
              slidesPerGroup: 2
            },
            640: {
              spaceBetween: 30,
              slidesPerView: 3,
              navigation: {
                enabled: false
              },
              slidesPerGroup: 3
            },
            768: {
              spaceBetween: 30,
              slidesPerView: 4,
              navigation: {
                enabled: false
              },
              slidesPerGroup: 4,
            },
            1024: {
              spaceBetween: 30,
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            1280: {
              spaceBetween: 30,
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            1536: {
              spaceBetween: 30,
              slidesPerView: 6
            },
          }}
          className='px-[20px] lg:px-[65px]'
        >
          {animeData &&
            animeData.map(({ images, title, type, themes, episodes, score, scored_by, synopsis }, key: number) => (
              <SwiperSlide className='relative group overflow-hidden cursor-pointer' key={key}>
                <Card images={images} title={title} type={type} themes={themes} episodes={episodes} score={score} scored_by={scored_by} synopsis={synopsis} key={key} />
              </SwiperSlide>
            ))}

        </Swiper>
      </div>
    </div>
  )
}

export default SlideContainer