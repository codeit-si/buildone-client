import axios, { AxiosError } from "axios";

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

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(new CustomError(error)),
);

export default apiClient;
