const profile = "/ca-nhan";

export const PATH = {
  home: "/",
  shop: "/cua-hang",
  productDetail: "/:slug",
  category: "/:slug/:id",
  contact: "/lien-he",
  faq: "/hoi-dap",
  blog: "/blog",
  blogPost: "/blog-post",
  about: "/ve-chung-toi",
  shiping: "/quy-dinh-giao-hang",
  comingSoon: "/coming-soon",
  profile: {
    index: profile,
    order: profile + "/don-hang",
    orderDetail: profile + "/don-hang/:id",
    wishlist: profile + "/san-pham-yeu-thich",
    address: profile + "/so-dia-chi",
    addressDetail: profile + "/so-dia-chi/edit/:id",
    newAddress: profile + "/so-dia-chi/new",
    payment: profile + "/so-thanh-toan",
    paymentDetail: profile + "/so-thanh-toan/:id",
  },
  account: "/signin",
  resetPassword: "/reset-password",
};
