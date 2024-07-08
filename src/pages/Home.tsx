import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import cn from "../utils/cn";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";
import ApiClient from "../apis/apiClient";
import { Button } from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/scrollbar";

export default function Home() {
  // 스크롤 감지해서 탭바 보여주기
  const navigate = useNavigate();
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [showTabBar, setShowTabBar] = useState<boolean>(true);
  const isExistToken = getCookie("accessToken");
  const [loading, setLoading] = useState<boolean>(false);
  const [myAccounts, setMyAccounts] = useState<AccountsType[]>([]);

  const getAccounts = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getAccounts();
      if (res.data) {
        setMyAccounts(res.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeCookie("accessToken");
    removeCookie("deptIdx");
    removeCookie("refreshToken");
    removeCookie("fcmToken");
    removeCookie("isAdmin");
    location.replace("/");
  };

  useEffect(() => {
    if (isExistToken) getAccounts();
  }, []);

  const handleClick = async () => {
    if (isExistToken) {
      try {
        const res = await ApiClient.getInstance().theyounghanaLogin();
        console.log(res);
        if (res.status === 200) {
          setCookie("deptIdx", String(res.data.data?.deptIdx));
          if (getCookie("deptIdx")) {
            location.replace("/studentCard");
          }
        }
      } catch (error) {
        console.log(error);
        navigate("/notfoundstudent");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* 상단 바로가기메뉴 (이름, 원큐지갑, QR, 알림) */}
      <div className="flex flex-row gap-1 px-6 pt-4 sm:pt-14 pb-4 w-full absolute top-0 z-10 bg-hanaBgGray">
        <div className="w-full flex justify-between items-center mr-1 font-bold underline-offset-4">
          <div className="flex flex-row gap-3 items-center">
            {isExistToken ? (
              <AiOutlineUser size={30} />
            ) : (
              <Link to="/login">
                <span className="underline text-lg font-bold"> 로그인</span>
              </Link>
            )}

            <div className="text-sm border border-black rounded-full px-2 font-bold text-center py-0.5">
              전체계좌
            </div>
          </div>
          {isExistToken && (
            <div className="flex gap-2 items-center">
              <div
                className=" text-gray-400 cursor-pointer"
                onClick={() => navigate("/notification")}
              >
                <FaBell size={24} />
              </div>
              <div className=" text-gray-400 cursor-pointer" onClick={logout}>
                <IoLogOut size={24} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className="flex flex-col items-center w-full h-full overflow-y-auto overflow-x-hidden bg-hanaBgGray mt-12"
        onScroll={(e) => {
          const scrollTop = e.currentTarget.scrollTop;
          setShowTabBar(lastScrollTop > scrollTop || scrollTop <= 0);
          setLastScrollTop(scrollTop);
        }}
      >
        {/* 메인 타일 큰거 */}
        <div>
          <Swiper
            className="w-iPhone z-0"
            slidesPerView={1.1}
            centeredSlides
            scrollbar
            modules={[Scrollbar]}
          >
            <SwiperSlide className="!h-fit">
              <div className="mt-4 mx-2 mb-8 bg-white rounded-2xl shadow">
                {isExistToken && myAccounts ? (
                  <div className="flex flex-col p-6">
                    <div className="flex flex-row gap-1 items-end w-full">
                      <span className="font-extrabold">
                        {myAccounts[0] ? myAccounts[0].accountName : ""}
                      </span>
                      <div className="flex-grow" />
                      <span className="text-sm underline text-gray-400">
                        한도계좌
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">
                      입출금 {myAccounts[0] ? myAccounts[0].accountNumber : ""}{" "}
                      <span className="underline"> 복사 </span>
                    </span>
                    <div className="flex flex-row gap-1 items-center my-2">
                      <span className="font-bold text-2xl">
                        {myAccounts[0]
                          ? myAccounts[0].accountBalance.toLocaleString()
                          : ""}
                      </span>
                      <span className="font-bold text-xl">원</span>
                      <span className="bg-gray-200 text-sm rounded-full px-1">
                        숨김
                      </span>
                    </div>
                    <div className="flex flex-row gap-1 w-full font-bold mt-2 justify-between mb-4">
                      <Button className="!w-5/12 !bg-gray-200 !text-black">
                        가져오기
                      </Button>
                      <Button className="!w-5/12"> 보내기</Button>
                      <Button className="!w-fit !px-3 !bg-gray-200 !text-black">
                        ···
                      </Button>
                    </div>
                    <div className="flex flex-row gap-1 font-bold">
                      <span className="bg-gray-100 rounded-md text-sm p-1">
                        문혜영
                      </span>
                      <span className="bg-gray-100 rounded-md text-sm p-1">
                        이은수
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 items-center w-full p-4">
                    <span className="text-sm">로그인하고 안전하게</span>
                    <div className="flex flex-row items-center">
                      <span className="text-xl font-bold">
                        잔액을 조회하세요
                      </span>
                      <IoIosArrowForward />
                    </div>
                    <img
                      className="h-16 my-1"
                      src={`/images/main_account.jpg`}
                      alt="account"
                    />
                    <div className="flex flex-row justify-center w-full gap-1 font-bold mt-2">
                      <Button className="w-1/2 !bg-gray-200 !text-black">
                        가져오기
                      </Button>
                      <Button className="w-1/2"> 보내기</Button>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
            <SwiperSlide className="!h-fit">
              <div className="mt-4 mx-2 mb-8 bg-white rounded-2xl shadow">
                <div className="flex flex-col items-center w-full p-4">
                  <span className="text-sm">마이데이터로 스마트하게</span>
                  <div className="flex flex-row gap-1 items-center">
                    <span className="text-xl font-bold">자산을 관리하세요</span>
                    <IoIosArrowForward />
                  </div>
                  <div className="h-24"></div>

                  <div className="flex flex-row gap-1 justify-center w-full font-bold mt-2">
                    <Button className="w-1/2 !bg-gray-200 !text-black">
                      자산등록
                    </Button>
                    <Button className="w-1/2"> 자산조회 </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="flex gap-4">
          <div className="w-36 h-40 rounded-xl bg-white shadow-md p-5">
            <img src="images/hana.svg" className="w-9 h-fit" />
            <div className="font-extrabold my-3">
              하나금융그룹 신용대출 조회
            </div>
            <div className="text-gray-400 text-sm">자세히 보기</div>
          </div>

          <div
            className="w-40 h-40 rounded-xl bg-white shadow-md p-5 cursor-pointer"
            onClick={handleClick}
          >
            <img src="images/backpack.svg" className="w-7 h-fit" />
            <div className="font-extrabold my-3">대학생활 동반자 더영하나</div>
            <div className="text-gray-400 text-sm">자세히 보기</div>
          </div>
        </div>

        {/* 카드 리스트 */}
        <div className="flex flex-col w-full gap-4 p-4">
          {/* 카드 1 */}
          <div className="flex flex-col w-full px-6 py-4 bg-indigo-500 rounded-2xl">
            <div className="flex flex-row items-center justify-between text-gray-200">
              <span className="font-bold">마이데이터 자산</span>
              <IoIosArrowForward className="text-white" />
              <div className="flex-grow" />
            </div>
            {isExistToken ? (
              <>
                <div className="flex flex-row items-end gap-0 mb-2 text-white">
                  <span className="text-3xl font-bold">{0}</span>
                  <div className="flex flex-row items-center">
                    <span className="text-xl font-bold"> 원 </span>
                    <span className="bg-indigo-700 text-sm rounded-full px-2 ml-2">
                      숨김
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center my-3 text-white text-lg">
                로그인 후 <br /> 자산을 확인해 보세요
              </div>
            )}

            <div className="flex flex-row items-center pt-4 font-bold text-white border-t border-indigo-200 justify-evenly">
              <button className="">투자관리</button>
              <span className="text-indigo-200">|</span>
              <button className="">대출케어</button>
              <span className="text-indigo-200">|</span>
              <button className="">연금관리</button>
            </div>
          </div>
          {/* 카드 2 */}
          <div className="w-full h-32 px-6 py-4 rounded-2xl bg-sky-500" />
          {/* 카드 3 */}
          <div className="w-full h-32 px-6 py-4 rounded-2xl bg-emerald-400" />
        </div>
      </div>

      {/* 하단 탭바 */}
      <div
        className={cn(
          "flex flex-col gap-1 absolute bottom-0 w-full bg-white py-3 overflow-hidden transition-transform rounded-t-3xl shadow shadow-black",
          showTabBar ? "" : "translate-y-40",
        )}
      >
        <div className="flex flex-row gap-2 mx-4 pb-3 overflow-x-hidden text-nowrap rounded-xl overflow-hidden">
          <span className="bg-gray-100 rounded-md text-sm p-2">
            <span className="text-emerald-300">●</span> 푸시알림설정
          </span>
          <span className="bg-gray-100 rounded-md text-sm p-2">
            <span className="text-pink-400">●</span>
            이벤트
          </span>
          <span className="bg-gray-100 rounded-md text-sm p-2">
            <span className="text-indigo-400">●</span>
            잔돈투자하기
          </span>
          <span className="bg-gray-100 rounded-md text-sm p-2">
            <span className="text-emerald-400">●</span>
            전체계좌
          </span>
          <span className="bg-gray-100 rounded-md text-sm p-2">
            <span className="text-orange-400">●</span>
            외화환전
          </span>
        </div>
        <div className="mx-4 border-b border-gray-200" />
        <div className="flex flex-row font-bold pb-3">
          <div className="flex flex-col items-center flex-grow text-hanaGreen text-sm">
            <img
              className="w-11 h-11 p-1 opacity-80"
              src={`/images/main-tab-01.png`}
              alt="main-tab-01"
            />
            <span>홈</span>
          </div>
          <div className="flex flex-col items-center flex-grow text-dark text-sm">
            <img
              className="w-11 h-11 p-1 opacity-80"
              src={`/images/main-tab-02.png`}
              alt="main-tab-02"
            />
            <span>상품</span>
          </div>
          <div className="flex flex-col items-center flex-grow text-dark text-sm">
            <img
              className="w-11 h-11 p-1 opacity-80"
              src={`/images/main-tab-03.png`}
              alt="main-tab-03"
            />
            <span> 자산 </span>
          </div>
          <div className="flex flex-col items-center flex-grow text-dark text-sm">
            <img
              className="w-11 h-11 p-1 opacity-80"
              src={`/images/main-tab-04.png`}
              alt="main-tab-04"
            />
            <span>주식</span>
          </div>
          <div className="flex flex-col items-center flex-grow font-bold text-dark text-sm">
            <img
              className="w-11 h-11 p-1 opacity-80"
              src={`/images/main-tab-05.png`}
              alt="main-tab-05"
            />
            <span>메뉴</span>
          </div>
        </div>
      </div>
    </>
  );
}
