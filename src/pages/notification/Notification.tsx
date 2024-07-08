import { IoSettingsOutline } from "react-icons/io5";
import { TopBar } from "../../components/common/TopBar";
import { useEffect, useState } from "react";
import cn from "../../utils/cn";
import ApiClient from "../../apis/apiClient";

import "./notification.css";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Notification() {
  const navigate = useNavigate();
  const [clickedIdx, setClickedIdx] = useState(0);
  const [notifications, setNotifications] = useState<notificationResType[]>();

  const category = ["전체", "입출금", "금융", "서비스", "혜택"];

  const getNotification = async () => {
    try {
      const res = await ApiClient.getInstance().notification();
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = (idx: number) => {
    setClickedIdx(idx);
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <>
      <TopBar title="알림" path="/" />
      <div className="pt-16 mb-12 mx-4">
        <ul className="flex justify-evenly items-center mb-8">
          {category.map((item, idx) => (
            <li
              key={idx}
              className={cn(
                clickedIdx === idx ? "bg-hanaNavy text-white" : "",
                "w-14 text-center bg-[#EFF0F4] rounded-xl cursor-pointer",
              )}
              onClick={() => handleCategory(idx)}
            >
              <div>{item}</div>
            </li>
          ))}
          <IoSettingsOutline className="cursor-pointer" size={24} />
        </ul>

        <ul className="flex flex-col gap-12">
          {notifications?.map((notification, idx) => (
            <li key={idx}>
              <div className="line">{notification.noticeCreatedAt}</div>
              <ul className="flex flex-col gap-8">
                {notification.notices.map((item) => (
                  <li key={item.noticeIdx} className="flex gap-2 justify-start">
                    {item.noticeCategory === "입출금" && (
                      <img
                        src="/images/transaction.png"
                        className="w-8 h-8"
                        alt="입출금"
                      />
                    )}
                    {item.noticeCategory === "금융" && (
                      <img
                        src="/images/economy.png"
                        className="w-8 h-8"
                        alt="금융"
                      />
                    )}
                    {item.noticeCategory === "서비스" && (
                      <img
                        src="/images/service.png"
                        className="w-8 h-8"
                        alt="서비스"
                      />
                    )}
                    {item.noticeCategory === "혜택" && (
                      <img
                        src="/images/gift.png"
                        className="w-8 h-8"
                        alt="혜택"
                      />
                    )}
                    {item.noticeCategory === "더영하나" && (
                      <img
                        src="/images/university.png"
                        className="w-8 h-8"
                        alt="더영하나"
                      />
                    )}
                    <div className="bg-white rounded-xl shadow-md py-4 px-6">
                      <div className="flex justify-between items-center font-bold mb-2">
                        <div>{item.noticeTitle}</div>
                        <IoIosArrowForward
                          size={18}
                          className="cursor-pointer"
                        />
                      </div>
                      <div>{item.noticeContent}</div>
                      {item.noticeContent.includes("입금") && (
                        <div
                          className="flex items-center gap-1 my-4 cursor-pointer"
                          onClick={() => navigate("/transfer")}
                        >
                          <div className="text-xs">입금하기</div>
                          <IoIosArrowForward size={12} />
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Notification;
