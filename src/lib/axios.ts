import axios from "axios";

/** Next.js Route Handler 요청 인스턴스 */
export const api = axios.create({
  withCredentials: true,
});

/** Backend 요청 인스턴스 */
export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_ADDRESS,
  withCredentials: true,
});
