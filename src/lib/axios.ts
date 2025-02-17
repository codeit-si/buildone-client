import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { ENDPOINT } from "@/services/endpoint";
import { useAuthStore } from "@/store/authStore";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_ADDRESS,
  withCredentials: true,
});

export interface ErrorResponse {
  code: string;
  message: string;
}

export class CustomError extends Error {
  code: string;

  constructor(error: unknown) {
    if (error instanceof AxiosError) {
      const errorResponse: ErrorResponse = error.response?.data ?? {
        code: "UNKNOWN_ERROR",
        message: "알 수 없는 에러가 발생했어요",
      };

      super(errorResponse.message);
      this.code = errorResponse.code;
    } else {
      super("네트워크 오류가 발생했어요");
      this.code = "NETWORK_ERROR";
    }

    this.name = "CustomError";
  }
}

const getConfigWithAuthorizationHeaders = (
  config: InternalAxiosRequestConfig,
  token: string,
) => {
  const newConfig = { ...config };
  newConfig.headers.set("Authorization", `Bearer ${token}`);

  return newConfig;
};

apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      return getConfigWithAuthorizationHeaders(config, accessToken);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Refresh Token 관리 변수
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// refreshToken 요청 중이면 다르 요청들은 대기 후 재시도
const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 요청 대기열 관리
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      const { setAccessToken, removeAccessToken } =
        useAuthStore.getState().actions;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            if (error.config) {
              const newConfig = getConfigWithAuthorizationHeaders(
                error.config,
                token,
              );

              resolve(apiClient(newConfig));
            } else {
              resolve(
                Promise.reject(
                  new CustomError("요청을 다시 보낼 수 없습니다."),
                ),
              );
            }
          });
        });
      }

      isRefreshing = true;

      try {
        const response = await axios.post(
          ENDPOINT.AUTH.TOKEN_VALIDATION,
          {},
          { withCredentials: true },
        );

        const token = response.headers?.["access-token"];

        setAccessToken(token);
        onTokenRefreshed(token);
        isRefreshing = false;

        // 기존 요청 재시도
        if (error.config) {
          const newConfig = getConfigWithAuthorizationHeaders(
            error.config,
            token,
          );

          return await apiClient(newConfig);
        }

        return await Promise.reject(
          new CustomError("요청을 다시 보낼 수 없습니다."),
        );
      } catch (refreshError: unknown) {
        removeAccessToken();
        isRefreshing = false;

        // eslint-disable-next-line no-alert
        window.alert("로그인 해주세요.");
        window.location.href = "/login";

        return Promise.reject(new CustomError(refreshError));
      }
    }

    return Promise.reject(new CustomError(error));
  },
);

export default apiClient;
