import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiClient from "../../apis/apiClient";
import TransactionList from "../../components/story/TransactionList";

const Transactions = () => {
  const { deptIdx } = useParams();
  const [account, setAccount] = useState<AccountInfoType>();

  // 서버 통신
  const getAccountInfo = async () => {
    try {
      const res = await ApiClient.getInstance().getAccountInfo(Number(deptIdx));
      setAccount(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccountInfo();
  }, []);

  return (
    <div className="flex flex-col gap-4 my-8 mb-[105px]">
      {/* 계좌 정보 */}
      <div className="border border-hanaGray2 rounded-2xl mx-8 px-8 py-4 bg-white">
        <div>{account?.deptName}</div>
        <div>{account?.deptAccountNumber}</div>
        <div className="text-right font-bold">
          {account?.deptAccountBalance.toLocaleString("KR-kr")}원
        </div>
      </div>

      <TransactionList />
    </div>
  );
};

export default Transactions;
