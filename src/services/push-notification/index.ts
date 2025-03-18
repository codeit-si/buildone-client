import { api } from "@/lib/axios";
import { PushNotificationSetting } from "@/types/setting";

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

/** 푸시 알림 설정 조회 API */
export const getPushNotificationSetting = async () => {
  const { data } = await api.get<PushNotificationSetting>(
    ENDPOINT.PUSH.GET_SETTING,
  );

  return data;
};

/** 푸시 알림 설정(알림 수신 여부) 변경 API */
export const updatePushNotificationSetting = async (isActive: boolean) => {
  const res = await api.put(ENDPOINT.PUSH.SETTING, { isActive });

  return res;
};
