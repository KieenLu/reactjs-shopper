import { ORDER_API } from "@/config/api";
import { http } from "@/utils/http";

export const orderService = {
  getOrder(query = "") {
    return http.get(`${ORDER_API}${query}`);
  },
  getOrderDetail(id) {
    return http.get(`${ORDER_API}/${id}`);
  },
  count(query = "") {
    return http.get(`${ORDER_API}/count${query}`);
  },
};
