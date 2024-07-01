import { HTMLAttributes } from "react";
import cn from "../../utils/cn";
import StatusBar from "./StatusBar";
import { Outlet } from "react-router-dom";

interface IPhoneFrameProps extends HTMLAttributes<HTMLDivElement> {}
function IPhoneFrame({ className = "", children, ...props }: IPhoneFrameProps) {
  const baseClassName =
    "relative flex flex-col items-center w-iPhone h-screen-support-safari sm:!h-iPhone shadowed !gap-0 sm:rounded-3xl sm:border-2 border-black overflow-hidden box-content ";
  const processedClassName = cn(baseClassName, className);
  return (
    <div className="w-screen h-screen-support-safari flex flex-col  bg-hanaGray justify-center items-center overflow-hidden">
      <div className={processedClassName} {...props}>
        {/* 다이나믹 아일랜드 */}
        <div className="hidden sm:flex absolute top-3 transition-all ease-in-out rounded-full w-28 hover:w-48 h-8 bg-black z-50" />
        <StatusBar className="hidden sm:flex absolute z-20" />
        <div className="mt-12 sm:mt-[95px] w-full h-full overflow-auto ">
          <Outlet />
        </div>
        {/* 홈바 */}
        <div className="hidden sm:flex absolute bottom-2 transition-all ease-in-out rounded-full w-48 hover:scale-105 h-[5px] bg-black z-50" />
      </div>
    </div>
  );
}
export default IPhoneFrame;
