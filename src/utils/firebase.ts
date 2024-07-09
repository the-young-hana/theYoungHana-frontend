import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getCookie, setCookie } from "./cookie";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

getToken(messaging, {
  vapidKey: import.meta.env.VITE_VAPID_KEY,
})
  .then((currentToken) => {
    console.log(currentToken);
    if (currentToken) {
      if (getCookie("accessToken")) {
        setCookie("fcmToken", currentToken);
      }
    } else {
      console.log(
        "토큰을 사용할 수 없습니다. 토큰 생성을 위한 권한을 요청하십시오.",
      );
    }
  })
  .catch((e: any) => {
    console.log("토큰을 가져오는 동안 오류가 발생했습니다. ", e);
    const error =
      "DOMException: Failed to execute 'subscribe' on 'PushManager': Subscription failed - no active Service Worker";
    if (e.toString() === error) {
      return getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY,
      });
    } else {
      throw e;
    }
  });

onMessage(messaging, (payload) => {
  console.log("메시지가 도착했습니다. ", payload);
});
