import { http } from "@/utils/http";
import { ORGANIZATION_API } from "../config/api";

export const organizationService = {
  contact(data) {
    return http.post(`${ORGANIZATION_API}/contact`, data);
  },
};
