import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { ENDPOINT } from "../endpoint";

/** 기존 config에 Authorization 헤더 추가 */
export const getConfigWithAuthorizationHeaders = (
  config: InternalAxiosRequestConfig,
  token: string,
) => {
  const newConfig = { ...config };
  newConfig.headers.set("Authorization", `Bearer ${token}`);

  return newConfig;
};

/** accessToken 재발급 요청 */
export const reissueAccessToken = async (): Promise<string | undefined> => {
  const response = await axios.post(
    ENDPOINT.AUTH.TOKEN_VALIDATION,
    {},
    { withCredentials: true },
  );

  return response.headers?.["access-token"];
};

/** 새 토큰으로 요청 재시도 */
export const retryRequestWithNewToken = async (
  config: InternalAxiosRequestConfig,
  token: string,
  api: AxiosInstance,
) => {
  const newConfig = getConfigWithAuthorizationHeaders(config, token);
  return api(newConfig);
};
