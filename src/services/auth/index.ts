import { AxiosResponse } from "axios";

import api from "@/lib/axios";
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
  const res = await api.post<LoginResponse>(ENDPOINT.AUTH.LOGIN, {
    email,
    password,
  });

  const { accessToken } = res.data.credentials;
  const { memberInformation } = res.data;

  useAuthStore.getState().actions.setAccessToken(accessToken);
  useUserStore.getState().setUserInfo(memberInformation);

  await storeAccessTokenInCookie(accessToken);

  return res;
};

/** 회원가입 API */
export const signup = async (
  name: string,
  email: string,
  password: string,
): Promise<AxiosResponse<SignupResponse>> => {
  const res = await api.post<SignupResponse>(ENDPOINT.AUTH.SIGNUP, {
    name,
    email,
    password,
  });

  return res;
};
