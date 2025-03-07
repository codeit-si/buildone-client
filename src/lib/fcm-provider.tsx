/* eslint-disable no-console */

"use client";

import { useEffect } from "react";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

export default function FcmProvider() {
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
        console.log(`푸시 토큰 발급 완료: ${token}`);
      })
      .catch((err: unknown) => {
        console.log("An error occurred while retrieving token. ", err);
      });
  };

  useEffect(() => {
    onMessageFCM();
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}
