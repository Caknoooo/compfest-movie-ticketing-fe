// import Swiper core and required modules
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Swiper, SwiperSlide } from 'swiper/react';

export default function SwiperComponent() {
  return (
    <div className='relative text-base-dark'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            // Customize the bullet point content and styling
            return (
              '<span class="' + className + '">Slide ' + (index + 1) + '</span>'
            );
          },
        }}
      >
        <SwiperSlide>
          <div className='h-20 w-full bg-base-green'>Slide 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='h-20 w-full bg-base-green'>Slide 2</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
