import axios, { InternalAxiosRequestConfig } from "axios";

import { ReissueAccessTokenResponse } from "@/types/auth";

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
export const reissueAccessToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post<ReissueAccessTokenResponse>(
      ENDPOINT.AUTH.TOKEN_VALIDATION,
      null,
      {
        baseURL: process.env.NEXT_PUBLIC_SERVER_ADDRESS,
        withCredentials: true,
      },
    );

    const token = response.data.accessToken;

    if (!token) {
      throw new Error("토큰이 응답에 포함되지 않았습니다.");
    }

    return token;
  } catch (error) {
    return null;
  }
};
