import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_ADDRESS,
  withCredentials: true,
});

export default apiClient;
