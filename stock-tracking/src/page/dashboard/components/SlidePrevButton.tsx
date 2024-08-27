import { useSwiper } from 'swiper/react';
import PREV_ICON from '@src/assets/icon/prev_icon.svg';

export default function SlidePrevButton() {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slidePrev()}
      className="pointer-events-auto select-none"
    >
      <img src={PREV_ICON} alt="" className="w-[44px]" />
    </button>
  );
}
