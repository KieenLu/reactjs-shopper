import { PATH } from "@/config/path";
import { logoutThunkAction } from "@/stories/auth";
import React, { Suspense } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

export const ProfileLayout = () => {
  const dispatch = useDispatch();
  const logout = (ev) => {
    ev.preventDefault();
    dispatch(logoutThunkAction());
  };

  return (
    <section className="pt-7 pb-12">
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
                  Đơn hàng
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  end
                  to={PATH.profile.index}
                >
                  Tài khoản của tôi
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to={PATH.profile.wishlist}
                >
                  Sản phẩm yêu thích
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to={PATH.profile.address}
                >
                  Sổ địa chỉ
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to={PATH.profile.payment}
                >
                  Sổ thanh toán
                </NavLink>
                <a
                  className="list-group-item list-group-item-action dropright-toggle"
                  href="#!"
                  onClick={logout}
                >
                  Đăng xuất
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
