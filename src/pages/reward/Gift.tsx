import { useState, useEffect } from "react";
import { Button } from "../../components/common/Button";
import { TopBar } from "../../components/common/TopBar";
import cn from "../../utils/cn";
import { useNavigate } from "react-router-dom";

export const Gift = () => {
  const [giftAnimation, setGiftAnimation] = useState<string>("animate-tada");
  const [moneyAnimation, setMoneyAnimation] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMoneyVisible, setIsMoneyVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const moneyElement = document.getElementById("rewardMoney");
    const timeoutId = setTimeout(() => {
      if (moneyElement) {
        moneyElement.style.visibility = "visible";
      }
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOpen]);

  useEffect(() => {
    const giftElement = document.getElementById("rewardGift");
    if (giftElement) {
      const handleAnimationEnd = (event: AnimationEvent) => {
        if (event.animationName === "zoom-out") {
          setIsMoneyVisible(true);
          giftElement.style.visibility = "hidden";
          giftElement.style.height = "0px";
          setMoneyAnimation("animate-zoomIn");
          setIsOpen(true);
        }
      };

      giftElement.addEventListener("animationend", handleAnimationEnd);

      return () => {
        giftElement.removeEventListener("animationend", handleAnimationEnd);
      };
    }
  }, []);

  const clickOpen = () => {
    setGiftAnimation("animate-zoomOut");
  };

  return (
    <>
      <TopBar title="선물상자" back />
      <div className="bg-white min-h-full flex flex-col gap-5 items-center p-8 overflow-hidden">
        <img
          id="rewardGift"
          src="/images/reward_gift.svg"
          className={cn("w-80 mt-24", giftAnimation)}
        />

        {isMoneyVisible && (
          <div
            id="rewardMoney"
            className={cn(
              "flex flex-col items-center invisible",
              moneyAnimation,
            )}
          >
            <img src="/images/reward_money.svg" className="w-80 mt-4" />
            <p className="font-bold text-2xl">21P 당첨!</p>
          </div>
        )}

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <Button
            id="openButton"
            roundedFull
            className="font-bold text-xl !px-14 py-4 drop-shadow-3xl"
            onClick={!isOpen ? clickOpen : () => navigate("/reward")}
          >
            {!isOpen ? "선물상자 개봉" : "완료"}
          </Button>
        </div>
      </div>
    </>
  );
};
