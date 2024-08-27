import React from 'react';

function StockFavoriteComponent() {
  return (
    <li className="flex cursor-pointer rounded-md px-4 py-2">
      <div className="m-auto mr-4 size-[2.4rem] rounded-full bg-[#aff0ab] text-center text-[0.8rem] font-[500] leading-[2.4rem]">
        SPOT
      </div>
      <div className="grow-[1]">
        <h5 className="font-[700]">SPOT</h5>
        <h6 className="text-[#979494]">Spotify</h6>
      </div>
      <div>
        <h5 className="font-[500]">$310,40</h5>
        <h6 className="font-[500] text-red-500">-1,10%</h6>
      </div>
    </li>
  );
}

export default StockFavoriteComponent;
