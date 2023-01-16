import { AUTH_API } from "@/config/api";
import { http } from "@/utils/http";

export const authService = {
  login(form) {
    return http.post(`${AUTH_API}/login`, form);
  },
  getProfile() {
    return http.get(`${AUTH_API}`);
  },
  refreshToken(data) {
    return http.post(`${AUTH_API}/refresh-token`, data);
  },
};
