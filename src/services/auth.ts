import { AxiosResponse } from "axios";

import apiClient from "@/lib/axios";

import { LoginResponse, SignupResponse } from "../types/auth";

import { ENDPOINT } from "./endpoint";

export async function login(
  email: string,
  password: string,
): Promise<AxiosResponse<LoginResponse>> {
  const res = await apiClient.post<LoginResponse>(ENDPOINT.AUTH.LOGIN, {
    email,
    password,
  });

  return res;
}

export async function signup(
  name: string,
  email: string,
  password: string,
): Promise<AxiosResponse<SignupResponse>> {
  const res = await apiClient.post<SignupResponse>(ENDPOINT.AUTH.SIGNUP, {
    name,
    email,
    password,
  });

  return res;
}
