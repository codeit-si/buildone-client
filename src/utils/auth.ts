import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { ApiError } from "@/lib/error";
import { ENDPOINT } from "@/services/endpoint";
import { useAuthStore } from "@/store/auth-store";

export function isAccessTokenExpired(expiredTime: string) {
  return Date.now() >= new Date(expiredTime).getTime();
}

/** 기존 config에 Authorization 헤더 추가 */
export function getConfigWithAuthorizationHeaders(
  config: InternalAxiosRequestConfig,
  token: string,
) {
  const newConfig = { ...config };
  newConfig.headers.set("Authorization", `Bearer ${token}`);

  return newConfig;
}

// Refresh Token 관리 변수
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// refreshToken 요청 중이면 다른 요청들은 대기 후 재시도
const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 요청 대기열 관리
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

/** accessToken 재발급 함수 */
export async function refreshToken(api?: AxiosInstance, error?: AxiosError) {
  const { setAccessToken, setExpiredTime, removeAccessToken } =
    useAuthStore.getState().actions;

  // 이미 토큰 갱신 중이면 대기 후 처리
  if (isRefreshing) {
    return new Promise((resolve) => {
      addRefreshSubscriber((token) => {
        if (error?.config) {
          const newConfig = getConfigWithAuthorizationHeaders(
            error.config,
            token,
          );

          // 갱신된 토큰으로 요청 재시도
          resolve(api?.(newConfig));
        } else {
          resolve(
            Promise.reject(new ApiError("요청을 다시 보낼 수 없습니다.")),
          );
        }
      });
    });
  }

  isRefreshing = true;

  try {
    // refresh token으로 access token 재발급 요청
    const response = await axios.post(
      ENDPOINT.AUTH.TOKEN_VALIDATION,
      {},
      { withCredentials: true },
    );

    const token = response.headers?.["access-token"];
    const expiredTime = response.headers?.["access-token-expired-time"];

    setAccessToken(token);
    setExpiredTime(expiredTime);

    // 대기 중인 요청들 처리
    onTokenRefreshed(token);
    isRefreshing = false;

    // 기존 요청 재시도
    if (error && error.config) {
      const newConfig = getConfigWithAuthorizationHeaders(error.config, token);
      return await api?.(newConfig);
    }

    return token;
  } catch (refreshError: unknown) {
    removeAccessToken();

    // eslint-disable-next-line no-alert
    window.alert("로그인 해주세요.");
    window.location.href = "/login";

    return await Promise.reject(new ApiError(refreshError));
  } finally {
    isRefreshing = false;
    refreshSubscribers = [];
  }
}
