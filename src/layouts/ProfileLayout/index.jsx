import { useTranslate } from "@/components/TranslateProvider";
import { PATH } from "@/config/path";
import { logoutThunkAction } from "@/stories/auth";
import { cartActions } from "@/stories/cart";
import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

export const ProfileLayout = () => {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const logout = (ev) => {
    ev.preventDefault();
    dispatch(logoutThunkAction());
  };

  return (
    <section className="pt-7 pb-12">
      <Helmet>
        <title>Thông tin cá nhân</title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            {/* Heading */}
            <h3 className="mb-10" id="main-profile-title"></h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-3">
            {/* Nav */}
            <nav className="mb-10 mb-md-0">
              <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to={PATH.profile.order}
                >
                  {t("order")}
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  end
                  to={PATH.profile.index}
                >
                  {t("account")}
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to={PATH.profile.wishlist}
                >
                  {t("wishlist")}
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to={PATH.profile.address}
                >
                  {t("book.address")}
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to={PATH.profile.payment}
                >
                  {t("book.payment")}
                </NavLink>
                <a
                  className="list-group-item list-group-item-action dropright-toggle"
                  href="#"
                  onClick={() => {
                    dispatch(logoutThunkAction());
                    dispatch(cartActions.clearCart());
                  }}
                >
                  {t("logout")}
                </a>
              </div>
            </nav>
          </div>
          <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
            <Suspense fallback={<div>ProfileLayout loading....</div>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileLayout;
