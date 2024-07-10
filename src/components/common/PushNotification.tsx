import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface PushNotificationProps {
  title: string;
  body: string;
}

const PushNotification: FC<PushNotificationProps> = ({ title, body }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex justify-center cursor-pointer"
      onClick={() => navigate("/notification")}
    >
      <div className="absolute top-14 w-11/12 flex items-center gap-6 p-4 z-50 bg-white/75 backdrop-blur-md shadow-lg rounded-3xl">
        <img className="h-12" src="/images/favicon.png" alt="notification" />
        <div>
          <div className="font-bold">{title}</div>
          <div>{body}</div>
        </div>
      </div>
    </div>
  );
};

export default PushNotification;
