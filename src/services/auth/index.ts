import { AxiosResponse } from "axios";

import { serverApi } from "@/lib/axios";
import { useAuthStore } from "@/store/auth-store";
import { useUserStore } from "@/store/user-store";
import { LoginResponse, SignupResponse } from "@/types/auth";

import { ENDPOINT } from "../endpoint";

import { storeAccessTokenInCookie } from "./route-handler";

/** 로그인 API */
export const login = async (
  email: string,
  password: string,
): Promise<AxiosResponse<LoginResponse>> => {
  const res = await serverApi.post<LoginResponse>(ENDPOINT.AUTH.LOGIN, {
    email,
    password,
  });

  const { accessToken } = res.data.credentials;
  const { memberInformation } = res.data;

  useAuthStore.getState().setAccessToken(accessToken);
  useUserStore.getState().setUserInfo(memberInformation);

  await storeAccessTokenInCookie(accessToken);

  return res;
};

/** 로그아웃 API */
export const logout = async (): Promise<AxiosResponse> => {
  const res = await api.post(ENDPOINT.AUTH.LOGOUT);
  return res;
};

/** 회원가입 API */
export const signup = async (
  name: string,
  email: string,
  password: string,
): Promise<AxiosResponse<SignupResponse>> => {
  const res = await serverApi.post<SignupResponse>(ENDPOINT.AUTH.SIGNUP, {
    name,
    email,
    password,
  });

  return res;
};
