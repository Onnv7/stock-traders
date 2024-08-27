import MAIL_ICON from '@src/assets/icon/mail_icon.png';
import NOTIFICATION_ICON from '@src/assets/icon/notification_icon.png';
import AVATAR_ICON from '@src/assets/icon/avt_icon.png';
import KEYBOARD_ARROW_DOWN_ICON from '@src/assets/icon/keyboard_arrow_down_icon.png';
function TopBarComponent() {
  return (
    <div className="flex items-center justify-between bg-white px-[20px] py-[24px]">
      <input
        type="text"
        placeholder="&#128269; Press &#x1FA9F; to search for various stocks"
        className="h-[28px] w-[500px] rounded-lg bg-[#f5f7f9] px-2 py-4 outline-none"
      />
      <div className="flex items-center justify-center gap-4 child-img:h-[28px] child-img:cursor-pointer">
        <img src={MAIL_ICON} alt="" />
        <img src={NOTIFICATION_ICON} alt="" />
        <div className="h-[20px] border-[0.1px] border-gray-300" />
        <span className="cursor-pointer">
          <img
            src={AVATAR_ICON}
            alt=""
            className="inline size-[32px] rounded-full"
          />
          <p className="mx-2 inline font-[600]">Nguyen Van An</p>
          <img
            src={KEYBOARD_ARROW_DOWN_ICON}
            alt=""
            className="inline size-[20px]"
          />
        </span>
      </div>
    </div>
  );
}

export default TopBarComponent;
