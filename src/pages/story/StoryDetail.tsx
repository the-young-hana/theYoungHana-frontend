import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { GoKebabHorizontal } from "react-icons/go";
import { agoConverter } from "../../utils/date";
import { getCookie } from "../../utils/cookie";
import ApiClient from "../../apis/apiClient";
import { TopBar } from "../../components/common/TopBar";
import Modal from "../../components/common/Modal";
import Transaction from "../../components/story/Transaction";

import "swiper/css";
import "swiper/css/pagination";
import "./story.css";

function StoryDetail() {
  const { storyIdx } = useParams();
  const navigate = useNavigate();
  const [storyDetail, setStoryDetail] = useState<StoryDetailResType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getStoryDetail = async () => {
    try {
      const res = await ApiClient.getInstance().getStoryDetail(
        Number(storyIdx),
      );
      console.log(res.data);
      setStoryDetail(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCount = async () => {
    try {
      const res = await ApiClient.getInstance().addLikeNum(Number(storyIdx));
      console.log(res);
      setStoryDetail(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowComments = () => {};

  useEffect(() => {
    getStoryDetail();
  }, []);

  return (
    <>
      <TopBar title="스토리" path={`/story/${getCookie("deptIdx")}/stories`} />
      {/* 이미지 */}
      <div className="pt-12">
        <div className="relative flex flex-col gap-4 bg-white shadow-md pb-4">
          {/* 이미지 */}
          <div>
            <Swiper
              pagination={{
                dynamicBullets: true,
                clickable: true,
                el: ".swiper-pagination",
              }}
              modules={[Pagination]}
            >
              {storyDetail?.storyImageList.map((image, idx) => (
                <SwiperSlide key={idx}>
                  <div className="bg-white">
                    <img className="w-full h-64 object-contain" src={image} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-pagination" />
          </div>

          {/* 좋아요, 댓글 개수 */}
          <div className="flex gap-2 mx-4">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={handleCount}
            >
              {storyDetail?.isLiked ? (
                <FaHeart size={24} color="#D70037" />
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

          {/* 스토리 내용 */}
          <div className="flex justify-between items-start mx-4">
            <div>{storyDetail?.storyContent}</div>
            <GoKebabHorizontal onClick={() => setIsModalOpen(!isModalOpen)} />
          </div>

          {/* 스토리 날짜 */}
          <div className="mx-4">{agoConverter(storyDetail?.createdAt!)}</div>
        </div>

        {/* 댓글 */}
        <div className="m-4">
          <div className="text-xl">댓글 {storyDetail?.storyCommentNum}</div>
          <div
            className="flex items-center gap-3 bg-white rounded-xl my-2 p-3 cursor-pointer"
            onClick={handleShowComments}
          >
            {storyDetail?.storyComment !== null ? (
              <>
                <img src="/images/profile.png" className="w-10" alt="profile" />
                <div>{storyDetail?.storyComment.commentContent}</div>
              </>
            ) : (
              <div className="text-center">첫 댓글을 남겨보세요 !</div>
            )}
          </div>
        </div>

        {/* 거래내역 */}
        <div className="mx-4 my-2 text-xl">
          거래 내역 {storyDetail?.transactionList.length}
        </div>
        <Transaction transactionList={storyDetail?.transactionList!} />
      </div>

      {/* 수정 삭제 모달 */}
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        modalType="sheet"
        className="!px-5 "
      >
        <div
          className="p-2 border-b-2 cursor-pointer"
          onClick={() => navigate(``)}
        >
          수정
        </div>
        <div className="p-2 border-b-2 cursor-pointer">삭제</div>
      </Modal>
    </>
  );
}

export default StoryDetail;
