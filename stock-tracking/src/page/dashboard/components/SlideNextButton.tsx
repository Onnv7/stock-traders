import { useSwiper } from 'swiper/react';
import NEXT_ICON from '@src/assets/icon/next_icon.svg';
import { useEffect } from 'react';
export default function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => {
        if (swiper) {
          swiper.slideNext();
        }
      }}
      className="pointer-events-auto select-none"
    >
      <img src={NEXT_ICON} alt="" className="w-[44px]" />
    </button>
  );
}
