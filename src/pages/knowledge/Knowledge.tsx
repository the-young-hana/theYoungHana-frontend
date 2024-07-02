import { Link } from "react-router-dom";
import { NavigationBar } from "../../components/common/NavigationBar";
import { TopBar } from "../../components/common/TopBar";
import { Loading } from "../../components/common/Loading";
import useImagePreloader from "../../hooks/useImagePreloader";
import { useEffect, useState } from "react";
import cn from "../../utils/cn";

const products = [
  { title: "주택청약 종합저축", content: `내 집 마련 위한\n필수 국민 적금` },
  {
    title: "급여하나 월복리적금",
    content: "월급통장 하나로\n이자가 차곡차곡",
  },
  {
    title: "하나의 정기예금",
    content: "복잡한 우대조건 없이\n기간, 금액 자유롭게",
  },
  { title: "내맘 적금", content: "이름, 기간, 금액\n내 마음대로 DIY 적금" },
];

const arrImg = [
  "/images/investment.svg",
  "/images/product1.svg",
  "/images/product2.svg",
  "/images/product3.svg",
  "/images/product4.svg",
];

export default function Knowledge() {
  const imagesLoaded = useImagePreloader(arrImg);
  const [animation, setAnimation] = useState<number>(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setAnimation((prev) => prev + 1);
    }, 500);
    const timeoutId = setTimeout(() => {
      clearInterval(timerId);
    }, 2000);
    return () => {
      clearInterval(timerId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <TopBar title="금융상식" />
      <div className="mt-12 mb-[107px] flex flex-col gap-5 min-h-full justify-center items-center p-8">
        {imagesLoaded ? (
          <div className="w-full flex flex-col gap-8">
            <div
              className={cn(
                "w-full flex bg-[#EF5489] rounded-xl px-5 py-8 justify-between animate-slideinup1",
                animation <= 1 ? "opacity-0" : "opacity-1",
              )}
            >
              <div className="flex flex-col gap-2">
                <p className="text-white font-semibold text-2xl text-nowrap">
                  대학생 재테크
                  <br />
                  꿀팁
                </p>
                <Link to="/knowledge/list">
                  <p className="text-white underline">바로가기</p>
                </Link>
              </div>
              <img src="/images/investment.svg" alt="investment" />
            </div>

            <div className="flex flex-col gap-3 w-full animate-slideinup2">
              {products.map((product, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative w-full flex justify-between bg-white rounded-xl drop-shadow-base px-5 py-8 animate-slideinup",
                    animation <= 2 ? "opacity-0" : "opacity-1",
                  )}
                >
                  <img
                    src={`/images/product${index + 1}.svg`}
                    className="w-28 z-10"
                    alt={`product${index + 1}`}
                  />
                  <div className="text-end flex flex-col items-end justify-center">
                    <p className="font-bold text-gray-500">{product.title}</p>
                    <p className="text-lg font-medium whitespace-pre-wrap">
                      {product.content}
                    </p>
                  </div>
                  <div className="absolute top-0 left-2 font-extrabold text-[32px] opacity-5">
                    0{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Loading show={true} back={false} />
        )}
      </div>
      <NavigationBar />
    </>
  );
}
