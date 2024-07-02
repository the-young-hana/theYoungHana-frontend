import { useNavigate, useParams } from "react-router-dom";
import ApiClient from "../../apis/apiClient";
import { TopBar } from "../../components/common/TopBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { Button } from "../../components/common/Button";
import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import { CiMenuKebab } from "react-icons/ci";
import { formatter2 } from "../../utils/dateTimeformat";

export default function EventDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [isUDModalOpen, setIsUDModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [delModalOpen, setDelModalOpen] = useState<boolean>(false);
  const [, setLoading] = useState<boolean>(false);
  const [eventDetail, setEventDetail] = useState<EventDetailType>();

  useEffect(() => {
    const getEventDetail = async () => {
      try {
        setLoading(true);
        const res = await ApiClient.getInstance().getEventDetail(
          Number(params.eventId),
        );
        if (res.data) {
          console.log(res.data);
          setEventDetail(res.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getEventDetail();
  }, []);

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
        {eventDetail && (
          <>
            {/* 이미지 */}
            <div className="mt-12 pt-5">
              <Swiper
                slidesPerView={1.1}
                centeredSlides
                scrollbar
                modules={[Scrollbar]}
              >
                {eventDetail.eventImageList.map((img, index) => (
                  <SwiperSlide className="mb-5" key={index}>
                    <img src={img} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* 내용 */}
            <div className="relative flex flex-col gap-4 px-5 pt-8">
              {!eventDetail.isMine && (
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
                  {formatter2(eventDetail.eventStart)} ~{" "}
                  {formatter2(eventDetail.eventEnd)}
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
                  {eventDetail.eventFee === 0
                    ? "없음"
                    : eventDetail.eventFee.toLocaleString()}
                  원
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
                <div className="w-4/5 text-sm">{eventDetail.eventContent}</div>
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
          </>
        )}
      </div>
      <Modal
        show={isUDModalOpen}
        onClose={handelUDModal}
        modalType="sheet"
        className="!px-5 "
      >
        <div
          className="p-2 border-b-2 cursor-pointer"
          onClick={() => navigate(`/event/post?id=${Number(params.eventId)}`)}
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
}
