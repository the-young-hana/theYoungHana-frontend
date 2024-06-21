import { HTMLAttributes } from "react";
import cn from "../../utils/cn";
import StatusBar from "./StatusBar";

interface IPhoneFrameProps extends HTMLAttributes<HTMLDivElement> {}
function IPhoneFrame({ className = "", children, ...props }: IPhoneFrameProps) {
  const baseClassName =
    "relative flex flex-col items-center w-iPhone h-iPhone shadowed rounded-3xl border-2 border-black overflow-hidden box-content";
  const processedClassName = cn(baseClassName, className);
  return (
    <div className="w-screen h-screen flex flex-col bg-hanaGray justify-center items-center">
      <div className={processedClassName} {...props}>
        {/* 다이나믹 아일랜드 */}
        <div className="absolute top-3 transition-all ease-in-out rounded-full w-28 hover:w-48 h-8 bg-black z-50" />
        <StatusBar className="absolute z-20" />
        {children}
      </div>
    </div>
  );
}
export default IPhoneFrame;
