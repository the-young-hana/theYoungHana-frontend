import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { ApiClient } from "../../apis/apiClient";
import { ago, dateToString, today } from "../../utils/date";
import cn from "../../utils/cn";
import Modal from "../../components/common/Modal";
import { Button } from "../../components/common/Button";
import Schedule from "../../components/common/Schedule";

const Transactions = () => {
  const data: GetTransactionsResType = {
    deptName: "컴퓨터공학과",
    deptAccountNumber: "211-910769-98907",
    deptAccountBalance: 180000,
    deptAccountTransactionsByDate: [
      {
        date: "2024-06-29",
        transactions: [
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
            transactionName: "프린트사업",
            transactionType: "출금",
            transactionAmount: 500000,
            transactionBalance: 800000,
            transactionIsUsed: true,
            transactionDate: "2024-06-27T00:39:36.202Z",
          },
        ],
      },
      {
        date: "2024-06-28",
        transactions: [
          {
            transactionIdx: 3,
            transactionId: "123556837",
            transactionName: "신입생 오티",
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
      {
        date: "2024-06-27",
        transactions: [
          {
            transactionIdx: 3,
            transactionId: "123556837",
            transactionName: "신입생 오티",
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

  const { deptIdx } = useParams();

  const [filter, setFilter] = useState<GetTransactionsReqType>({
    deptIdx: Number(deptIdx),
    start: ago(new Date(), 1),
    end: today(),
    type: "출금",
    sort: "최신순",
    page: 1,
  });
  const [transactions, setTransactions] = useState<GetTransactionsResType>();
  const [isShow, setIsShow] = useState({
    isFilterModalOpen: false,
    isCalendarModalOpen: false,
    moreBtn: false,
    calendar: false,
    isStartClicked: false,
    isEndClicked: false,
  });
  const [clickedBtn, setClickedBtn] = useState({
    period: "1개월",
    type: "전체",
    sort: "최신순",
  });
  const [condition, setCondition] = useState({
    period: ["1개월", "3개월", "6개월", "직접입력"],
    type: ["전체", "입금", "출금"],
    sort: ["최신순", "과거순"],
    start: "",
    end: "",
  });

  // 서버 통신
  const getTransactions = async () => {
    try {
      const res = await ApiClient.getInstance().getTransactions(filter);
      // setTransactions(res.data);
      setTransactions(data);

      const sum = transactions?.deptAccountTransactionsByDate.reduce(
        (acc, transaction) => acc + transaction.transactions.length,
        0,
      );

      setIsShow({ ...isShow, moreBtn: sum! >= 20 });

      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // 더보기 버튼
  const handleMore = () => {
    setFilter((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  // 조회 조건 모달
  const handleFilterModal = () => {
    setIsShow((prev) => ({
      ...prev,
      isFilterModalOpen: !prev.isFilterModalOpen,
    }));
  };

  // 캘린더 모달
  const handleCalendarModal = () => {
    setIsShow((prev) => ({
      ...prev,
      isCalendarModalOpen: !prev.isCalendarModalOpen,
    }));
  };

  // 날짜 선택
  const handleDateChage = (newDate: Date) => {
    console.log(newDate);
    if (isShow.isStartClicked) {
      setCondition((prev) => ({ ...prev, start: dateToString(newDate) }));
    }

    if (isShow.isEndClicked) {
      setCondition((prev) => ({ ...prev, end: dateToString(newDate) }));
    }
    setIsShow((prev) => ({ ...prev, isCalendarModalOpen: false }));
  };

  // 조회 조건 설정
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    if (condition.period.includes(name)) {
      setClickedBtn((prev) => ({ ...prev, period: name }));
      setIsShow((prev) => ({ ...prev, calendar: name === "직접입력" }));
    }

    if (condition.type.includes(name)) {
      setClickedBtn((prev) => ({ ...prev, type: name }));
    }

    if (condition.sort.includes(name)) {
      setClickedBtn((prev) => ({ ...prev, sort: name }));
    }
  };

  // 조회 조건 설정 확인
  const submitValue = () => {
    const number = Number(clickedBtn.period.slice(0, -2));

    if (clickedBtn.period !== "직접입력") {
      setFilter((prev) => ({
        ...prev,
        start: ago(new Date(), number),
        end: today(),
        type: clickedBtn.type,
        sort: clickedBtn.sort,
        page: 1,
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        start: condition.start,
        end: condition.end,
        type: clickedBtn.type,
        sort: clickedBtn.sort,
        page: 1,
      }));
    }

    setIsShow((prev) => ({
      ...prev,
      isFilterModalOpen: !prev.isFilterModalOpen,
    }));
  };

  useEffect(() => {
    setCondition((prev) => ({
      ...prev,
      start: ago(new Date(), 1),
      end: today(),
    }));
    getTransactions();
  }, [filter]);

  return (
    <div className="flex flex-col gap-4 my-8 mb-[105px]">
      {/* 계좌 정보 */}
      <div className="border border-hanaGray2 rounded-2xl mx-8 px-8 py-4 bg-white">
        <div>{transactions?.deptName}</div>
        <div>{transactions?.deptAccountNumber}</div>
        <div className="text-right font-bold">
          {transactions?.deptAccountBalance.toLocaleString("KR-kr")}원
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* 기간 설정 */}
        <div className="flex justify-between gap-2 mx-8 text-[10px] text-hanaGray2">
          <div>{`${filter.start} ~ ${filter.end}`}</div>
          <div
            className="flex items-end gap-1 cursor-pointer"
            onClick={handleFilterModal}
          >
            <div>{`${clickedBtn.period} • ${clickedBtn.type} • ${clickedBtn.sort}`}</div>
            <IoIosArrowDown />
          </div>
        </div>

        {/* 거래 내역 */}
        {transactions?.deptAccountTransactionsByDate.length! > 0 ? (
          <ul className="flex flex-col gap-8 bg-white py-8">
            {transactions?.deptAccountTransactionsByDate.map(
              (transaction, idx) => (
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
                      <li
                        key={history.transactionIdx}
                        className="border-b py-4"
                      >
                        <div>
                          <div className="text-hanaGray2 text-xs font-semibold">
                            {new Date(
                              history.transactionDate,
                            ).toLocaleTimeString()}
                          </div>
                          <div className="font-bold">
                            {history.transactionName}
                          </div>
                        </div>
                        <div
                          className={cn(
                            "font-bold text-right",
                            history.transactionType === "출금"
                              ? "text-hanaRed"
                              : "text-hanaGreen",
                          )}
                        >
                          {`${history.transactionType === "출금" && "-"} ${history.transactionAmount.toLocaleString("KR-kr")}원`}
                        </div>
                        <div className="text-xs text-hanaGray2 font-semibold text-right">
                          {history.transactionBalance.toLocaleString("KR-kr")}원
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ),
            )}
            {isShow.moreBtn && (
              <div className="flex justify-center items-end">
                <button onClick={handleMore}>더보기</button>
                <IoIosArrowDown />
              </div>
            )}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-2 bg-white py-8 min-h-[430px]">
            <IoAlertCircleOutline size={48} color="gray" />
            <p>조회 결과가 없어요.</p>
          </div>
        )}
      </div>

      <Modal
        show={isShow.isFilterModalOpen}
        modalType="sheet"
        onClose={handleFilterModal}
      >
        <div className="flex flex-col gap-8 mb-8">
          <div className="absolute top-5 right-36 font-bold text-lg">
            조회조건 선택
          </div>
          <div className="w-full h-[1px] bg-hanaGray2" />
          <div className="flex flex-col gap-2">
            <p>조회기간</p>
            <div className="flex justify-between">
              {condition.period.map((period, idx) => (
                <button
                  key={idx}
                  name={period}
                  className={cn(
                    clickedBtn.period === period
                      ? "text-hanaGreen border-hanaGreen font-bold"
                      : "border-hanaGray2",
                    "border rounded-xl w-20 h-10",
                  )}
                  onClick={handleClick}
                >
                  {period}
                </button>
              ))}
            </div>
            {/* 캘린더 */}
            {isShow.calendar && (
              <div className="flex justify-between items-center gap-2">
                <div
                  className="flex justify-evenly items-center border border-hanaGray2 rounded-xl w-2/4 h-14 cursor-pointer"
                  onClick={() => {
                    setIsShow((prev) => ({
                      ...prev,
                      isCalendarModalOpen: !prev.isCalendarModalOpen,
                      isStartClicked: true,
                      isEndClicked: false,
                    }));
                  }}
                >
                  <span>{condition.start}</span>
                  <MdOutlineCalendarMonth size={18} />
                </div>
                <div className="text-hanaGray2">-</div>
                <div
                  className="flex justify-evenly items-center border border-hanaGray2 rounded-xl w-2/4 h-14 cursor-pointer"
                  onClick={() => {
                    setIsShow((prev) => ({
                      ...prev,
                      isCalendarModalOpen: !prev.isCalendarModalOpen,
                      isStartClicked: false,
                      isEndClicked: true,
                    }));
                  }}
                >
                  <span>{condition.end}</span>
                  <MdOutlineCalendarMonth size={18} />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p>거래구분</p>
            <div className="flex justify-between">
              {condition.type.map((type, idx) => (
                <button
                  key={idx}
                  name={type}
                  className={cn(
                    clickedBtn.type === type
                      ? "text-hanaGreen border-hanaGreen font-bold"
                      : "border-hanaGray2",
                    "border rounded-xl w-28 h-10",
                  )}
                  onClick={handleClick}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>정렬순서</p>
            <div className="flex justify-between gap-2">
              {condition.sort.map((sort, idx) => (
                <button
                  key={idx}
                  name={sort}
                  className={cn(
                    clickedBtn.sort === sort
                      ? "text-hanaGreen border-hanaGreen font-bold"
                      : "border-hanaGray2",
                    "border rounded-xl w-3/6 h-10",
                  )}
                  onClick={handleClick}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <Button
              gray
              className="!w-2/6 rounded-xl"
              onClick={() =>
                setIsShow((prev) => ({
                  ...prev,
                  isFilterModalOpen: !prev.isFilterModalOpen,
                }))
              }
            >
              취소
            </Button>
            <Button className="!w-4/6 rounded-xl" onClick={submitValue}>
              확인
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        show={isShow.isCalendarModalOpen}
        className="absolute bottom-40 w-80"
        onClose={handleCalendarModal}
      >
        <Schedule
          value={isShow.isStartClicked ? condition.start : condition.end}
          isEndClicked={isShow.isEndClicked}
          disabledDate={condition.start}
          onDateChange={handleDateChage}
        />
      </Modal>
    </div>
  );
};

export default Transactions;
