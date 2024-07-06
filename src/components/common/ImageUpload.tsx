import { ChangeEvent, ReactNode, useCallback, useRef, useState } from "react";
import { Button } from "./Button";
import { HiOutlinePhoto } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import Modal from "./Modal";

interface IProps {
  images: File[];
  setImages: (images: File[] | ((prevImages: File[]) => File[])) => void;
  children?: ReactNode;
}

export default function ImageUpload({ images, setImages, children }: IProps) {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imgUploadBtnClick = useCallback(() => {
    if (!imgRef.current) return;
    imgRef.current.click();
  }, []);

  const uploadImg = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const imgLists = Array.from(e.target.files);
      const validImages: File[] = [];

      imgLists.forEach((file) => {
        if (file.size > 1 * 1024 * 1024) {
          setIsModalOpen(true);
          return;
        }
        validImages.push(file);
      });

      setImages((prevImages: File[]) => {
        return [...prevImages, ...validImages];
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
              <div className="h-20 w-32 rounded-xl overflow-hidden">
                <img
                  src={URL.createObjectURL(image)}
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>
              <div
                className="absolute bottom-0 flex justify-center w-full cursor-pointer bg-white opacity-50 rounded-b-xl"
                onClick={() => deleteImage(id)}
              >
                <IoIosClose size={20} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Modal show={isModalOpen} onClose={closeModal} backDrop>
        <div>일부 사진이 용량을 초과하였습니다.</div>
        <Button className="w-full mt-4" onClick={closeModal}>
          확인
        </Button>
      </Modal>
    </>
  );
}
