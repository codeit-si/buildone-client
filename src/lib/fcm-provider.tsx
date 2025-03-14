"use client";

import { useEffect } from "react";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import { useUserStore } from "@/store/user-store";

export default function FcmProvider() {
  const { setFcmToken } = useUserStore();

  useEffect(() => {
    const onMessageFCM = async () => {
      const permission = await Notification.requestPermission();

      if (permission !== "granted") return;

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

      getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      })
        .then((token: string) => {
          setFcmToken(token);
        })
        .catch((err: unknown) => {
          // eslint-disable-next-line no-console
          console.log("An error occurred while retrieving token. ", err);
        });

      onMessage(messaging, (payload) => {
        const notificationTitle =
          payload?.notification?.title || "거북목 주의보";
        const notificationOptions = {
          body: payload.notification?.body,
        };

        if (Notification.permission === "granted") {
          // eslint-disable-next-line no-new
          new Notification(notificationTitle, notificationOptions);
        }
      });
    };

    onMessageFCM();
  }, [setFcmToken]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}
