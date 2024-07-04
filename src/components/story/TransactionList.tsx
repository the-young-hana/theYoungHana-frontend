import React, { useEffect, useState } from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { dateToString, monthAgo, today } from "../../utils/date";
import cn from "../../utils/cn";
import ApiClient from "../../apis/apiClient";
import Transaction from "./Transaction";
import Modal from "../common/Modal";
import { Button } from "../common/Button";
import Schedule from "../common/Schedule";
import { getCookie } from "../../utils/cookie";

const TransactionList = () => {
  const deptIdx = getCookie("deptIdx");

  const [filter, setFilter] = useState<TransactionsReqType>({
    deptIdx: Number(deptIdx),
    start: monthAgo(new Date(), 1),
    end: today(),
    type: "출금",
    sort: "최신순",
    page: 1,
  });
  const [transactions, setTransactions] = useState<TransactionsResType>();
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
      setTransactions(res.data);
      // setTransactions(data);

      const sum = transactions?.transactionList.reduce(
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
        start: monthAgo(new Date(), number),
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
      start: monthAgo(new Date(), 1),
      end: today(),
    }));
    getTransactions();
  }, [filter]);

  return (
    <>
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
        <Transaction transactionList={transactions?.transactionList!}>
          {isShow.moreBtn && (
            <div className="flex justify-center items-end">
              <button onClick={handleMore}>더보기</button>
              <IoIosArrowDown />
            </div>
          )}
        </Transaction>
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
        className="absolute bottom-40 !w-80 !h-fit"
        onClose={handleCalendarModal}
      >
        <div className="-translate-y-6">
          <Schedule
            value={isShow.isStartClicked ? condition.start : condition.end}
            isEndClicked={isShow.isEndClicked}
            disabledDate={condition.start}
            onDateChange={handleDateChage}
          />
        </div>
      </Modal>
    </>
  );
};

export default TransactionList;
