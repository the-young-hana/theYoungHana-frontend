import React from "react";

const Transactions = () => {
  const data = {
    deptName: "컴퓨터공학과",
    deptAccountNumber: "211-910769-98907",
    deptAccountBalance: 180000,
    deptAccountTransactions: [
      {
        transactionDate: "2024-06-27",
        transactionHistories: [
          {
            transactionIdx: 0,
            transactionId: "123556837",
            transactionName: "간식사업",
            transactionType: "출금",
            transactionAmount: 500000,
            transactionBalance: 800000,
            transactionIsUsed: true,
            transactionDate: "2024-06-27T00:39:36.202Z",
          },
          {
            transactionIdx: 1,
            transactionId: "123556837",
            transactionName: "간식사업",
            transactionType: "출금",
            transactionAmount: 500000,
            transactionBalance: 800000,
            transactionIsUsed: true,
            transactionDate: "2024-06-27T00:39:36.202Z",
          },
        ],
      },
      {
        transactionDate: "2024-06-28",
        transactionHistories: [
          {
            transactionIdx: 3,
            transactionId: "123556837",
            transactionName: "간식사업",
            transactionType: "출금",
            transactionAmount: 500000,
            transactionBalance: 800000,
            transactionIsUsed: true,
            transactionDate: "2024-06-28T00:39:36.202Z",
          },
          {
            transactionIdx: 4,
            transactionId: "123556837",
            transactionName: "간식사업",
            transactionType: "출금",
            transactionAmount: 500000,
            transactionBalance: 800000,
            transactionIsUsed: true,
            transactionDate: "2024-06-28T00:39:36.202Z",
          },
        ],
      },
    ],
  };

  return (
    <div className="mx-8 my-4">
      {/* 계좌 정보 */}
      <div className="border border-hanaGray2 rounded-2xl px-8 py-4 bg-white">
        <div>{data.deptName}</div>
        <div>{data.deptAccountNumber}</div>
        <div className="text-right font-bold">
          {data.deptAccountBalance.toLocaleString("KR-kr")}원
        </div>
      </div>
    </div>
  );
};

export default Transactions;
