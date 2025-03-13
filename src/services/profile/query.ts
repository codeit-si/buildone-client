import { queryOptions } from "@tanstack/react-query";

import { profileKeys } from "../query-key";

import { getProfileCardInfo } from ".";

export const getProfileCardInfoOptions = () =>
  queryOptions({
    queryKey: profileKeys.all,
    queryFn: () => getProfileCardInfo(),
  });
