import { AxiosResponse } from "axios";

import { serverApi } from "@/lib/axios";
import { LoginResponse, SignupResponse } from "@/types/auth";
import { removeCookie, setCookie } from "@/utils/cookie";

import { ENDPOINT } from "../endpoint";

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

  setCookie("ACCESS_TOKEN", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return res;
};

/** 로그아웃 API */
export const logout = async (): Promise<AxiosResponse> => {
  const res = await serverApi.post(ENDPOINT.AUTH.LOGOUT);
  removeCookie("ACCESS_TOKEN");

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
