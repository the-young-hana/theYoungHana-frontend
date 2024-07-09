import React, { useEffect, useRef, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../apis/apiClient";
import { getCookie } from "../../utils/cookie";
import { dateToString } from "../../utils/date";
import { Loading } from "../../components/common/Loading";
import { Button } from "../../components/common/Button";
import { FiPlus } from "react-icons/fi";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

function Stories() {
  const navigate = useNavigate();
  const [stories, setStories] = useState<StoriesResType[]>();
  const [expandedCard, setExpendedCard] = useState<number | null>();
  const observer = useRef<IntersectionObserver | null>(null);

  const { lastStoryElementRef, page, setPage } = useInfiniteScroll({
    observer,
  });

  const deptIdx = getCookie("deptIdx");

  const getStories = async () => {
    try {
      const res = await ApiClient.getInstance().getStories(
        Number(deptIdx),
        page.page,
      );
      setStories(res.data);
      setPage((prev) => ({ ...prev, hasMore: res.data?.length! >= 10 }));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleExpand = (index: number) => {
    if (expandedCard === index) {
      setExpendedCard(null);
    } else {
      setExpendedCard(index);
    }
  };

  useEffect(() => {
    getStories();
  }, [page.page]);

  if (!stories) {
    return <Loading show={true} />;
  }

  return (
    <div className="flex justify-center items-center mx-8 mt-8 mb-32">
      <ul className="w-full max-w-md flex flex-col gap-4">
        {stories?.map((transaction, index) => (
          <li key={transaction.storyIdx}>
            <div
              ref={stories.length === index + 1 ? lastStoryElementRef : null}
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
                        {history.transactionAmount.toLocaleString("KR-kr")}원
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
      {getCookie("isAdmin") && (
        <Button
          roundedFull
          className="absolute bottom-32 right-5 !p-2 drop-shadow-3xl"
          onClick={() => navigate("/story/post/1")}
        >
          <FiPlus size={52} />
        </Button>
      )}
    </div>
  );
}

export default Stories;
