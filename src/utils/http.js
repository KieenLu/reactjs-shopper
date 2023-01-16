import { authService } from "@/services/auth";
import axios from "axios";
import { getToken, setToken } from "./token";

export const http = axios.create();

http.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (error) => {
    try {
      if (
        error.response.status === 403 &&
        error.response.data.error_code === "TOKEN_EXPIRED"
      ) {
        // refresh token
        console.log("refreshToken");
        const token = getToken();
        const res = await authService.refreshToken({
          refreshToken: token.refreshToken,
        });

        setToken(res.data);

        return http(error.config);

        // gắn token vào localStorage

        // Thực thi lại api bị lỗi
      }
    } catch (err) {}
    throw error;
  }
);

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token.accessToken}`;
  }
  return config;
});
