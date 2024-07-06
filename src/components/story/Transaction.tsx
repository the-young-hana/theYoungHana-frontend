import React, { useEffect, useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import "./story.css";
import NotUsedTransaction from "./NotUsedTransaction";
import "./story.css";
import { useTransaction } from "../../context/TransactionContext";

const Transaction = ({
  transactionList,
  children,
}: {
  transactionList: TransactionListType[];
  children?: React.ReactNode;
}) => {
  const path = window.location.pathname;

  const [selectedTransaction, setSelectedTransaction] = useState<{
    transactionIdx: number[];
    totalPrice: number;
  }>({
    transactionIdx: [],
    totalPrice: 0,
  });

  const { updateTransaction, chosenTransaction } = useTransaction();

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    transactionIdx: number,
    transactionType: string,
    transactionAmount: number,
  ) => {
    if (transactionType === "출금") {
      if (e.target.checked) {
        setSelectedTransaction((prev) => ({
          ...prev,
          transactionIdx: [...prev.transactionIdx, transactionIdx],
          totalPrice: prev.totalPrice + transactionAmount,
        }));
      } else {
        setSelectedTransaction((prev) => ({
          ...prev,
          transactionIdx: prev.transactionIdx.filter(
            (idx) => idx !== transactionIdx,
          ),
          totalPrice: prev.totalPrice - transactionAmount,
        }));
      }
    } else if (transactionType === "입금") {
      if (e.target.checked) {
        setSelectedTransaction((prev) => ({
          ...prev,
          transactionIdx: [...prev.transactionIdx, transactionIdx],
        }));
      } else {
        setSelectedTransaction((prev) => ({
          ...prev,
          transactionIdx: prev.transactionIdx.filter(
            (idx) => idx !== transactionIdx,
          ),
        }));
      }
    }
  };

  useEffect(() => {
    chosenTransaction(
      selectedTransaction.transactionIdx,
      selectedTransaction.totalPrice,
    );
  }, [selectedTransaction]);

  return (
    <div>
      {transactionList?.length > 0 ? (
        <ul className="flex flex-col flex-grow gap-8 bg-white py-8 ">
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
                    {path === "/story/post/1" ||
                    path.includes("/story/update") ? (
                      !history.transactionIsUsed ||
                      updateTransaction.transactionIdx.includes(
                        history.transactionIdx,
                      ) ? (
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            className="checkbox"
                            id={`checkbox-${history.transactionIdx}`}
                            onChange={(e) =>
                              handleCheckboxChange(
                                e,
                                history.transactionIdx,
                                history.transactionType,
                                history.transactionAmount,
                              )
                            }
                          />
                          <label
                            htmlFor={`checkbox-${history.transactionIdx}`}
                          />
                          <div className="w-[90%]">
                            <NotUsedTransaction history={history} />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="text-hanaGray2 text-xs font-semibold">
                            {new Date(
                              history.transactionDate,
                            ).toLocaleTimeString()}
                          </div>
                          <div className="flex justify-between">
                            <div className="font-bold text-hanaGray2">
                              {history.transactionName}
                            </div>
                            <div className="font-bold text-right text-hanaGray2">
                              {`${history.transactionType === "출금" ? "-" : ""} ${history.transactionAmount.toLocaleString("KR-kr")}원`}
                            </div>
                          </div>

                          <div className="text-xs text-hanaGray2 font-semibold text-right">
                            {history.transactionBalance.toLocaleString("KR-kr")}
                            원
                          </div>
                        </>
                      )
                    ) : (
                      <>
                        <NotUsedTransaction history={history} />
                      </>
                    )}
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
    </div>
  );
};

export default Transaction;
