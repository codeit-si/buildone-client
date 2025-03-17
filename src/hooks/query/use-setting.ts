import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updatePushNotificationSetting } from "@/services/push-notification";
import { settingKeys } from "@/services/query-key";
import { successToast } from "@/utils/custom-toast";

export const useUpdatePushNotificationSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isActive: boolean) => updatePushNotificationSetting(isActive),
    onSuccess: (_, isActive) => {
      queryClient.invalidateQueries({ queryKey: settingKeys.all });

      successToast(
        "update-push-notification-setting",
        `${isActive ? "거북목 주의보 알림이 활성화되었습니다." : "거북목 주의보 알림이 비활성화되었습니다."}`,
      );
    },
  });
};
