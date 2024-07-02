import { useCallback, useEffect, useRef, useState } from "react";
import ApiClient from "../../apis/apiClient";
import { Button } from "../../components/common/Button";
import { TopBar } from "../../components/common/TopBar";
import cn from "../../utils/cn";
import { HiOutlinePhoto } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { EventForm } from "../../components/event/EventForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../components/common/Modal";

export default function PostEvent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [type, setType] = useState<string>("신청");
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [, setLoading] = useState<boolean>(false);
  const [eventDetail, setEventDetail] = useState<EventDetailType>();
  const eventId = searchParams.get("id");
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextArea = () => {
    console.log(contentRef.current?.value);
  };

  const getEventDetail = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getEventDetail(Number(eventId));
      if (res.data) {
        setEventDetail(res.data);
        setImages(res.data.eventImageList);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) getEventDetail();
  }, []);

  const changeType = (type: string) => {
    setType(type);
  };

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const uploadBtnClick = useCallback(() => {
    if (!imgRef.current) return;
    imgRef.current.click();
  }, []);

  const uploadImg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const imgLists = e.target.files;
    setImages((prevImages) => {
      let imgUrlLists = [...prevImages];

      for (let i = 0; i < imgLists.length; i += 1) {
        const currentImgUrl = URL.createObjectURL(imgLists[i]);
        imgUrlLists.push(currentImgUrl);
      }

      if (imgUrlLists.length > 10) {
        imgUrlLists = imgUrlLists.slice(0, 10);
      }

      return imgUrlLists;
    });
  }, []);

  const deleteImage = (id: number) => {
    setImages(images.filter((_, index) => index !== id));
  };

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
                type === "신청" ? " " : "bg-white !text-hanaGreen font-bold",
              )}
              onClick={() => changeType("신청")}
            >
              신청
            </Button>
            <Button
              roundedFull
              className={cn(
                "!px-3 !py-0.5 text-sm border border-hanaGreen",
                type === "응모" ? " " : "bg-white !text-hanaGreen font-bold",
              )}
              onClick={() => changeType("응모")}
            >
              응모
            </Button>
            <Button
              roundedFull
              className={cn(
                "!px-3 !py-0.5 text-sm border border-hanaGreen",
                type === "선착" ? " " : "bg-white !text-hanaGreen font-bold",
              )}
              onClick={() => changeType("선착")}
            >
              선착
            </Button>
          </div>
        </div>
        {eventDetail ? (
          <EventForm type={type} eventDetail={eventDetail} />
        ) : (
          <EventForm type={type} />
        )}

        {/* 상세 */}
        <input
          type="file"
          accept="images/*"
          multiple
          ref={imgRef}
          onChange={uploadImg}
          className="invisible w-0 h-0"
        />
        <Button
          className="flex items-center gap-2 rounded-lg !px-3 !py-2 bg-white border-[1px] border-hanaGray2 !text-black text-sm"
          onClick={uploadBtnClick}
        >
          <HiOutlinePhoto />
          사진
        </Button>
        <div>
          <p className="pl-2 font-semibold">상세</p>
          <textarea
            className="border rounded-xl resize-none w-full h-28 p-2"
            defaultValue={eventDetail?.eventContent}
            onBlur={handleTextArea}
            ref={contentRef}
          />
        </div>

        <div className="z-0">
          <Swiper slidesPerView={"auto"}>
            {images.map((image, id) => (
              <SwiperSlide key={id} className="relative !w-fit mr-3">
                <img src={image} className="h-20" />
                <div
                  className="absolute top-0 cursor-pointer bg-white opacity-50"
                  onClick={() => deleteImage(id)}
                >
                  <IoIosClose size={20} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <Button
            roundedFull
            className="font-bold text-xl !px-28 py-4 drop-shadow-3xl"
            onClick={handleModal}
          >
            {!eventId ? "등록" : "수정"}
          </Button>
        </div>

        <Modal show={isModalOpen} onClose={() => navigate("/event")}>
          <div className="flex flex-col items-center px-5">
            <div className="mx-5 mb-7 text-lg">
              {!eventId ? "등록되었습니다." : "수정되었습니다."}
            </div>
            <Button
              gray
              onClick={() => navigate("/event/eventDetail/1")}
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
