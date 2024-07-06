import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../common/Button";
import { useTransaction } from "../../context/TransactionContext";

const TotalPrice = () => {
  const navigate = useNavigate();
  const { storyIdx } = useParams();

  const path = window.location.pathname;

  const { selectedTransactionList, totalPrice } = useTransaction();

  return (
    <div className="absolute bottom-0 w-iPhone flex flex-col gap-4 bg-white rounded-lg p-8 drop-shadow-top">
      <div className="flex justify-between">
        <div>
          <span>거래내역 </span>
          <span className="font-bold">{selectedTransactionList.length}개</span>
        </div>
        <div className="text-right">
          <span>총 </span>
          <span className="text-hanaRed font-bold">
            {totalPrice.toLocaleString("KR-kr")}원
          </span>
          <div className="text-[10px] text-hanaGray2">
            지출만 반영된 금액입니다.
          </div>
        </div>
      </div>
      <Button
        className="w-full"
        onClick={() => {
          path.includes("/story/post")
            ? navigate("/story/post/2")
            : navigate(`/story/update/${storyIdx}/2`);
        }}
      >
        다음
      </Button>
    </div>
  );
};

export default TotalPrice;
