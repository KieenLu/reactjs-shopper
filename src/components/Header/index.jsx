import { PATH } from "@/config/path";
import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SearchDrawer } from "../SearchDrawer";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/stories/cart";
import { avatarDefault } from "@/config/asssets";
import { useAuth } from "@/hooks/useAuth";
import { Dropdown } from "antd";
import { logoutThunkAction } from "@/stories/auth";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { cart } = useSelector((store) => store.cart);
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const onOpenSearchDrawer = (ev) => {
    ev.preventDefault();
    setOpenSearchDrawer(true);
  };
  const items = useMemo(() => {
    return [
      {
        key: 1,
        label: <Link to={PATH.profile.index}>Tài khoản của tôi</Link>,
      },
      {
        key: 3,
        label: <Link to={PATH.profile.order}>Đơn hàng</Link>,
      },
      {
        key: 2,
        label: "Đăng xuất",
        onClick: () => {
          dispatch(logoutThunkAction());
        },
      },
    ];
  }, []);
  const onOpenCart = (ev) => {
    ev.preventDefault();
    dispatch(cartActions.toggleCartDrawer(true));
  };
  return (
    <>
      <SearchDrawer
        open={openSearchDrawer}
        onClose={() => setOpenSearchDrawer(false)}
      />
      {/* NAVBAR */}
      <div className="navbar navbar-topbar navbar-expand-xl navbar-light bg-light">
        <div className="container">
          {/* Promo */}
          <div className="mr-xl-8">
            <i className="fe fe-truck mr-2" />{" "}
            <span className="heading-xxxs">Vận chuyển toàn cầu</span>
          </div>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#topbarCollapse"
            aria-controls="topbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Collapse */}
          <div className="navbar-collapse" id="topbarCollapse">
            {/* Nav */}
            <ul className="nav nav-divided navbar-nav mr-auto">
              <li className="nav-item dropdown">
                {/* Toggle */}
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  <img
                    className="mb-1 mr-1"
                    src="/img/flags/usa.svg"
                    alt="..."
                  />{" "}
                  United States
                </a>
                {/* Menu */}
                <div className="dropdown-menu minw-0">
                  <a className="dropdown-item" href="#!">
                    <img
                      className="mb-1 mr-2"
                      src="/img/flags/usa.svg"
                      alt="USA"
                    />
                    United States
                  </a>
                  <a className="dropdown-item" href="#!">
                    <img
                      className="mb-1 mr-2"
                      src="/img/flags/canada.svg"
                      alt="Canada"
                    />
                    Canada
                  </a>
                  <a className="dropdown-item" href="#!">
                    <img
                      className="mb-1 mr-2"
                      src="/img/flags/germany.svg"
                      alt="Germany"
                    />
                    Germany
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                {/* Toggle */}
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  USD
                </a>
                {/* Menu */}
                <div className="dropdown-menu minw-0">
                  <a className="dropdown-item" href="#!">
                    USD
                  </a>
                  <a className="dropdown-item" href="#!">
                    EUR
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                {/* Toggle */}
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  English
                </a>
                {/* Menu */}
                <div className="dropdown-menu minw-0">
                  <a className="dropdown-item" href="#">
                    English
                  </a>
                  <a className="dropdown-item" href="#">
                    Tiếng Việt
                  </a>
                  <a className="dropdown-item" href="#">
                    China
                  </a>
                </div>
              </li>
            </ul>
            {/* Nav */}
            <ul className="nav navbar-nav mr-8">
              <li className="nav-item">
                <Link className="nav-link" to={PATH.shiping}>
                  Quy định giao hàng
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={PATH.faq}>
                  Câu hỏi
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={PATH.contact}>
                  Liên hệ
                </Link>
              </li>
            </ul>
            {/* Nav */}
            <ul className="nav navbar-nav flex-row">
              <li className="nav-item">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li className="nav-item ml-xl-n4">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li className="nav-item ml-xl-n4">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-instagram" />
                </a>
              </li>
              <li className="nav-item ml-xl-n4">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-medium" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          {/* Brand */}
          <NavLink className="navbar-brand" to={PATH.home}>
            <img
              style={{ width: "50px" }}
              src="https://spacedev.vn/images/LOGO-image-full.svg"
            />
            Shopper
          </NavLink>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Collapse */}
          <div className="navbar-collapse" id="navbarCollapse">
            {/* Nav */}
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to={PATH.home}>
                  Trang chủ
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={PATH.shop}>
                  Sản phẩm
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="./shop.html">
                  Laptop
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="./shop.html">
                  Máy tính
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./shop.html">
                  Sản phẩm khuyến mãi
                </a>
              </li>
            </ul>
            {/* Nav */}
            {/* <ul className="navbar-nav flex-row">
              <li className="nav-item">
                <a
                  onClick={onOpenSearchDrawer}
                  className="cursor-pointer nav-link"
                >
                  <i className="fe fe-search" />
                </a>
              </li>
              <li className="nav-item ml-lg-n4">
                <Link className="nav-link" to={PATH.profile.wishlist}>
                  <i className="fe fe-heart" />
                </Link>
              </li>
              <li className="nav-item ml-lg-n4">
                <a
                  href="#"
                  onClick={onOpenCart}
                  className="nav-link"
                  data-toggle="modal"
                >
                  <span data-cart-items={cart?.totalQuantity}>
                    <i className="fe fe-shopping-cart" />
                  </span>
                </a>
              </li>
              <li className="nav-item ml-lg-n4">
                <Link className="nav-link" to={PATH.account}>
                  <i className="fe fe-user" />
                </Link>
              </li>
            </ul> */}
            <ul className="navbar-nav flex-row">
              <li className="nav-item">
                <a
                  onClick={onOpenSearchDrawer}
                  className="nav-link"
                  data-toggle="modal"
                  href="#modalSearch"
                >
                  <i className="fe fe-search" />
                </a>
              </li>
              <li className="nav-item ml-lg-n4">
                <Link className="nav-link" to={PATH.profile.wishlist}>
                  <i className="fe fe-heart" />
                </Link>
              </li>
              <li className="nav-item ml-lg-n4">
                <a
                  className="nav-link"
                  data-toggle="modal"
                  href="#"
                  onClick={onOpenCart}
                >
                  <span data-cart-items={2}>
                    <i className="fe fe-shopping-cart" />
                  </span>
                </a>
              </li>
              <li className="nav-item ml-lg-n4">
                {user ? (
                  <Dropdown menu={{ items }} placement="bottomRight" arrow>
                    <Link
                      className="header-avatar nav-link"
                      to={PATH.profile.index}
                    >
                      <img src={user.avatar || avatarDefault} />
                    </Link>
                  </Dropdown>
                ) : (
                  <Link className="nav-link" to={PATH.account}>
                    <i className="fe fe-user" />
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
