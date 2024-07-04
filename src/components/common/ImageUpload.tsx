import { ChangeEvent, ReactNode, useCallback, useRef } from "react";
import { Button } from "./Button";
import { HiOutlinePhoto } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";

interface IProps {
  images: File[];
  setImages: (images: File[] | ((prevImages: File[]) => File[])) => void;
  children: ReactNode;
}

export default function ImageUpload({ images, setImages, children }: IProps) {
  const imgRef = useRef<HTMLInputElement | null>(null);

  const imgUploadBtnClick = useCallback(() => {
    if (!imgRef.current) return;
    imgRef.current.click();
  }, []);

  const uploadImg = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const imgLists = Array.from(e.target.files);
      setImages((prevImages: File[]) => {
        return [...prevImages, ...imgLists];
      });
    },
    [setImages],
  );

  const deleteImage = useCallback(
    (id: number) => {
      setImages((prevImages: File[]) =>
        prevImages.filter((_, index) => index !== id),
      );
    },
    [setImages],
  );

  return (
    <>
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
        onClick={imgUploadBtnClick}
      >
        <HiOutlinePhoto />
        사진
      </Button>
      <div>{children}</div>
      <div className="z-0">
        <Swiper>
          {images.map((image, id) => (
            <SwiperSlide key={id} className="relative !w-fit mr-3">
              <img src={URL.createObjectURL(image)} className="h-20" />
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
    </>
  );
}
