import { queryOptions } from "@tanstack/react-query";

import { settingKeys } from "../query-key";

import { getPushNotificationSetting } from "./index";

export const getPushNotificationSettingOptions = () =>
  queryOptions({
    queryKey: settingKeys.all,
    queryFn: getPushNotificationSetting,
  });
