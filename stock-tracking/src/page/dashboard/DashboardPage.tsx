import ARROW_DOWN_WHITE_ICON from '@src/assets/icon/arrow_down_white_icon.png';
import { SwiperSlide, Swiper } from 'swiper/react';
import StockCardComponent from './components/StockCardComponent';
import SlideNextButton from './components/SlideNextButton';
import SlidePrevButton from './components/SlidePrevButton';
import MainChartComponent from './components/MainChartComponent';
import { useEffect, useState } from 'react';
import { getStockCardList } from '../../domain/usecase/dashboard.usecase';
import { StockCardEntity } from '../../domain/entity/dashboard.entity';
import { useSocket } from '../../context/socket/socket.context';
import { getDateTimeCurrent } from '../../common/util/date.util';
import { StockSocketEntity } from '../../domain/entity/socket.entity';
import { useDashboardContext } from '../../context/dashboard/dashboard.context';
import StockFavoriteComponent from './components/StockFavoriteComponent';
import PLUS_ICON from '@src/assets/icon/plus_icon.png';

function DashboardPage() {
  const [stockCardList, setStockCardList] = useState<StockCardEntity[]>([]);
  const { socket } = useSocket();
  const { setNewChartTicker, chartTicker } = useDashboardContext();
  useEffect(() => {
    const loadData = async () => {
      const data = await getStockCardList(1, 30);
      setStockCardList(data.cardList!);
    };
    loadData();
    socket?.on('new_stock', (newStock: StockSocketEntity) => {
      const oldStock = stockCardList.find(
        (stock) => stock.ticker === newStock.ticker,
      );
      if (oldStock) {
        setStockCardList((prev) => {
          const growthRate = oldStock.data?.[1]?.close
            ? ((newStock.close - oldStock.data[1].close) /
                oldStock.data[1].close) *
              100
            : 0;

          const updatedStock = {
            ...prev[0],
            data: [
              {
                close: newStock.close,
                date: getDateTimeCurrent('date'),
              },
              ...prev[0].data!.slice(1),
            ],
            growthRate,
          };

          return [updatedStock, ...prev.slice(1)];
        });
      }
    });
  }, []);

  return (
    <div className="mx-auto flex h-full w-[95%] flex-col gap-[2rem]">
      <h1 className="mt-[1rem] text-[24px] font-[700]">My Portfoliio</h1>
      <div className="relative grid overflow-visible">
        <Swiper
          className="!static w-full"
          grabCursor={true}
          centeredSlides={false}
          initialSlide={0}
          slidesPerView={4}
          slidesPerGroup={1}
          spaceBetween={0}
          loop={false}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            // when window width is >= 480px
            658: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            // when window width is >= 640px
            1044: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1436: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
          }}
        >
          {stockCardList.map((stockCard) => (
            <SwiperSlide
            // className="!mr-2 !w-[300px]"
            // style={{ width: '300px' }}
            >
              <StockCardComponent
                stock={stockCard}
                onClick={() => setNewChartTicker(stockCard.ticker!)}
              />
            </SwiperSlide>
          ))}

          <span className="pointer-events-none absolute top-0 z-10 flex h-full w-[calc(100%_+_80px)] -translate-x-[40px] items-center justify-center opacity-50 transition-opacity ease-in-out hover:opacity-100">
            <span className="relative flex w-full items-center justify-between px-3">
              <SlidePrevButton />
              <SlideNextButton />
            </span>
          </span>
        </Swiper>
      </div>

      <div className="flex w-full grow-[1] gap-[2rem]">
        <div className="grow-[2] rounded-lg bg-white p-[1.5rem]">
          <MainChartComponent height={'70%'} ticker={chartTicker} />
        </div>
        <div className="grow-[1] rounded-lg bg-white p-[1.5rem]">
          <span className="flex justify-between">
            <h5 className="cursor-default font-[600]">My watchlist</h5>
            <img
              src={PLUS_ICON}
              alt=""
              className="size-[1.4rem] cursor-pointer"
            />
          </span>
          <span>
            <ul>
              <StockFavoriteComponent />
              <hr />
              <StockFavoriteComponent />
              <hr />
              <StockFavoriteComponent />
              <hr />
              <StockFavoriteComponent />
              <hr />
              <StockFavoriteComponent />
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
