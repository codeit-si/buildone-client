import { AxiosResponse } from "axios";

import apiClient from "@/lib/axios";

import { LoginResponse } from "../types/auth";

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
