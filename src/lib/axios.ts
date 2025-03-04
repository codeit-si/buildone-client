import axios, { AxiosError } from "axios";

import { storeAccessTokenInCookie } from "@/services/auth/route-handler";
import {
  getConfigWithAuthorizationHeaders,
  reissueAccessToken,
  retryRequestWithNewToken,
} from "@/services/auth/token";
import { ENDPOINT } from "@/services/endpoint";
import { useAuthStore } from "@/store/auth-store";

import { ApiError } from "./error";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_ADDRESS,
  withCredentials: true,
});

const noAuthPaths: string[] = [ENDPOINT.AUTH.LOGIN, ENDPOINT.AUTH.SIGNUP];

api.interceptors.request.use(
  async (config) => {
    if (config.url && noAuthPaths.includes(config.url)) {
      return config;
    }

    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      return getConfigWithAuthorizationHeaders(config, accessToken);
    }

    const newAccessToken = await reissueAccessToken();

    if (newAccessToken) {
      await storeAccessTokenInCookie(newAccessToken);
      return getConfigWithAuthorizationHeaders(config, newAccessToken);
    }

    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      try {
        const newToken = await reissueAccessToken();

        if (newToken) {
          return await retryRequestWithNewToken(error.config!, newToken, api);
        }

        throw new Error("토큰 갱신에 실패했습니다.");
      } catch (reissueError) {
        const { removeAccessToken } = useAuthStore.getState().actions;
        removeAccessToken();

        return Promise.reject(new ApiError("로그인이 필요합니다."));
      }
    } else {
      return Promise.reject(new ApiError(error));
    }
  },
);

export default api;
