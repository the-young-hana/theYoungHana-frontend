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
import { Button } from "../../components/common/Button";

import "swiper/css";
import "swiper/css/pagination";
import "./story.css";
import Comments from "../../components/story/Comments";
import { useTransaction } from "../../context/TransactionContext";

function StoryDetail() {
  const { storyIdx } = useParams();
  const navigate = useNavigate();

  const [storyDetail, setStoryDetail] = useState<StoryDetailResType>();
  const [isShow, setIsShow] = useState({
    isCommentModalOpen: false,
    isMenuModalOpen: false,
    isDeleteModalOpen: false,
  });

  const { storeUpdatedTransaction } = useTransaction();

  const getStoryDetail = async () => {
    try {
      const res = await ApiClient.getInstance().getStoryDetail(
        Number(storyIdx),
      );
      setStoryDetail(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCount = async () => {
    try {
      const res = await ApiClient.getInstance().addLikeNum(Number(storyIdx));
      setStoryDetail(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    const selectedTransactionIdx = storyDetail?.transactionList.flatMap(
      (transaction) =>
        transaction.transactions.map((item) => item.transactionIdx),
    );
    storeUpdatedTransaction(
      selectedTransactionIdx!,
      storyDetail?.storyTitle!,
      storyDetail?.storyContent!,
    );
    navigate(`/story/update/${storyIdx}/1`);
  };

  const handleDelete = async () => {
    setIsShow((prev) => ({
      ...prev,
      isMenuModalOpen: false,
      isDeleteModalOpen: false,
    }));
    try {
      const res = await ApiClient.getInstance().deleteStory(Number(storyIdx));
      console.log(res);
      if (res.status === 200) {
        navigate(`/story/${getCookie("deptIdx")}/stories`);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          {storyDetail?.storyImageList !== null ? (
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
          ) : (
            <div className="w-full h-64 flex justify-center items-center">
              등록된 이미지가 없습니다.
            </div>
          )}

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
            {getCookie("isAdmin") && (
              <GoKebabHorizontal
                onClick={() =>
                  setIsShow((prev) => ({ ...prev, isMenuModalOpen: true }))
                }
              />
            )}
          </div>

          {/* 스토리 날짜 */}
          <div className="mx-4">{agoConverter(storyDetail?.createdAt!)}</div>
        </div>

        {/* 댓글 */}
        <div className="m-4">
          <div className="text-xl">댓글 {storyDetail?.storyCommentNum}</div>
          <div
            className="flex items-center gap-3 bg-white rounded-xl my-2 p-3 cursor-pointer"
            onClick={() =>
              setIsShow((prev) => ({ ...prev, isCommentModalOpen: true }))
            }
          >
            {storyDetail?.storyComment !== null ? (
              <>
                <img
                  src="/images/profile.png"
                  className="w-10 h-10"
                  alt="profile"
                />
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

      {/* 댓글 모달 */}
      <Modal
        show={isShow.isCommentModalOpen}
        onClose={() =>
          setIsShow((prev) => ({ ...prev, isCommentModalOpen: false }))
        }
        backDrop
        modalType="sheet"
      >
        <Comments />
      </Modal>

      {/* 수정 삭제 모달 */}
      <Modal
        show={isShow.isMenuModalOpen}
        onClose={() =>
          setIsShow((prev) => ({ ...prev, isMenuModalOpen: false }))
        }
        modalType="sheet"
        className="!px-5 "
      >
        <div className="p-2 border-b-2 cursor-pointer" onClick={handleUpdate}>
          수정
        </div>
        <div
          className="p-2 border-b-2 cursor-pointer"
          onClick={() =>
            setIsShow((prev) => ({ ...prev, isDeleteModalOpen: true }))
          }
        >
          삭제
        </div>
      </Modal>
      <Modal
        show={isShow.isDeleteModalOpen}
        onClose={() =>
          setIsShow((prev) => ({ ...prev, isDeleteModalOpen: false }))
        }
      >
        <div className="flex flex-col items-center gap-2">
          <div>삭제하시겠습니까?</div>
          <div className="flex gap-2">
            <Button
              gray
              onClick={() =>
                setIsShow((prev) => ({
                  ...prev,
                  isMenuModalOpen: false,
                  isDeleteModalOpen: false,
                }))
              }
            >
              취소
            </Button>
            <Button onClick={handleDelete}>확인</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default StoryDetail;
