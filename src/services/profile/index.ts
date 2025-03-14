import { api } from "@/lib/axios";
import { ProfileCardInfo } from "@/types/profile";

import { ENDPOINT } from "../endpoint";

export const getProfileCardInfo = async () => {
  const { data } = await api.get<ProfileCardInfo>(ENDPOINT.PROFILE_CARD.GET);

  return data;
};
