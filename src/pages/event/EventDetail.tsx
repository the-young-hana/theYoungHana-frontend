import { useNavigate, useParams } from "react-router-dom";
import ApiClient from "../../apis/apiClient";
import { TopBar } from "../../components/common/TopBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { Button } from "../../components/common/Button";
import { useEffect, useState } from "react";
import Modal from "../../components/common/Modal";
import "swiper/css";
import { dateToString } from "../../utils/date";
import { GoKebabHorizontal } from "react-icons/go";

export default function EventDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const [isUDModalOpen, setIsUDModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [delModalOpen, setDelModalOpen] = useState<boolean>(false);
  const [, setLoading] = useState<boolean>(false);
  const [eventDetail, setEventDetail] = useState<EventDetailType>();
  const [delFailModalOpen, setDelFailModalOpen] = useState<boolean>(false);
  const [alreadyModal, setAlreadyModal] = useState<boolean>(false);

  const getEventDetail = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getEventDetail(
        Number(params.eventId),
      );
      if (res.data) {
        setEventDetail(res.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async () => {
    try {
      setLoading(true);
      await ApiClient.getInstance().deleteEvent(Number(params.eventId));
      setDelModalOpen(true);
    } catch (error) {
      setDelFailModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const postEventJoin = async () => {
    try {
      setLoading(true);
      await ApiClient.getInstance().postEventJoin(Number(params.eventId));
      handleModal();
    } catch (error) {
      setAlreadyModal(true);
    } finally {
      setLoading(false);
    }
  };

  const postEventPush = async () => {
    try {
      setLoading(true);
      await ApiClient.getInstance().postEventPush(Number(params.eventId));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventDetail();
  }, []);

  const handelUDModal = () => {
    setIsUDModalOpen((prev) => !prev);
  };

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleMoveToList = (success: boolean) => {
    setDelFailModalOpen(false);
    setIsUDModalOpen(false);

    if (success) {
      setDelModalOpen((prev) => !prev);
      navigate("/event/ing");
    }
  };

  const onClickDelete = () => {
    deleteEvent();
  };

  const onClickJoin = () => {
    postEventJoin();
  };

  const onClickPushAlram = () => {
    postEventPush();
    handleModal();
  };

  return (
    <>
      <TopBar path={"/event/ing"} />
      <div className="min-h-full bg-white pb-28 mt-12">
        {eventDetail && (
          <>
            {/* 이미지 */}
            {eventDetail.eventImageList.length === 0 ? (
              <div className="w-full pt-7 flex items-center justify-center">
                <div className="w-[300px] h-[300px] bg-gray-50 flex items-center justify-center">
                  <div>등록된 이미지가 없습니다.</div>
                </div>
              </div>
            ) : (
              <div className="mt-12 pt-5">
                <Swiper
                  slidesPerView={1}
                  centeredSlides
                  scrollbar
                  modules={[Scrollbar]}
                >
                  {eventDetail.eventImageList.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full flex items-center justify-center">
                        <img src={img} className="flex w-4/5 object-contain" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {/* 내용 */}
            <div className="relative flex flex-col gap-4 px-5 pt-8">
              {eventDetail.isMine && (
                <div className="w-full flex justify-end">
                  <GoKebabHorizontal
                    size={20}
                    onClick={handelUDModal}
                    className="cursor-pointer"
                  />
                </div>
              )}
              <div className="flex gap-4 items-center">
                <Button
                  roundedFull
                  disabled
                  className="!bg-dark2 text-xs !w-20 !px-0 !py-2"
                >
                  제목
                </Button>
                <div className="w-4/5 text-sm font-bold">
                  {eventDetail.eventTitle}
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Button
                  roundedFull
                  disabled
                  className="!bg-dark2 text-xs !w-20 !px-0 !py-2"
                >
                  신청기간
                </Button>
                <div className="w-4/5 text-sm">
                  {dateToString(new Date(eventDetail.eventStart))} ~{" "}
                  {dateToString(new Date(eventDetail.eventEnd))}
                </div>
              </div>
              <div className="flex gap-4 items-center">
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
                    : `${eventDetail.eventFee.toLocaleString()}원`}
                </div>
              </div>
              {eventDetail.eventType === "응모" && (
                <div className="flex gap-4 items-center">
                  <Button
                    roundedFull
                    disabled
                    className="!bg-dark2 text-xs !w-20 !px-0 !py-2"
                  >
                    당첨인원
                    <br />및 상품
                  </Button>
                  <div className="w-4/5 text-sm pr-2">
                    {eventDetail.eventPrizeList.map((prize, index) => (
                      <div className="flex gap-3" key={index}>
                        <div>{index + 1}등</div>
                        <div className="max-w-40 break-words">
                          {prize.prizeName}
                        </div>
                        <div>{prize.prizeLimit}명</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {eventDetail.eventContent !== "" && (
                <div className="flex gap-4 items-center">
                  <Button
                    roundedFull
                    disabled
                    className="!bg-dark2 text-xs !w-20 !px-0 !py-2"
                  >
                    상세
                  </Button>
                  <div className="w-4/5 text-sm">
                    {eventDetail.eventContent}
                  </div>
                </div>
              )}
            </div>

            {/* 버튼 */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              {eventDetail.isEnd === 0 ? (
                <Button
                  roundedFull
                  className="font-bold text-xl !px-28 py-4 drop-shadow-3xl"
                  onClick={onClickJoin}
                >
                  신청
                </Button>
              ) : eventDetail.isEnd === 1 ||
                eventDetail.eventType !== "응모" ? (
                <Button
                  roundedFull
                  disabled
                  className="font-bold text-xl !px-28 py-4 drop-shadow-3xl"
                >
                  마감
                </Button>
              ) : (
                <Button
                  roundedFull
                  className="font-bold text-xl !px-28 py-4 drop-shadow-3xl"
                  onClick={() =>
                    navigate(`/event/winner/${eventDetail.eventIdx}`)
                  }
                >
                  당첨자보기
                </Button>
              )}
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
            <Button className="!py-3" onClick={onClickPushAlram}>
              네, 알려주세요
            </Button>
          </div>
        </div>
      </Modal>

      <Modal show={delModalOpen} onClose={() => handleMoveToList(true)}>
        <div className="flex flex-col items-center px-5">
          <div className="mx-5 mb-7 text-lg">삭제되었습니다</div>
          <Button onClick={() => handleMoveToList(true)} className="w-full">
            확인
          </Button>
        </div>
      </Modal>
      <Modal show={delFailModalOpen} onClose={() => handleMoveToList(false)}>
        <div className="flex flex-col items-center px-5">
          <div className="mx-5 mb-7 text-lg">
            진행되지 않은 이벤트만 <br />
            삭제할 수 있어요
          </div>
          <Button onClick={() => handleMoveToList(false)} className="w-full">
            확인
          </Button>
        </div>
      </Modal>
      <Modal show={alreadyModal} onClose={() => setAlreadyModal(false)}>
        <div className="flex flex-col items-center px-5">
          <div className="mx-5 mb-7 text-lg">
            이미 해당 이벤트에 참가 신청을 하였습니다.
          </div>
          <Button onClick={() => setAlreadyModal(false)} className="w-full">
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
}
