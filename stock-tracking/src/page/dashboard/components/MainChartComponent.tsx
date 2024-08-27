import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import {
  StockChartEntity,
  StockCurrentChartEntity,
} from '../../../domain/entity/dashboard.entity';
import { getStockChart } from '../../../domain/usecase/dashboard.usecase';
import ARROW_DOWN_WHITE_ICON from '@src/assets/icon/arrow_down_white_icon.png';
import ARROW_UP_WHITE_ICON from '@src/assets/icon/arrow_up_white_icon.png';
import { useSocket } from '../../../context/socket/socket.context';
import { StockSocketEntity } from '../../../domain/entity/socket.entity';
import { formatFloatNumber } from '../../../common/util/format.util';

type MainChartComponentProps = {
  height?: number | string;
  width?: number | string;
  ticker: string;
};
function MainChartComponent({
  ticker,
  height = '100%',
  width = '100%',
}: MainChartComponentProps) {
  const [chartData, setChartData] = useState<StockChartEntity[]>([]);
  const [stockCurrent, setStockCurrent] = useState<StockCurrentChartEntity>();
  const { socket } = useSocket();
  useEffect(() => {
    const loadData = async () => {
      const data = await getStockChart(ticker);
      setChartData(data.data);
      setStockCurrent(data.stockCurrent);
    };
    loadData();
    socket?.on('new_stock', (newStock: StockSocketEntity) => {
      const closePrevDate = chartData[1].y![4] ?? 0;
      if (newStock.ticker === ticker) {
        setStockCurrent((prev) => {
          return {
            vol: newStock.vol,
            growthRate:
              closePrevDate === 0
                ? 0
                : newStock.close - closePrevDate / closePrevDate,
          } as StockCurrentChartEntity;
        });
        setChartData((prev) => {
          const newChartData = [...prev];
          if (newChartData[0] && newChartData[0].y) {
            newChartData[0].y[3] = newStock.close;
          }
          return newChartData;
        });
      }
    });
  }, [ticker]);

  const optionCandle: ApexOptions = {
    chart: {
      type: 'candlestick',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'dd MMM',
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    tooltip: {
      custom: (options: any) => {
        const { series, seriesIndex, dataPointIndex, w } = options;
        const data = series[seriesIndex][dataPointIndex];
        return `<div class="arrow_box">
          <span>Date: ${new Date(w.globals.seriesX[0][dataPointIndex]).toLocaleDateString()}</span><br>
          <span>Open: ${w.globals.seriesCandleO[0][dataPointIndex]}</span><br>
          <span>High: ${w.globals.seriesCandleH[0][dataPointIndex]}</span><br>
          <span>Low: ${w.globals.seriesCandleL[0][dataPointIndex]}</span><br>
          <span>Close: ${w.globals.seriesCandleC[0][dataPointIndex]}</span>
        </div>`;
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#00B746', // Color for upward candles
          downward: '#FF0000', // Color for downward candles
        },
      },
    },
    grid: {
      borderColor: '#e0e0e0',
      strokeDashArray: 5,
    },
  };

  return (
    <>
      <div className="my-4 flex">
        <div className="m-auto mx-[2rem] size-[3.6rem] rounded-full bg-gray-200 text-center align-middle text-[1.4rem] font-[700] leading-[3.6rem]">
          {ticker}
        </div>
        <span className="grow-[1]">
          <h3 className="text-[1.2rem] font-[700]">{ticker}</h3>
          <h5 className="text-[1rem] font-[500] text-[#8c8c8c]">{ticker}</h5>
        </span>
        <span className="">
          <div className="flex items-center">
            <div
              className={`mr-2 flex w-fit items-center rounded-md p-[0.05rem] ${stockCurrent?.growthRate! <= 0 ? 'bg-red-500' : 'bg-green-500'}`}
            >
              <p className="inline-block text-[0.8rem] text-white">
                {formatFloatNumber(stockCurrent?.growthRate!)}%
              </p>
              <img
                src={
                  stockCurrent?.growthRate! <= 0
                    ? ARROW_DOWN_WHITE_ICON
                    : ARROW_UP_WHITE_ICON
                }
                alt=""
                className="inline-block size-[0.8rem]"
              />
            </div>
            <p className="inline-block text-[1.4rem] font-[600]">
              {stockCurrent?.vol}
            </p>
          </div>
          <p className="text-[#7a7a7a]">
            Last update at {new Date().toLocaleTimeString()}
          </p>
        </span>
      </div>
      <hr />
      <div className="h-full">
        <ul className="mt-[1rem] flex items-center justify-between child-li:hover:cursor-pointer">
          <li className="box-border w-[5rem] rounded-[24px] bg-[#e9e6e6] p-2 text-center text-[0.8rem]">
            {/* w-[5rem] */}1 Day
          </li>
          <li className="box-border w-[5rem] rounded-[24px] bg-[#000000] p-2 text-center text-[0.8rem] text-white">
            1 Week
          </li>
          <li className="box-border w-[5rem] rounded-[24px] bg-[#e9e6e6] p-2 text-center text-[0.8rem]">
            1 Month
          </li>
          <li className="box-border w-[5rem] rounded-[24px] bg-[#e9e6e6] p-2 text-center text-[0.8rem]">
            All
          </li>
        </ul>
        <Chart
          options={optionCandle}
          series={[{ data: chartData }]}
          type="candlestick"
          height={height}
          width={width}
        />
      </div>
    </>
  );
}

export default MainChartComponent;
