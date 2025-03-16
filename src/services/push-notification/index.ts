import { api } from "@/lib/axios";

import { ENDPOINT } from "../endpoint";

/** FCM 웹 푸시 토큰 등록 API */
export const registerFcmToken = async (token: string, memberId: number) => {
  const res = await api.post(ENDPOINT.PUSH.REGISTER_TOKEN, { token, memberId });

  return res;
};

/** FCM 웹 푸시 알림 발송 API */
export const sendPushNotification = async (
  memberId: number,
  title: string,
  body: string,
) => {
  const res = await api.post(ENDPOINT.PUSH.SEND, { memberId, title, body });

  return res;
};
