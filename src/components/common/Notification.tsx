import React, { FC } from "react";

interface NotificationProps {
  title: string;
  body: string;
}

const Notification: FC<NotificationProps> = ({ title, body }) => {
  return (
    <div className="flex justify-center">
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

export default Notification;
