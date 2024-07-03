import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { getCookie } from "../../utils/cookie";
import ApiClient from "../../apis/apiClient";
import { TopBar } from "../../components/common/TopBar";

import "swiper/css";
import "swiper/css/pagination";

const StoryDetail = () => {
  const { storyIdx } = useParams();
  const [storyDetail, setStoryDetail] = useState<getStoryDetailResType>();
  const [heartCount, setHeartCount] = useState<number>();

  //   const storyDetail = {
  //     storyIdx: 1,
  //     storyTitle: "개강총회",
  //     storyLikeNum: 5,
  //     storyContent: "즐거운 개강총회였습니다.",
  //     storyCommentNum: 2,
  //     isLiked: true,
  //     storyComment: {
  //       commentIdx: 1,
  //       commentContent: "즐거웠어요 !",
  //       createdAt: "2024-07-03T06:16:58.823Z",
  //     },
  //     storyImageList: [
  //       "https://github.com/the-young-hana/theYoungHana-backend/assets/31836035/6df5a4cf-f0dc-48fa-9f6f-5dba8f1c78cb",
  //       "https://github.com/the-young-hana/theYoungHana-backend/assets/31836035/faeea0dd-85fe-421d-8e64-f0bbbbec3d38",
  //     ],
  //     transactionList: [
  //       {
  //         transactionIdx: 1,
  //         transactionId: "12345567",
  //         transactionName: "cu",
  //         transactionAmount: 300000,
  //         transactionBalance: 500000,
  //         transactionType: "출금",
  //         transactionIsUsed: true,
  //         transactionDate: "2024-02-024T06:16:58.823Z",
  //       },
  //     ],
  //     createdAt: "2024-07-03T06:16:58.823Z",
  //   };

  const getStoryDetail = async () => {
    try {
      const res = await ApiClient.getInstance().getStoryDetail(
        Number(storyIdx),
      );
      console.log(res.data);
      setStoryDetail(res.data);
      setHeartCount(res.data?.storyLikeNum);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCount = async () => {
    try {
      const res = await ApiClient.getInstance().addLikeNum(Number(storyIdx));
      console.log(res);
      setHeartCount(res.data?.storyLikeNum);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStoryDetail();
  }, []);

  useEffect(() => {}, [heartCount]);

  return (
    <>
      <TopBar title="스토리" path={`/story/${getCookie("deptIdx")}/stories`} />
      {/* 이미지 */}
      <div className="mt-12">
        <Swiper
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          style={{
            "--swiper-pagination-color": "#008485",
          }}
        >
          {storyDetail?.storyImageList.map((image, idx) => (
            <SwiperSlide key={idx}>
              <img className="w-full h-64 object-contain" src={image} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex gap-2">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={handleCount}
          >
            {storyDetail?.isLiked ? (
              <FaHeart size={24} />
            ) : (
              <FaRegHeart size={24} />
            )}
            {storyDetail?.storyLikeNum}
          </div>
          <div className="flex items-center gap-1">
            <HiOutlineChatBubbleBottomCenterText size={28} />
            {storyDetail?.storyCommentNum}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryDetail;
