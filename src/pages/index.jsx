import { ListProductCardDiscover } from "@/components/ListProductCardDiscover";
import Promotion from "@/components/Promotion";
import ReviewCard from "@/components/ReviewCard";
import { Slider } from "@/components/Slider";
import { StyleSlider } from "@/components/Slider/style";
import { Tab } from "@/components/Tab";
import { useTranslate } from "@/components/TranslateProvider";
import { PATH } from "@/config/path";
import { useQuery } from "@/hooks/useQuery";
import { reviewService } from "@/services/review";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { t } = useTranslate();
  const { data: { data: review } = {}, loading } = useQuery({
    queryFn: () => reviewService.getTopReview(),
  });
  return (
    <>
      <Helmet>
        <title>{t("Trang chủ")}</title>
      </Helmet>
      <Promotion />
      {/* CATEGORIES */}
      <section>
        <div
          className="row no-gutters d-block d-lg-flex flickity flickity-lg-none"
          data-flickity='{"watchCSS": true}'
        >
          {/* Item */}
          <div
            className="col-12 col-md-6 col-lg-4 d-flex flex-column bg-cover"
            style={{ backgroundImage: "url(./img/covers/cover-1.jpg)" }}
          >
            <div
              className="card bg-dark-5 bg-hover text-white text-center"
              style={{ minHeight: "470px" }}
            >
              <div className="card-body mt-auto mb-n11 py-8">
                {/* Heading */}
                <h1 className="mb-0 font-weight-bolder">Women</h1>
              </div>
              <div className="card-body mt-auto py-8">
                {/* Button */}
                <Link className="btn btn-white stretched-link" to={PATH.shop}>
                  Shop Women <i className="fe fe-arrow-right ml-2" />
                </Link>
              </div>
            </div>
          </div>
          {/* Card */}
          <div
            className="col-12 col-md-6 col-lg-4 d-flex flex-column bg-cover"
            style={{ backgroundImage: "url(./img/covers/cover-2.jpg)" }}
          >
            <div
              className="card bg-dark-5 bg-hover text-white text-center"
              style={{ minHeight: "470px" }}
            >
              <div className="card-body mt-auto mb-n11 py-8">
                {/* Heading */}
                <h1 className="mb-0 font-weight-bolder">Men</h1>
              </div>
              <div className="card-body mt-auto py-8">
                {/* Button */}
                <Link className="btn btn-white stretched-link" to={PATH.shop}>
                  Shop Men <i className="fe fe-arrow-right ml-2" />
                </Link>
              </div>
            </div>
          </div>
          {/* Card */}
          <div
            className="col-12 col-md-6 col-lg-4 d-flex flex-column bg-cover"
            style={{ backgroundImage: "url(./img/covers/cover-3.jpg)" }}
          >
            <div
              className="card bg-dark-5 bg-hover text-white text-center"
              style={{ minHeight: "470px" }}
            >
              <div className="card-body mt-auto mb-n11 py-8">
                {/* Heading */}
                <h1 className="mb-0 font-weight-bolder">Kids</h1>
              </div>
              <div className="card-body mt-auto py-8">
                {/* Button */}
                <Link className="btn btn-white stretched-link" to={PATH.shop}>
                  Shop Kids <i className="fe fe-arrow-right ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FEATURES */}
      <section className="pt-7">
        <div className="container">
          <div className="row pb-7 border-bottom">
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="d-flex mb-6 mb-lg-0">
                {/* Icon */}
                <i className="fe fe-truck font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="heading-xxs mb-1">{t("free.shipping")}</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    {t("orders.over.100$")}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="d-flex mb-6 mb-lg-0">
                {/* Icon */}
                <i className="fe fe-repeat font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="mb-1 heading-xxs">{t("free.returns")}</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    {t("returns.within.30days")}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="d-flex mb-6 mb-md-0">
                {/* Icon */}
                <i className="fe fe-lock font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="mb-1 heading-xxs">{t("shopping.safe")}</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">{t("safe")}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="d-flex">
                {/* Icon */}
                <i className="fe fe-tag font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="mb-1 heading-xxs">{t("styles")}</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    {t("styles.need")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* BEST PICKS */}
      <section className="pt-12">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
              {/* Preheading */}
              <h6 className="heading-xxs mb-3 text-gray-400">New Collection</h6>
              {/* Heading */}
              <h2 className="mb-4">Best Picks 2019</h2>
              {/* Subheading */}
              <p className="mb-10 text-gray-500">
                Appear, dry there darkness they're seas, dry waters thing fly
                midst. Beast, above fly brought Very green.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-5 col-lg-4 d-flex flex-column">
              {/* Card */}
              <div
                className="card mb-7 text-white"
                style={{
                  minHeight: "400px",
                  backgroundImage: "url(./img/products/product-1.jpg)",
                }}
              >
                {/* Background */}
                <div className="card-bg">
                  <div
                    className="card-bg-img bg-cover"
                    style={{
                      backgroundImage: "url(./img/products/product-1.jpg)",
                    }}
                  />
                </div>
                {/* Body */}
                <div className="card-body my-auto text-center">
                  {/* Heading */}
                  <h4 className="mb-0">Bags Collection</h4>
                  {/* Link */}
                  <Link
                    className="btn btn-link stretched-link text-reset"
                    to={PATH.shop}
                  >
                    Shop Now <i className="fe fe-arrow-right ml-2" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-7 col-lg-8 d-flex flex-column">
              {/* Card */}
              <div
                className="card mb-7 text-body"
                style={{ minHeight: "400px" }}
              >
                {/* Background */}
                <div className="card-bg">
                  <div
                    className="card-bg-img bg-cover"
                    style={{
                      backgroundImage: "url(./img/products/product-2.jpg)",
                    }}
                  />
                </div>
                {/* Body */}
                <div className="card-body my-auto px-md-10 text-center text-md-left">
                  {/* Circle */}
                  <div className="card-circle card-circle-lg card-circle-right">
                    <strong>save</strong>
                    <span className="font-size-h4 font-weight-bold">30%</span>
                  </div>
                  {/* Heading */}
                  <h4 className="mb-0">Printed men’s Shirts</h4>
                  {/* Link */}
                  <Link
                    className="btn btn-link stretched-link px-0 text-reset"
                    to={PATH.shop}
                  >
                    Shop Now <i className="fe fe-arrow-right ml-2" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-7 col-lg-8 d-flex flex-column">
              {/* Card */}
              <div
                className="card mb-7 mb-md-0 text-body"
                style={{ minHeight: "400px" }}
              >
                {/* Background */}
                <div className="card-bg">
                  <div
                    className="card-bg-img bg-cover"
                    style={{
                      backgroundImage: "url(./img/products/product-3.jpg)",
                    }}
                  />
                </div>
                {/* Body */}
                <div className="card-body my-auto px-md-10 text-center text-md-left">
                  {/* Heading */}
                  <h4 className="mb-0">Basic women’s Dresses</h4>
                  {/* Link */}
                  <Link
                    className="btn btn-link stretched-link px-0 text-reset"
                    to={PATH.shop}
                  >
                    Shop Now <i className="fe fe-arrow-right ml-2" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5 col-lg-4 d-flex flex-column">
              {/* Card */}
              <div className="card text-white" style={{ minHeight: "400px" }}>
                {/* Background */}
                <div className="card-bg">
                  <div
                    className="card-bg-img bg-cover"
                    style={{
                      backgroundImage: "url(./img/products/product-4.jpg)",
                    }}
                  />
                </div>
                {/* Body */}
                <div className="card-body my-auto text-center">
                  {/* Heading */}
                  <h4 className="mb-0">Sweatshirts</h4>
                  {/* Link */}
                  <Link
                    className="btn btn-link stretched-link text-reset"
                    to={PATH.shop}
                  >
                    Shop Now <i className="fe fe-arrow-right ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* TOP SELLERS */}
      <Tab lazy name="sale-tab" defaultActive="do-dien-tu">
        <section className="py-12">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                {/* Heading */}
                <h2 className="mb-4 text-center">{t("product.top.seller")}</h2>
                {/* Nav */}
                <div className="nav justify-content-center mb-10">
                  <Tab.Title value="do-dien-tu">
                    {t("device.electron")}
                  </Tab.Title>
                  <Tab.Title value="do-gia-dung">
                    {t("device.houseware")}
                  </Tab.Title>
                  <Tab.Title value="san-pham-khuyen-mai">
                    {t("product.promotional")}
                  </Tab.Title>
                </div>
              </div>
            </div>
            <div className="tab-content">
              <Tab.Content value="do-dien-tu">
                <ListProductCardDiscover
                  query="categories=4221&limit=8"
                  link="/dien-tu-dien-lanh/4221"
                />
              </Tab.Content>
              <Tab.Content value="do-gia-dung">
                <ListProductCardDiscover
                  query="categories=1882&limit=8"
                  link="/dien-gia-dung/1882"
                />
              </Tab.Content>
              <Tab.Content value="san-pham-khuyen-mai">
                <ListProductCardDiscover
                  query="sort=discount_rate.desc&limit=8"
                  link="/cua-hang?page=1&sort=discount_rate.desc"
                />
              </Tab.Content>
            </div>
          </div>
        </section>
      </Tab>
      {/* COUNTDOWN */}
      <section
        className="py-13 bg-cover"
        style={{ backgroundImage: "url(./img/covers/cover-4.jpg)" }}
      >
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-12 col-md-8 col-lg-6">
              {/* Heading */}
              <h3 className="mb-7">
                Giãm hơn 50% <br />
                Bộ sưu tập mùa hè
              </h3>
              {/* Counter */}
              <div
                className="d-flex mb-9"
                data-countdown
                data-date="Dec 5, 2023 15:37:25"
              >
                <div className="text-center">
                  <div
                    className="font-size-h1 font-weight-bolder text-primary"
                    data-days
                  >
                    00
                  </div>
                  <div className="heading-xxs text-muted">Days</div>
                </div>
                <div className="px-1 px-md-4">
                  <div className="font-size-h2 font-weight-bolder text-primary">
                    :
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="font-size-h1 font-weight-bolder text-primary"
                    data-hours
                  >
                    00
                  </div>
                  <div className="heading-xxs text-muted">Hours</div>
                </div>
                <div className="px-1 px-md-4">
                  <div className="font-size-h2 font-weight-bolder text-primary">
                    :
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="font-size-h1 font-weight-bolder text-primary"
                    data-minutes
                  >
                    00
                  </div>
                  <div className="heading-xxs text-muted">Minutes</div>
                </div>
                <div className="px-1 px-md-4">
                  <div className="font-size-h2 font-weight-bolder text-primary">
                    :
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="font-size-h1 font-weight-bolder text-primary"
                    data-seconds
                  >
                    00
                  </div>
                  <div className="heading-xxs text-muted">Seconds</div>
                </div>
              </div>
              {/* Button */}
              <Link className="btn btn-dark" to={PATH.shop}>
                Mua ngay <i className="fe fe-arrow-right ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* REVIEWS */}
      <section className="py-12">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
              {/* Preheading */}
              <h6 className="heading-xxs mb-3 text-gray-400">
                {t("buyers.say")}
              </h6>
              {/* Heading */}
              <h2 className="mb-10"> {t("buyers.reviews")}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/* Slider */}
              <StyleSlider>
                <Slider slidesPerView={3} spaceBetween={30}>
                  {review?.map((e) => (
                    <ReviewCard key={e._id} {...e} />
                  ))}
                </Slider>
              </StyleSlider>
            </div>
          </div>
        </div>
      </section>
      {/* BRANDS */}
      <section className="py-12 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              {/* Heading */}
              <h2 className="mb-3">@shopper</h2>
              {/* Subheading */}
              <p className="mb-10 font-size-lg text-gray-500">
                Appear, dry there darkness they're seas, dry waters.
              </p>
            </div>
          </div>
          <div className="row mx-n1 mb-10">
            <div className="col-6 col-sm-4 col-md px-1">
              {/* Card */}
              <div className="card mb-2">
                {/* Image */}
                <img
                  src="/img/products/product-16.jpg"
                  alt="..."
                  className="card-img"
                />
                {/* Overlay */}
                <a
                  className="card-img-overlay card-img-overlay-hover align-items-center bg-dark-40"
                  href="blog-post.html"
                >
                  <p className="my-0 font-size-xxs text-center text-white">
                    <i className="fe fe-heart mr-2" /> 248{" "}
                    <i className="fe fe-message-square mr-2 ml-3" /> 7
                  </p>
                </a>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-md px-1">
              {/* Card */}
              <div className="card mb-2">
                {/* Image */}
                <img
                  src="/img/products/product-17.jpg"
                  alt="..."
                  className="card-img"
                />
                {/* Overlay */}
                <a
                  className="card-img-overlay card-img-overlay-hover align-items-center bg-dark-40"
                  href="blog-post.html"
                >
                  <p className="my-0 font-size-xxs text-center text-white">
                    <i className="fe fe-heart mr-2" /> 248{" "}
                    <i className="fe fe-message-square mr-2 ml-3" /> 7
                  </p>
                </a>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-md px-1">
              {/* Card */}
              <div className="card mb-2">
                {/* Image */}
                <img
                  src="/img/products/product-18.jpg"
                  alt="..."
                  className="card-img"
                />
                {/* Overlay */}
                <a
                  className="card-img-overlay card-img-overlay-hover align-items-center bg-dark-40"
                  href="blog-post.html"
                >
                  <p className="my-0 font-size-xxs text-center text-white">
                    <i className="fe fe-heart mr-2" /> 248{" "}
                    <i className="fe fe-message-square mr-2 ml-3" /> 7
                  </p>
                </a>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-md px-1">
              {/* Card */}
              <div className="card mb-2">
                {/* Image */}
                <img
                  src="/img/products/product-19.jpg"
                  alt="..."
                  className="card-img"
                />
                {/* Overlay */}
                <a
                  className="card-img-overlay card-img-overlay-hover align-items-center bg-dark-40"
                  href="blog-post.html"
                >
                  <p className="my-0 font-size-xxs text-center text-white">
                    <i className="fe fe-heart mr-2" /> 248{" "}
                    <i className="fe fe-message-square mr-2 ml-3" /> 7
                  </p>
                </a>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-md px-1">
              {/* Card */}
              <div className="card">
                {/* Image */}
                <img
                  src="/img/products/product-20.jpg"
                  alt="..."
                  className="card-img"
                />
                {/* Overlay */}
                <a
                  className="card-img-overlay card-img-overlay-hover align-items-center bg-dark-40"
                  href="blog-post.html"
                >
                  <p className="my-0 font-size-xxs text-center text-white">
                    <i className="fe fe-heart mr-2" /> 248{" "}
                    <i className="fe fe-message-square mr-2 ml-3" /> 7
                  </p>
                </a>
              </div>
            </div>
            <div className="col-6 col-sm-4 col-md px-1">
              {/* Card */}
              <div className="card">
                {/* Image */}
                <img
                  src="/img/products/product-21.jpg"
                  alt="..."
                  className="card-img"
                />
                {/* Overlay */}
                <a
                  className="card-img-overlay card-img-overlay-hover align-items-center bg-dark-40"
                  href="blog-post.html"
                >
                  <p className="my-0 font-size-xxs text-center text-white">
                    <i className="fe fe-heart mr-2" /> 248{" "}
                    <i className="fe fe-message-square mr-2 ml-3" /> 7
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 col-sm-3 col-md text-center">
              {/* Brand */}
              <img
                src="/img/brands/gray-350/mango.svg"
                alt="..."
                className="img-fluid mb-7 mb-md-0"
              />
            </div>
            <div className="col-4 col-sm-3 col-md text-center">
              {/* Brand */}
              <img
                src="/img/brands/gray-350/zara.svg"
                alt="..."
                className="img-fluid mb-7 mb-md-0"
              />
            </div>
            <div className="col-4 col-sm-3 col-md text-center">
              {/* Brand */}
              <img
                src="/img/brands/gray-350/reebok.svg"
                alt="..."
                className="img-fluid mb-7 mb-md-0"
              />
            </div>
            <div className="col-4 col-sm-3 col-md text-center">
              {/* Brand */}
              <img
                src="/img/brands/gray-350/asos.svg"
                alt="..."
                className="img-fluid mb-7 mb-md-0"
              />
            </div>
            <div className="col-4 col-sm-3 col-md text-center">
              {/* Brand */}
              <img
                src="/img/brands/gray-350/stradivarius.svg"
                alt="..."
                className="img-fluid mb-6 mb-sm-0"
              />
            </div>
            <div className="col-4 col-sm-3 col-md text-center">
              {/* Brand */}
              <img
                src="/img/brands/gray-350/adidas.svg"
                alt="..."
                className="img-fluid mb-6 mb-sm-0"
              />
            </div>
            <div className="col-4 col-sm-3 col-md text-center">
              {/* Brand */}
              <img
                src="/img/brands/gray-350/bershka.svg"
                alt="..."
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
