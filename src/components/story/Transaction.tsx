import React, { FC } from "react";
import cn from "../../utils/cn";
import { IoAlertCircleOutline } from "react-icons/io5";

const Transaction = ({
  transactionList,
  children,
}: {
  transactionList: TransactionListType[];
  children?: React.ReactNode;
}) => {
  return (
    <>
      {transactionList?.length > 0 ? (
        <ul className="flex flex-col gap-8 bg-white py-8">
          {transactionList.map((transaction, idx: number) => (
            <li key={idx} className="mx-8">
              <div className="border-b border-hanaGray2 text-xs pb-2">
                {`${transaction.date} (${new Date(transaction.date)
                  .toLocaleDateString("ko-KR", {
                    weekday: "long",
                  })
                  .slice(0, -2)})`}
              </div>
              <ul>
                {transaction.transactions.map((history) => (
                  <li key={history.transactionIdx} className="border-b py-4">
                    <div>
                      <div className="text-hanaGray2 text-xs font-semibold">
                        {new Date(history.transactionDate).toLocaleTimeString()}
                      </div>
                      <div className="font-bold">{history.transactionName}</div>
                    </div>
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
                    <div className="text-xs text-hanaGray2 font-semibold text-right">
                      {history.transactionBalance.toLocaleString("KR-kr")}원
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          {children}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-2 bg-white py-8 min-h-[430px]">
          <IoAlertCircleOutline size={48} color="gray" />
          <p>조회 결과가 없어요.</p>
        </div>
      )}
    </>
  );
};

export default Transaction;
