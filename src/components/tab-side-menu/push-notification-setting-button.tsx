"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import CheckBoxOffIcon from "@/assets/icons-small/checkbox/checkbox_off.svg";
import CheckBoxOnIcon from "@/assets/icons-small/checkbox/checkbox_on.svg";
import { useUpdatePushNotificationSetting } from "@/hooks/query/use-setting";
import { getPushNotificationSettingOptions } from "@/services/push-notification/query";
import { errorToast } from "@/utils/custom-toast";

export default function PushNotificationSettingButton() {
  const { data } = useSuspenseQuery(getPushNotificationSettingOptions());

  const { mutate } = useUpdatePushNotificationSetting();

  const handleSettingCheckBox = async (isActive: boolean) => {
    if (isActive) {
      const permission = await Notification.requestPermission();

      if (permission === "denied") {
        errorToast(
          "request-permission",
          "브라우저 설정에서 알림을 허용해주세요.",
        );
      }

      if (permission === "granted") {
        mutate(isActive);
      }
    } else {
      mutate(isActive);
    }
  };

  return (
    <div className="flex h-48 w-232 items-center justify-center gap-x-7 rounded-12 border border-dark-blue-500">
      <label
        htmlFor="push-notification"
        className="relative flex cursor-pointer items-center hover:drop-shadow"
        aria-label={`${data.webPushIsActive ? "푸시 알림 On" : "푸시 알림 Off"}`}
      >
        <input
          id="push-notification"
          type="checkbox"
          checked={data.webPushIsActive}
          aria-checked={data.webPushIsActive}
          onChange={(e) => {
            handleSettingCheckBox(e.target.checked);
          }}
          className="hidden"
        />
        {data.webPushIsActive ? <CheckBoxOnIcon /> : <CheckBoxOffIcon />}
      </label>
      <p className="text-base font-semibold text-dark-blue-500">
        거북목 주의보 알림
      </p>
    </div>
  );
}
