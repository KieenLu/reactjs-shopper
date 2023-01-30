import { PRODUCT_API } from "@/config/api";
import { http } from "@/utils/http";

export const productService = {
  getProduct(query = "") {
    return http.get(`${PRODUCT_API}/?${query}`);
  },
  getProductDetail(id) {
    return http.get(`${PRODUCT_API}/${id}`);
  },
  getCategories() {
    return http.get(`${PRODUCT_API}/categories`);
  },
  getCategoriesDetail(id) {
    return http.get(`${PRODUCT_API}/categories/${id}`);
  },
  getWishList(query = "") {
    return http.get(`${PRODUCT_API}/wishlist/?${query}`);
  },
  addWishList(productId) {
    return http.post(`${PRODUCT_API}/wishlist/${productId}`);
  },
  deleteWishList(productId) {
    return http.delete(`${PRODUCT_API}/wishlist/${productId}`);
  },
};
