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
import { useTranslate } from "../TranslateProvider";
import _ from "lodash";

const Header = () => {
  const LANG = {
    en: "English",
    vi: "Tiếng Việt",
    cn: "China",
  };
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { cart } = useSelector((store) => store.cart);
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const { t, setLang, lang } = useTranslate();
  const onOpenSearchDrawer = (ev) => {
    ev.preventDefault();
    setOpenSearchDrawer(true);
  };
  const items = useMemo(() => {
    return [
      {
        key: 1,
        label: <Link to={PATH.profile.index}>Account</Link>,
      },
      {
        key: 3,
        label: <Link to={PATH.profile.order}>Order</Link>,
      },
      {
        key: 2,
        label: "Logout",
        onClick: () => {
          dispatch(logoutThunkAction());
          dispatch(cartActions.clearCart());
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
            <i className="fe fe-truck mr-2" />
            <span className="heading-xxxs">{t("shipping")}</span>
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
              <li className="nav-item">
                <Dropdown
                  arrow
                  placement="topRight"
                  menu={{
                    items: _.map(LANG, (title, code) => ({
                      key: code,
                      label: title,
                      onClick: () => setLang(code),
                    })),
                    // [
                    //     {
                    //         label: 'English',
                    //         onClick: () => setLang('en')
                    //     },
                    //     {
                    //         label: 'Tiếng Việt',
                    //         onClick: () => setLang('vi')
                    //     },
                    //     {
                    //         label: 'China',
                    //         onClick: () => setLang('zh')
                    //     },
                    // ]
                  }}
                >
                  <a className="nav-link dropdown-toggle" href="#">
                    {LANG[lang]}
                  </a>
                </Dropdown>
              </li>
            </ul>
            {/* Nav */}
            <ul className="nav navbar-nav mr-8">
              <li className="nav-item">
                <Link className="nav-link" to={PATH.shiping}>
                  {t("delivery")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={PATH.faq}>
                  {t("question")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={PATH.contact}>
                  {t("contact")}
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
                  {t("home")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={PATH.shop}>
                  {t("product")}
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link" to={"/cua-hang?search=laptop"}>
                  {t("Laptop")}
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link" to={"/cua-hang?search=máy%20tính"}>
                  {t("computer")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={"/cua-hang?page=1&sort=discount_rate.desc"}
                >
                  {t("product.promotional")}
                </Link>
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
                  <span data-cart-items={cart?.totalQuantity}>
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
