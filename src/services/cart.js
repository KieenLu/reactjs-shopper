import { CART_API } from "@/config/api";
import { http } from "@/utils/http";

export const cartService = {
  getCart() {
    return http.get(`${CART_API}`);
  },
  updateCart(productId, quantity) {
    return http.patch(`${CART_API}/${productId}`, { quantity });
  },
  removeItem(productId) {
    return http.delete(`${CART_API}/${productId}`);
  },
  getMethodShipping() {
    return http.get(`${CART_API}/shipping-method`);
  },
  getPromotion(code) {
    return http.get(`${CART_API}/promotion/${code}`);
  },
  checkout(data) {
    return http.get(`${CART_API}/checkout}`, data);
  },
};
