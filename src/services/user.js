import { http } from "@/utils/http";
import { USER_API } from "../config/api";

export const userService = {
  signup(data) {
    return http.post(`${USER_API}/register`, data);
  },
  resendEmail(data) {
    return http.post(`${USER_API}/resend-email`, data);
  },
  getProfile(data) {
    return http.get(`${USER_API}`, data);
  },
  updateInfo(data) {
    return http.patch(`${USER_API}`, data);
  },
  sendEmailResetPassword(data) {
    return http.post(`${USER_API}/reset-password`, data);
  },
  resetPasswordByCode(data) {
    return http.post(`${USER_API}/change-password-by-code`, data);
  },
  changePassword(data) {
    return http.post(`${USER_API}/change-password`, data);
  },
};
