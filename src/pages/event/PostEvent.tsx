import { useCallback, useRef, useState } from "react";
import { Button } from "../../components/common/Button";
import { TopBar } from "../../components/common/TopBar";
import cn from "../../utils/cn";
import { HiOutlinePhoto } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { EventForm } from "../../components/event/EventForm";

export const PostEvent = () => {
  const [type, setType] = useState<string>("신청");
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const changeType = (type: string) => {
    setType(type);
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
      <TopBar title="새 이벤트" back />
      <div className="min-h-full bg-white p-5 pb-28 flex flex-col gap-4">
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
        <EventForm type={type} />

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
          <textarea className="border rounded-xl resize-none w-full h-28 p-2" />
        </div>

        <div className="">
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
          >
            등록
          </Button>
        </div>
      </div>
    </>
  );
};
