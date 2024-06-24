import { HTMLAttributes } from "react";
import { IoClose } from "react-icons/io5";
import cn from "../../utils/cn";
import StatusBar from "./StatusBar";
interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  xButton?: boolean;
  dark?: boolean;
  hideBackDrop?: boolean;
  modalType?: "modal" | "sheet";
  backDrop?: boolean;
  onClose: () => void;
}
function Modal(modalProps: ModalProps) {
  const {
    show,
    xButton = true,
    dark = false,
    hideBackDrop = false,
    modalType = "modal",
    backDrop = true,
    onClose,
    children,
    className = "",
    ...props
  } = modalProps;
  // 백드롭 클래스네임
  const backdropBaseClassName =
    "absolute top-0 flex flex-col justify-center items-center left-0 w-iPhone h-iPhone z-40 rounded-3xl transition-opacity overflow-hidden";
  const backdropShowClassName = show
    ? "opacity-100"
    : "delay-100 opacity-0  pointer-events-none";
  const backdropHideClassName = hideBackDrop
    ? ""
    : "backdrop-blur-sm bg-black/50";
  const backdropClassName = cn(
    backdropBaseClassName,
    backdropShowClassName,
    backdropHideClassName,
  );
  // 백드롭 온클릭
  const onBackdropClick = () => {
    if (show && backDrop) onClose();
  };

  // 모달 클래스네임
  const modalBaseClassName = "absolute p-6 h-fit transition-all delay-100";
  const modalTypeClassName = {
    modal: "shadowed rounded-3xl w-fit m-4",
    sheet: "bottom-0 w-full rounded-t-3xl",
  }[modalType];
  const modalShowClassName = {
    modal: show ? "opacity-100" : "translate-y-10 opacity-0",
    sheet: show ? "opacity-100" : "translate-y-20 opacity-0",
  }[modalType];
  const modalDarkClassName = dark ? "bg-secondary" : "bg-white";
  const modalClassName = cn(
    modalBaseClassName,
    modalTypeClassName,
    modalShowClassName,
    modalDarkClassName,
    className,
  );

  const XButtonClassName = cn(
    "-translate-x-4 -translate-y-4 p-4 pb-0",
    dark ? "text-white" : "text-black",
  );

  return (
    <>
      {/* 백드롭(어두운 오버레이) */}
      <div className={backdropClassName}>
        {/* 백드롭 눌러서 끄기 */}
        <button className="w-full h-full" onClick={onBackdropClick} />
        {/* 스테이터스바 */}
        {!hideBackDrop && (
          <StatusBar
            className="absolute top-0 pointer-events-none bg-transparent"
            white
          />
        )}
        {/* 모달 */}
        <div className={modalClassName} {...props}>
          {xButton && (
            <button onClick={onClose} className={XButtonClassName}>
              <IoClose size={17} />
            </button>
          )}
          {children}
        </div>
      </div>
    </>
  );
}
export default Modal;
