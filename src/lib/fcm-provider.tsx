"use client";

import { useEffect } from "react";

import { useUserStore } from "@/store/user-store";
import { getFcmToken } from "@/utils/fcm";

export default function FcmProvider() {
  const { setFcmToken } = useUserStore();

  useEffect(() => {
    const onMessageFCM = async () => {
      const permission = await Notification.requestPermission();

      if (permission !== "granted") return;

      const token = await getFcmToken();
      setFcmToken(token);
    };

    onMessageFCM();
  }, [setFcmToken]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}
