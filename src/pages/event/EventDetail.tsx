import { useNavigate } from "react-router-dom";
import { TopBar } from "../../components/common/TopBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { Button } from "../../components/common/Button";
import { useState } from "react";
import Modal from "../../components/common/Modal";
import { CiMenuKebab } from "react-icons/ci";

const eventDetail = {
  isMine: true,
  event_idx: 0,
  event_start_datetime: "2024.06.01",
  event_end_date_time: "2024.06.05",
  event_fee: 0,
  event_content: `다가올 중간고사를 위해 열심히 공부하고 있는 사회과학대학 학우분들을 위해 임팩트에서 중간고사 간식 나눔을 준비했습니다.
앞서 공지했듯이 중간고사 간식나눔 메뉴는 '맘스터치 싸이버거 세트 기프티콘' [80개]와 '공차 5000원 기프티콘' [40개] 입니다.
단, 미리 신청하거나 중복신청은 불가하니 그 점 유의해주세요! 다가올 중간고사를 위해 열심히 공부하고 있는 사회과학대학 학우분들을 위해 임팩트에서 중간고사 간식 나눔을 준비했습니다.
앞서 공지했듯이 중간고사 간식나눔 메뉴는 '맘스터치 싸이버거 세트 기프티콘' [80개]와 '공차 5000원 기프티콘' [40개] 입니다.
단, 미리 신청하거나 중복신청은 불가하니 그 점 유의해주세요!`,
};
export const EventDetail = () => {
  const navigate = useNavigate();
  const [isUDModalOpen, setIsUDModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [delModalOpen, setDelModalOpen] = useState<boolean>(false);

  const handelUDModal = () => {
    setIsUDModalOpen((prev) => !prev);
  };

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleDelModal = () => {
    setIsUDModalOpen(false);
    setDelModalOpen((prev) => !prev);
  };

  const onClickDelete = () => {
    handleDelModal();
  };

  return (
    <>
      <TopBar title={"2024년도 1학기 간식사업"} path={"/event/ing"} />
      <div className="min-h-full bg-white pb-28">
        {/* 이미지 */}
        <div className="mt-12 pt-5">
          <Swiper
            slidesPerView={1.1}
            centeredSlides
            scrollbar
            modules={[Scrollbar]}
          >
            <SwiperSlide className="mb-5">
              <img src="/images/event_img.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/event_img.png" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/event_img.png" />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* 내용 */}
        <div className="relative flex flex-col gap-4 px-5 pt-8">
          {eventDetail.isMine && (
            <div
              className="absolute right-2 cursor-pointer"
              onClick={handelUDModal}
            >
              <CiMenuKebab size={20} />
            </div>
          )}
          <div className="flex gap-4">
            <Button
              roundedFull
              disabled
              className="!bg-dark2 text-xs !w-20 !px-0 !py-2"
            >
              신청기간
            </Button>
            <div className="w-4/5 text-sm">
              {eventDetail.event_start_datetime} ~{" "}
              {eventDetail.event_end_date_time}
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              roundedFull
              disabled
              className="!bg-dark2 text-xs !w-20 !px-0 !py-2"
            >
              참가비
            </Button>
            <div className="w-4/5 text-sm">
              {eventDetail.event_fee === 0 ? "없음" : eventDetail.event_fee}
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              roundedFull
              disabled
              className="!bg-dark2 text-xs !w-20 !px-0 !py-2"
            >
              상세
            </Button>
            <div className="w-4/5 text-sm">{eventDetail.event_content}</div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <Button
            roundedFull
            className="font-bold text-xl !px-28 py-4 drop-shadow-3xl"
            onClick={handleModal}
          >
            신청
          </Button>
        </div>
      </div>
      <Modal
        show={isUDModalOpen}
        onClose={handelUDModal}
        modalType="sheet"
        className="!px-5"
      >
        <div
          className="p-2 border-b-2 cursor-pointer"
          onClick={() => navigate(`/event/post?id=${eventDetail.event_idx}`)}
        >
          수정
        </div>
        <div className="p-2 border-b-2 cursor-pointer" onClick={onClickDelete}>
          삭제
        </div>
      </Modal>
      <Modal show={isModalOpen} onClose={handleModal}>
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="font-bold text-xl">응모가 완료되었습니다</div>
          <div className="text-hanaGray2 whitespace-pre-line text-center">
            {"상점이 열리면\n앱푸시로 알려드릴까요?"}
          </div>
          <div className="flex gap-3">
            <Button gray className="!py-3" onClick={handleModal}>
              닫기
            </Button>
            <Button className="!py-3" onClick={handleModal}>
              네, 알려주세요
            </Button>
          </div>
        </div>
      </Modal>
      <Modal show={delModalOpen} onClose={() => navigate("/event/ing")}>
        <div className="flex flex-col items-center px-5">
          <div className="mx-5 mb-7 text-lg">삭제되었습니다</div>
          <Button
            gray
            onClick={() => navigate("/event/ing")}
            className="w-full"
          >
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
};
