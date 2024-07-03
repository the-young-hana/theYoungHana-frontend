import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import ApiClient from "../../apis/apiClient";
import { dateToString } from "../../utils/date";

const Stories = () => {
  const data = [
    {
      storyIdx: 1,
      title: "개강총회",
      startDate: "2024-05-24",
      endDate: "2024-05-25",
      totalAmount: 150150,
      type: "출금",
      likes: 10,
      comments: 5,
      transactionList: [
        {
          transactionsId: 1,
          description: "메가 MGC 커피_",
          createdAt: "2024-05-24 19:45",
          type: "출금",
          amount: 35000,
        },
        {
          transactionsId: 2,
          description: "하남돼지",
          createdAt: "2024-05-25 12:39",
          type: "출금",
          amount: 115150,
        },
      ],
    },
    {
      storyIdx: 2,
      title: "중간고사 간식 행사",
      startDate: "2024-05-15",
      endDate: "",
      totalAmount: 35000,
      type: "출금",
      likes: 8,
      comments: 2,
    },
    {
      storyIdx: 3,
      title: "신입생 OT",
      startDate: "2024-02-15",
      endDate: "2024-02-16",
      totalAmount: 1035030,
      type: "출금",
      likes: 3,
      comments: 5,
      transactionHistories: [
        {
          transactionsId: 3,
          description: "숙박",
          createdAt: "2024-01-25 13:48",
          type: "출금",
          amount: 800000,
        },
        {
          transactionsId: 4,
          description: "버스 대여",
          createdAt: "2024-02-03 12:19",
          type: "출금",
          amount: 435030,
        },
      ],
    },
  ];

  const { deptIdx } = useParams();
  const navigate = useNavigate();
  const [stories, setStories] = useState<GetStoriesResType[]>();
  const [page, setPage] = useState(1);
  const [expandedCard, setExpendedCard] = useState<number | null>();

  const getStories = async () => {
    try {
      const res = await ApiClient.getInstance().getStories(
        Number(deptIdx),
        page,
      );
      setStories(res.data);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleExpand = (index: number) => {
    if (expandedCard === index) {
      setExpendedCard(null);
    } else {
      console.log(index);
      setExpendedCard(index);
    }
  };

  useEffect(() => {
    getStories();
  }, []);

  return (
    <div className="flex justify-center items-center mx-8 mt-8 mb-32">
      <ul className="w-full max-w-md flex flex-col gap-4">
        {stories?.map((transaction, index) => (
          <li key={transaction.storyIdx}>
            <div
              className="p-4 rounded-2xl border bg-white drop-shadow-2.5xl cursor-pointer"
              onClick={() => navigate(`/story/detail/${transaction.storyIdx}`)}
            >
              {/* 스토리 이름 */}
              <div className="flex items-center gap-2">
                <img
                  src="/images/hanabank.png"
                  alt="hanabank"
                  className="w-8 h-8"
                />
                <div className="font-bold text-lg line-clamp-1">
                  {transaction.storyTitle}
                </div>
              </div>

              {/* 거래 전체 날짜 */}
              <div className="m-1 text-xs text-hanaGray2">
                <span>{transaction.startDate}</span>
                <span> ~ </span>
                <span>{transaction.endDate}</span>
              </div>

              {/* 거래 횟수 */}
              <div className="flex justify-end text-xs text-hanaGray2">
                {transaction.transactionList
                  ? `총 ${transaction.transactionList.length}회`
                  : "총 1회"}
              </div>

              {/* 총 거래 금액 */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaRegHeart />
                  <span>{transaction.storyLikeNum}</span>
                  <HiOutlineChatBubbleBottomCenterText size={19} />
                  <span>{transaction.storyCommentNum}</span>
                </div>
                <div className="font-bold">
                  <span className="text-hanaRed">출금</span>
                  <span className="text-lg">
                    {" "}
                    {transaction.totalAmount.toLocaleString("KR-kr")}원
                  </span>
                </div>
              </div>
            </div>

            {/* 펼치기 버튼 눌렀을 때 거래 내역들 */}
            {expandedCard === index && transaction.transactionList && (
              <ul className="flex flex-col">
                {transaction.transactionList.map((history) => (
                  <li
                    key={history.transactionIdx}
                    className="bg-white px-4 py-4 rounded-2xl mt-4"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/hanabank.png"
                        alt="hanabank"
                        className="w-8 h-8"
                      />
                      <div className="font-bold text-lg">
                        {history.transactionName}
                      </div>
                    </div>

                    {/* 거래 전체 날짜 */}
                    <div className="m-1 text-xs text-hanaGray2">
                      <span>
                        {dateToString(new Date(history.transactionDate))}
                      </span>
                    </div>

                    {/* 총 거래 금액 */}
                    <div className="font-bold text-right">
                      <span className="text-hanaRed">
                        {history.transactionType}
                      </span>
                      <span className="text-lg">
                        {" "}
                        {transaction.totalAmount.toLocaleString("KR-kr")}원
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-end mr-4">
              {transaction.transactionList && (
                <button
                  className={`w-20 py-2 rounded-b-xl text-white text-xs font-semibold bg-hanaGreen ${expandedCard === index ? "rounded-t-none" : ""}`}
                  onClick={() => toggleExpand(index)}
                >
                  {expandedCard === index ? "접기" : "펼치기"}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stories;
