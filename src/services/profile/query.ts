import { queryOptions } from "@tanstack/react-query";

import { profileKeys } from "../query-key";

import { getProfileCardInfo } from ".";

export const getProfileCardInfoOptions = (enabled: boolean) =>
  queryOptions({
    queryKey: profileKeys.all,
    queryFn: () => getProfileCardInfo(),
    enabled,
  });
