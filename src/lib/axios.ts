import axios from "axios";

import { ApiError } from "./error";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_ADDRESS,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(new ApiError(error)),
);
