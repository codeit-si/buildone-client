import axios, { AxiosError } from "axios";

import { useAuthStore } from "@/store/auth-store";
import {
  getConfigWithAuthorizationHeaders,
  isAccessTokenExpired,
  refreshToken,
} from "@/utils/auth";

import { ApiError } from "./error";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_ADDRESS,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const { accessToken, expiredTime } = useAuthStore.getState();

    if (isAccessTokenExpired(expiredTime)) {
      const newToken = await refreshToken();
      return getConfigWithAuthorizationHeaders(config, newToken);
    }

    if (accessToken) {
      return getConfigWithAuthorizationHeaders(config, accessToken);
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
      return refreshToken(api, error);
    }

    return Promise.reject(new ApiError(error));
  },
);

export default api;
