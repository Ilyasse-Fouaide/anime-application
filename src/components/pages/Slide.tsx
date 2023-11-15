import _React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';

function Slide() {
  return (
    <div >
      <Swiper
        // allowTouchMove={false}
        breakpoints={{
          0: {
            spaceBetween: 30,
            slidesPerView: 1
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
        className='bg-slate-50 pl-[65px] pr-[65px]'
      >
        {["", "", "", "", "", "", "", "", "", ""].map((_el, key) =>
          <SwiperSlide className='bg-green-500 w-[100px] h-[100px]' key={key}>
            1
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  )
}

export default Slide