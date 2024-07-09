importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyA3X6Hj6zLwPwfUpJAaw2cCEZTp8_sQUfY",
  authDomain: "theyounghana-ff6c3.firebaseapp.com",
  projectId: "theyounghana-ff6c3",
  storageBucket: "theyounghana-ff6c3.appspot.com",
  messagingSenderId: "466410738142",
  appId: "1:466410738142:web:0a2fba4c795e9ad2ba0d4f",
  measurementId: "G-YV2JX2P1JD",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/images/favicon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
