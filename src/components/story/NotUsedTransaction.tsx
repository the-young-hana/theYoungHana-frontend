import React from "react";
import cn from "../../utils/cn";

const NotUsedTransaction = ({ history }: { history: TransactionType }) => {
  return (
    <>
      <div className="text-hanaGray2 text-xs font-semibold">
        {new Date(history.transactionDate).toLocaleTimeString()}
      </div>
      <div className="flex justify-between">
        <div className="font-bold">{history.transactionName}</div>
        <div
          className={cn(
            "font-bold text-right",
            history.transactionType === "출금"
              ? "text-hanaRed"
              : "text-hanaGreen",
          )}
        >
          {`${history.transactionType === "출금" ? "-" : ""} ${history.transactionAmount.toLocaleString("KR-kr")}원`}
        </div>
      </div>

      <div className="text-xs text-hanaGray2 font-semibold text-right">
        {history.transactionBalance.toLocaleString("KR-kr")}원
      </div>
    </>
  );
};

export default NotUsedTransaction;
