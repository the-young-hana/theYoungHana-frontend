import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ApiClient from "../../apis/apiClient";
import { Button } from "../../components/common/Button";
import { TopBar } from "../../components/common/TopBar";
import cn from "../../utils/cn";
import "swiper/css";
import { EventForm } from "../../components/event/EventForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../components/common/Modal";
import { EventContext } from "../../context/EventContext";
import { ImageClient } from "../../apis/imageClient";
import ImageUpload from "../../components/common/ImageUpload";

export default function PostEvent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [, setLoading] = useState<boolean>(false);
  const [eventDetail, setEventDetail] = useState<EventDetailType>();
  const eventId = searchParams.get("id");
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { event, setEvent } = useContext(EventContext);
  const [postIdx, setPostIdx] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);

  const getEventDetail = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getEventDetail(Number(eventId));
      if (res.data) {
        setEventDetail(res.data);
        // setImages(res.data.eventImageList);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const postEvent = async (eventPostReqData: FormData) => {
    try {
      setLoading(true);
      const res = await ImageClient.getInstance().postEvent(eventPostReqData);
      if (res.data) {
        setSuccess(true);
        setPostIdx(res.data.eventIdx);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) getEventDetail();
  }, []);

  // 등록
  const handleRegister = () => {
    const formData = new FormData();

    const jsonData = JSON.stringify(event);
    const eventInfo = new Blob([jsonData], { type: "application/json" });
    formData.append("eventCreateReqDto", eventInfo);

    for (let i = 0; i < images.length; i += 1) {
      formData.append("eventImageList", images[i]);
    }

    postEvent(formData);
  };

  useEffect(() => {
    if (success) {
      setIsModalOpen((prev) => !prev);
    }
  }, [success]);

  console.log(event);

  return (
    <>
      <TopBar
        title="새 이벤트"
        path={eventId ? `/event/eventDetail/${eventId}` : "/event/Ing"}
      />
      <div className="min-h-full bg-white p-5 pb-28 flex flex-col gap-4 mt-12">
        <div className="flex justify-between ">
          <p className="font-bold">구분</p>
          <div className="flex gap-2">
            <Button
              roundedFull
              className={cn(
                "!px-3 !py-0.5 text-sm border border-hanaGreen",
                event.eventType === "신청"
                  ? " "
                  : "bg-white !text-hanaGreen font-bold",
              )}
              onClick={() =>
                setEvent((prevEvent) => ({ ...prevEvent, eventType: "신청" }))
              }
            >
              신청
            </Button>
            <Button
              roundedFull
              className={cn(
                "!px-3 !py-0.5 text-sm border border-hanaGreen",
                event.eventType === "응모"
                  ? " "
                  : "bg-white !text-hanaGreen font-bold",
              )}
              onClick={() =>
                setEvent((prevEvent) => ({ ...prevEvent, eventType: "응모" }))
              }
            >
              응모
            </Button>
            <Button
              roundedFull
              className={cn(
                "!px-3 !py-0.5 text-sm border border-hanaGreen",
                event.eventType === "선착"
                  ? " "
                  : "bg-white !text-hanaGreen font-bold",
              )}
              onClick={() =>
                setEvent((prevEvent) => ({ ...prevEvent, eventType: "선착" }))
              }
            >
              선착
            </Button>
          </div>
        </div>
        {eventDetail ? (
          <EventForm type={event.eventType} eventDetail={eventDetail} />
        ) : (
          <EventForm type={event.eventType} />
        )}

        <ImageUpload images={images} setImages={setImages}>
          <div>
            <p className="pl-2 font-semibold">상세</p>
            <textarea
              className="border rounded-xl resize-none w-full h-28 p-2"
              defaultValue={eventDetail?.eventContent}
              ref={contentRef}
              onBlur={() => {
                setEvent((prevEvent) => ({
                  ...prevEvent,
                  eventContent: contentRef.current!.value,
                }));
              }}
            />
          </div>
        </ImageUpload>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <Button
            roundedFull
            className="font-bold text-xl !px-28 py-4 drop-shadow-3xl"
            onClick={handleRegister}
          >
            {!eventId ? "등록" : "수정"}
          </Button>
        </div>

        <Modal
          show={isModalOpen}
          onClose={() => navigate(`/event/eventDetail/${postIdx}`)}
        >
          <div className="flex flex-col items-center px-5">
            <div className="mx-5 mb-7 text-lg">
              {!eventId ? "등록되었습니다." : "수정되었습니다."}
            </div>
            <Button
              gray
              onClick={() => navigate(`/event/eventDetail/${postIdx}`)}
              className="w-full"
            >
              확인
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
}
