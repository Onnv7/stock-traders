import React from 'react';
import MiniAreaChartComponent from './MiniChartComponent';
import ARROW_DOWN_ICON from '@src/assets/icon/arrow_down_red_icon.png';
import ARROW_UP_ICON from '@src/assets/icon/arrow_up_green_icon.png';
import { StockCardEntity } from '../../../domain/entity/dashboard.entity';
import { formatFloatNumber } from '../../../common/util/format.util';
type StockCardComponentProps = {
  stock: StockCardEntity;
  onClick: () => void;
};

function StockCardComponent({ stock, onClick }: StockCardComponentProps) {
  return (
    <div
      className="aspect-[4/2] w-[260px] min-w-[200px] cursor-pointer rounded-md bg-white py-[0.5rem] child:px-[2.5rem]"
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[1rem] font-[700]">{stock.ticker}</h1>
        <div className="relative !min-h-0">
          <MiniAreaChartComponent
            chartColor={stock.growthRate! > 0 ? '#52ca75' : '#ff5959'}
            height={100}
            width={100}
            data={stock.data!.map((item) => item.close).reverse()}
          />
        </div>
      </div>
      <span className="mb-2 flex items-center justify-between text-[0.9rem]">
        <h3 className="text-[#838383]">Total Shares</h3>
        <h3 className="font-[500]">{stock.vol}</h3>
      </span>
      <span className="flex items-center justify-between text-[0.9rem]">
        <h3 className="text-[#838383]">Total Return</h3>
        <div className="flex items-center">
          <h3
            className={`inline font-[500] ${stock.growthRate! > 0 ? 'text-green-400' : 'text-red-600'}`}
          >
            {formatFloatNumber(stock.growthRate!) ?? 0}%
          </h3>
          <img
            src={stock.growthRate! > 0 ? ARROW_UP_ICON : ARROW_DOWN_ICON}
            alt=""
            className="inline size-[18px]"
          />
        </div>
      </span>
    </div>
  );
}

export default StockCardComponent;
