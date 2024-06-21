import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

import cn from "../utils/cn";
import { IoIosArrowForward } from "react-icons/io";
import IPhoneFrame from "../components/common/IPhoneFrame";
import { Button } from "../components/common/Button";
import Modal from "../components/common/Modal";
import { Loading } from "../components/common/Loading";

export default function Main() {
  const [showModal, setShowModal] = useState<boolean>(false);
  // 스크롤 감지해서 탭바 보여주기
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [showTabBar, setShowTabBar] = useState<boolean>(true);
  return (
    <div
      className="flex flex-col items-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-50 pt-24"
      onScroll={(e) => {
        const scrollTop = e.currentTarget.scrollTop;
        setShowTabBar(lastScrollTop > scrollTop || scrollTop <= 0);
        setLastScrollTop(scrollTop);
      }}
    >
      {/* 상단 바로가기메뉴 (이름, 원큐지갑, QR, 알림) */}
      <div className="flex flex-row gap-1 px-6 pt-12 pb-4 w-full absolute top-0 z-10 backdrop-blur-md">
        <div className="mr-1 font-bold underline-offset-4">
          <div className="flex flex-row gap-1 items-center">
            <span className="underline text-2xl"> 로그인</span>
            <div className="text-sm border-2 border-black rounded-full px-1 font-bold text-center py-0.5">
              전체계좌
            </div>
          </div>
        </div>
      </div>

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
              {true ? (
                <div className="flex flex-col p-6">
                  <div className="flex flex-row gap-1 items-end w-full">
                    <span className="font-bold"> 저축예금</span>
                    <div className="flex-grow" />
                    <span className="font-bold text-sm underline text-gray-400">
                      한도계좌
                    </span>
                  </div>
                  <span className="font-bold text-sm text-gray-400">
                    입출금 406-911133-19107{" "}
                    <span className="underline"> 복사 </span>
                  </span>
                  <div className="flex flex-row gap-1 items-center">
                    <span className="font-bold text-2xl">1</span>
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
                    <span className="text-xl font-bold">잔액을 조회하세요</span>
                    <IoIosArrowForward />
                  </div>
                  <img
                    className="h-24"
                    src={`/images/main/account.png`}
                    alt="account"
                  />
                  <div className="flex flex-row gap-1 w-full font-bold mt-2">
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
                <span className="text-sm">회비 관리도 쉽게</span>
                <div className="flex flex-row gap-1 items-center">
                  <span className="text-xl font-bold">모임통장 이용하세요</span>
                  <IoIosArrowForward />
                </div>
                <img
                  className="h-24"
                  src={`/images/main/moim.png`}
                  alt="account"
                />
                <div className="flex flex-row gap-1 justify-center w-full font-bold mt-2">
                  <Button className="w-1/2 !bg-gray-200 !text-black">
                    모임관리
                  </Button>
                  <Button className="w-1/2"> 모임가입 </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="!h-fit">
            <div className="mt-4 mx-2 mb-8 bg-white rounded-2xl shadow">
              <div className="flex flex-col items-center w-full p-4">
                <span className="text-sm">다른 은행까지 편하게</span>
                <div className="flex flex-row items-center">
                  <span className="text-xl font-bold">계좌를 관리하세요</span>
                  <IoIosArrowForward />
                </div>
                <img
                  className="h-24"
                  src={`/images/main/moim.png`}
                  alt="account"
                />
                <div className="flex flex-row gap-1 justify-center w-full font-bold mt-2">
                  <Button className="w-1/2 !bg-gray-200 !text-black">
                    계좌조회
                  </Button>
                  <Button className="w-1/2"> 계좌등록 </Button>
                </div>
              </div>
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
                <img
                  className="h-24"
                  src={`/images/main/moim.png`}
                  alt="account"
                />
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

      {/* 카드 리스트 */}
      <div className="flex flex-col w-full gap-4 p-4">
        {/* 카드 1 */}
        <div className="flex flex-col w-full px-6 py-4 bg-indigo-500 rounded-2xl">
          <div className="flex flex-row items-center justify-between text-gray-200">
            <span className="font-bold">마이데이터 자산</span>
            <IoIosArrowForward className="text-white" />
            <div className="flex-grow" />
          </div>
          <div className="flex flex-row items-end gap-0 mb-2 text-white">
            <span className="text-3xl font-bold">{0}</span>
            <div className="flex flex-row items-center">
              <span className="text-xl font-bold"> 원 </span>
              <span className="bg-indigo-700 text-sm rounded-full px-1">
                숨김
              </span>
            </div>
          </div>
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
        {/* 카드 4 */}
        <div className="w-full h-32 px-6 py-4 bg-orange-400 rounded-2xl" />
        {/* 카드 5 */}
        <div className="w-full h-32 px-6 py-4 bg-red-400 rounded-2xl" />
        {/* 카드 6 */}
        <div className="w-full h-32 px-6 py-4 bg-pink-400 rounded-2xl" />
        {/* 카드 7 */}
        <div className="w-full h-32 px-6 py-4 bg-fuchsia-400 rounded-2xl" />
      </div>

      {/* 하단 탭바 */}
      <div
        className={cn(
          "flex flex-col gap-1 absolute bottom-0 w-full bg-white py-3 transition-transform rounded-t-3xl shadow shadow-black",
          showTabBar ? "" : "translate-y-40",
        )}
      >
        <div className="flex flex-row gap-2 px-4 pb-3 overflow-x-hidden text-nowrap">
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
        <div className="flex flex-row font-bold">
          <div className="flex flex-col items-center flex-grow text-primary">
            <img
              className="w-12 h-12 p-1 opacity-80"
              src={`/images/main/main-tab-01.png`}
              alt="main-tab-01"
            />
            <span> 홈 </span>
          </div>
          <div className="flex flex-col items-center flex-grow text-primary-disabled">
            <img
              className="w-12 h-12 p-1 opacity-80"
              src={`/images/main/main-tab-02.png`}
              alt="main-tab-02"
            />
            <span> 상품 </span>
          </div>
          <div className="flex flex-col items-center flex-grow text-primary-disabled">
            <img
              className="w-12 h-12 p-1 opacity-80"
              src={`/images/main/main-tab-03.png`}
              alt="main-tab-03"
            />
            <span> 자산 </span>
          </div>
          <div className="flex flex-col items-center flex-grow text-primary-disabled">
            <img
              className="w-12 h-12 p-1 opacity-80"
              src={`/images/main/main-tab-04.png`}
              alt="main-tab-04"
            />
            <span> 주식 </span>
          </div>
          <div className="flex flex-col items-center flex-grow font-bold text-primary-disabled">
            <img
              className="w-12 h-12 p-1 opacity-80"
              src={`/images/main/main-tab-05.png`}
              alt="main-tab-05"
            />
            <span> 메뉴 </span>
          </div>
        </div>
      </div>
    </div>
  );
}
