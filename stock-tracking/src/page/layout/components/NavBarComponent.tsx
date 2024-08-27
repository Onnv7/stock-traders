import STOCK_ICON from '@src/assets/icon/stock_icon.png';
import ARROW_UP_ICON from '@src/assets/icon/arrow_up_green_icon.png';
import VISIBILITY_OFF_ICON from '@src/assets/icon/visibility_off_icon.png';
import VISIBILITY_ON_ICON from '@src/assets/icon/visibility_on_icon.png';
import HOME_ICON from '@src/assets/icon/home_icon.png';
import DASHBOARD_ICON from '@src/assets/icon/dashboard_icon.png';
import WALLET_ICON from '@src/assets/icon/wallet_icon.png';
import NEWS_ICON from '@src/assets/icon/news_icon.png';
import STOCK_FUND_ICON from '@src/assets/icon/stock_fund_icon.png';
import DROPDOWN_ICON from '@src/assets/icon/dropdown_icon.png';
import COMMUNITY_ICON from '@src/assets/icon/community_icon.png';
import SETTING_ICON from '@src/assets/icon/setting_icon.png';
import CONTACT_ICON from '@src/assets/icon/contact_icon.png';
import { useState } from 'react';
function NavBarComponent() {
  const [openChildOfStockItem, setOpenChildOfStockItem] = useState(false);
  return (
    <div className="sticky flex h-[100vh] flex-col bg-white px-[12px]">
      <div className="my-[32px] flex w-full items-center justify-center">
        <img src={STOCK_ICON} alt="" className="mx-1 h-[20px]" />
        <p className="font-[600]">GoStock</p>
      </div>
      <div className="mb-4 flex w-full rounded-lg bg-black px-2 py-4 heir-p:text-white">
        <div className="ml-4 grow-[2]">
          <p className="text-[1rem]">TotalInvestment</p>
          <span>
            <p className="inline-block text-[1.6rem] font-[500]">$5390,90</p>
            <img
              src={VISIBILITY_OFF_ICON}
              alt=""
              className="mx-2 inline-block w-[16px]"
            />
          </span>
        </div>
        <div className="not-child flex h-fit h-full w-fit grow-[1] items-center justify-center">
          <p className="inline-block w-fit text-[#69e144]">+18,10% </p>
          <img src={ARROW_UP_ICON} alt="" className="inline-block w-[20px]" />
        </div>
      </div>
      <div className="grow-[1]">
        <ul className="child-li:flex child-li:cursor-pointer child-li:select-none child-li:items-center child-li:gap-1 child-li:rounded-lg child-li:px-2 child-li:py-2 child-li:font-[600] heir-img:mr-2 heir-img:w-[18px]">
          <li className="hover:bg-[#c1c6c5]">
            <img src={HOME_ICON} alt="" />
            <p>Home</p>
          </li>
          <li className="hover:bg-[#c1c6c5]">
            <img src={DASHBOARD_ICON} alt="" />
            <p>Dashboard</p>
          </li>
          <li className="hover:bg-[#c1c6c5]">
            <img src={WALLET_ICON} alt="" />
            <p>Wallet</p>
          </li>
          <li className="hover:bg-[#c1c6c5]">
            <img src={NEWS_ICON} alt="" />
            <p>News</p>
          </li>
          <li
            className="hover:bg-[#c1c6c5]"
            onClick={() => setOpenChildOfStockItem((prev) => !prev)}
          >
            <img src={STOCK_FUND_ICON} alt="" />
            <p className="grow-[1]">Stock & fund</p>
            <img
              src={DROPDOWN_ICON}
              alt=""
              className={`transition-transform ${openChildOfStockItem ? 'rotate-0' : '-rotate-90'}`}
            />
          </li>
          <li
            className={`not-child-li select-none overflow-hidden duration-500 ease-in-out ${openChildOfStockItem ? 'max-h-screen' : 'max-h-0'}`}
          >
            <ul className="child-li:cursor-pointer child-li:select-none child-li:rounded-lg child-li:py-2 child-li:pl-[30px]">
              <li className="hover:bg-[#c1c6c5]">Stock</li>
              <li className="hover:bg-[#c1c6c5]">Cryptocurrency</li>
              <li className="hover:bg-[#c1c6c5]">Mutual Fund</li>
              <li className="hover:bg-[#c1c6c5]">Gold</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="mb-[0px]">
        <hr className="mb-2" />
        <ul className="child-li:flex child-li:cursor-pointer child-li:select-none child-li:items-center child-li:gap-1 child-li:rounded-md child-li:px-2 child-li:py-2 child-li:font-[600] heir-img:mr-2 heir-img:w-[18px]">
          <li className="hover:bg-[#c1c6c5]">
            <img src={COMMUNITY_ICON} alt="" />
            <p>Our community</p>
          </li>
          <li className="hover:bg-[#c1c6c5]">
            <img src={SETTING_ICON} alt="" />
            <p>Settings</p>
          </li>
          <li className="hover:bg-[#c1c6c5]">
            <img src={CONTACT_ICON} alt="" />
            <p>Contact us</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBarComponent;
