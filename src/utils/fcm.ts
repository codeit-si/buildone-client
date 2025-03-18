import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const getFcmToken = async () => {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const messaging = getMessaging(firebaseApp);

  const fcmToken = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  });

  onMessage(messaging, (payload) => {
    const notificationTitle =
      payload?.notification?.title || "🚨 거북목 주의보! 🚨";
    const notificationOptions = {
      body:
        payload.notification?.body ||
        "1시간이 지났어요! 자세를 바르게 하고, 목과 어깨를 가볍게 풀어주세요🙂",
    };

    if (Notification.permission === "granted") {
      // eslint-disable-next-line no-new
      new Notification(notificationTitle, notificationOptions);
    }
  });

  return fcmToken;
};
