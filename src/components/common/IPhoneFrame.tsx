import { HTMLAttributes, useEffect, useState } from "react";
import cn from "../../utils/cn";
import StatusBar from "./StatusBar";
import { Outlet, useLocation } from "react-router-dom";
import { generateToken, messaging } from "../../utils/firebase";
import { onMessage } from "firebase/messaging";
import Notification from "./Notification";

interface IPhoneFrameProps extends HTMLAttributes<HTMLDivElement> {}
function IPhoneFrame({ className = "", children, ...props }: IPhoneFrameProps) {
  const location = useLocation();

  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({
    title: "",
    body: "",
  });

  const baseClassName =
    "relative flex flex-col items-center w-iPhone h-screen-plus-12 iPhone:!h-iPhone -translate-y-12 shadowed !gap-0 rounded-3xl border-2 border-black overflow-hidden box-content";
  const processedClassName = cn(baseClassName, className);

  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      setShowNotification(true);
      setNotification({
        title: payload.notification?.title || "",
        body: payload.notification?.body || "",
      });
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    });
  }, []);

  return (
    <div className="w-screen h-screen-plus-12 flex flex-col bg-hanaGray justify-center items-center overflow-hidden">
      <div className={processedClassName} {...props}>
        {/* 다이나믹 아일랜드 */}
        <div className="absolute top-3 transition-all ease-in-out rounded-full w-28 hover:w-48 h-8 bg-black z-50" />
        <StatusBar className="absolute z-20" />

        <div
          className={cn(
            location.pathname === "/story" || location.pathname === "/event"
              ? "mt-[132px]"
              : "mt-24",
            "w-full h-full overflow-auto",
          )}
        >
          {/* <div className="mt-24 w-full h-full overflow-auto"> */}
          {showNotification && (
            <Notification title={notification.title} body={notification.body} />
          )}
          <Outlet />
        </div>
        {/* 홈바 */}
        <div className="absolute bottom-2 transition-all ease-in-out rounded-full w-48 hover:scale-105 h-[5px] bg-black z-50" />
      </div>
    </div>
  );
}
export default IPhoneFrame;
