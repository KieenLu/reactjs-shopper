import { Button } from "@/components/Button";
import { ShortedContent } from "@/components/ShortedContent";
import { MESSAGE } from "@/config/message";
import { useAction } from "@/hooks/useActions";
import { useQuery } from "@/hooks/useQuery";
import { productService } from "@/services/product";
import { currency } from "@/utils/currency";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Page404 from "../404";
import { useState } from "react";
import { Image, message } from "antd";
import { useAuth } from "@/hooks/useAuth";
import { Popconfirm } from "@/components/Popconfirm";
import { PATH } from "@/config/path";
import { updateQuantityAction } from "@/stories/cart";
import { useCart } from "@/hooks/useCart";
import { handleError } from "@/utils/handleError";
import { ListReview } from "@/components/ReviewItem";
import { reviewService } from "@/services/review";
import queryString from "query-string";
import { useSearch } from "@/hooks/useSearch";
import { Paginate } from "@/components/Paginate";

const ProductDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const { slug } = useParams();
  const id = slug.split("-p").pop();
  const [search] = useSearch({ page: 1 });
  const qs = queryString.stringify({
    page: search.page,
  });
  const {
    data: { data: detail },
    error,
    loading,
  } = useQuery({
    queryFn: () => productService.getProductDetail(id),
    enabled: !!id,
  });
  const { data: category = {} } = useQuery({
    queryFn: () => productService.getCategoriesDetail(detail.categories),
    enabled: !!detail,
  });
  const onAddWishList = useAction({
    action: () => productService.addWishList(id),
    messageSuccess: MESSAGE.ADD_WISHLIST_SUCCESS(detail?.name),
  });
  const {
    data: { data: reviews = [], paginate: reviewPaginate },

    loading: reviewLoading,
    refetch: refetchReview,
  } = useQuery({
    queryFn: () => reviewService.getReview(id, `?${qs}`),
    enabled: !!id,
    limitDuration: 3000,
  });

  const { cart, loading: cartLoading } = useCart();
  const { [id]: addCartLoading } = cartLoading;
  const cartQuantity =
    (cart?.listItems?.find((e) => e.productId === id)?.quantity || 0) + 1;
  // const addToCart = async (ev) => {
  //   try {
  //     await dispatch(
  //       updateQuantityAction({
  //         productId: id,
  //         quantity: cartQuantity,
  //         showPopover: true,
  //       })
  //     );
  //   } catch (err) {
  //     handleError(err);
  //   }
  // };
  const addToCart = useAction({
    action: () => {
      const quantity =
        cart?.listItems?.find((e) => e.productId == id)?.quantity || 0;
      return dispatch(
        updateQuantityAction({
          productId: id,
          quantity: quantity + 1,
          showPopover: true,
        })
      );
    },
    messageLoading: MESSAGE.LOADING_MESSAGE,
    messageSuccess: false,
  });
  if (loading) return <div>...LOADING</div>;
  if (!id || error) return <Page404 />;

  return (
    <div>
      {/* BREADCRUMB */}
      <nav className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Breadcrumb */}
              <ol className="breadcrumb mb-0 font-size-xs text-gray-400">
                <li className="breadcrumb-item">
                  <a className="text-gray-400" href="index.html">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a className="text-gray-400" href="shop.html">
                    Women's Shoes
                  </a>
                </li>
                <li className="breadcrumb-item active">Leather Sneakers</li>
              </ol>
            </div>
          </div>
        </div>
      </nav>
      {/* PRODUCT */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12 col-md-6">
                  {/* Card */}
                  <div className="card">
                    {/* Badge */}
                    {detail?.discount > 0 ? (
                      <div className="badge badge-primary card-badge text-uppercase">
                        Sale
                      </div>
                    ) : (
                      <></>
                    )}
                    {/* Slider */}
                    <div className="mb-4">
                      <img
                        onClick={() => setOpenModal(true)}
                        src={detail?.images?.[0].large_url}
                        alt="..."
                        className="card-img-top cursor-pointer"
                      ></img>
                    </div>

                    <div style={{ display: "none" }}>
                      <Image.PreviewGroup
                        st
                        preview={{
                          current: currentImage,
                          visible: openModal,
                          onVisibleChange: (vis) => setOpenModal(vis),
                          wrapStyle: { margin: 100 },
                        }}
                      >
                        {detail?.images?.map((e, i) => (
                          <Image key={i} src={e.large_url} />
                        ))}
                      </Image.PreviewGroup>
                    </div>
                  </div>
                  {/* Slider */}
                  <div
                    className="flex mx-n2 mb-10 mb-md-0"
                    data-flickity='{"asNavFor": "#productSlider", "contain": true, "wrapAround": false}'
                  >
                    {detail?.images?.slice(0, 3)?.map((e, i) => (
                      <div
                        key={i}
                        className="col-12 px-2"
                        style={{ maxWidth: "113px" }}
                      >
                        <div
                          onClick={() => {
                            setCurrentImage(i);
                            setOpenModal(true);
                          }}
                          className="embed-responsive embed-responsive-1by1 bg-cover cursor-pointer"
                          style={{
                            "background-image": `url(${e.thumbnail_url})`,
                          }}
                        ></div>
                      </div>
                    ))}

                    {detail?.images?.length > 3 && (
                      <div
                        className=" col-12 px-2"
                        style={{ maxWidth: "113px" }}
                      >
                        <div
                          onClick={() => {
                            setCurrentImage(4);
                            setOpenModal(true);
                          }}
                          className="rounded-sm h-full bg-light flex items-center justify-center cursor-pointer"
                        >
                          + {detail?.images.length - 3} <br />
                          hình
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 pl-lg-10">
                  {/* Header */}
                  <div className="row mb-1">
                    <div className="col">
                      {/* Preheading */}
                      <a className="text-muted" href="shop.html">
                        {category?.data?.title}
                      </a>
                    </div>
                    <div className="col-auto">
                      {/* Rating */}
                      <div
                        className="rating font-size-xs text-dark"
                        data-value={detail?.rating_average}
                      >
                        <div className="rating-item">
                          <i className="fas fa-star" />
                        </div>
                        <div className="rating-item">
                          <i className="fas fa-star" />
                        </div>
                        <div className="rating-item">
                          <i className="fas fa-star" />
                        </div>
                        <div className="rating-item">
                          <i className="fas fa-star" />
                        </div>
                        <div className="rating-item">
                          <i className="fas fa-star" />
                        </div>
                      </div>
                      <a
                        className="font-size-sm text-reset ml-2"
                        href="#reviews"
                      >
                        {detail?.rating_average} star ({detail?.review_count}
                        Reviews)
                      </a>
                    </div>
                  </div>
                  {/* Heading */}
                  <h3 className="mb-2">{detail?.name}</h3>
                  {/* Price */}
                  <div className="mb-7">
                    {detail?.real_price === detail?.price ? (
                      <span className="ml-1 font-size-h5 font-weight-bolder text-primary">
                        {detail?.real_price} VNĐ
                      </span>
                    ) : (
                      <>
                        <span className="font-size-lg font-weight-bold text-gray-350 text-decoration-line-through">
                          {currency(detail?.price)} VNĐ
                        </span>
                        <span className="ml-1 font-size-h5 font-weight-bolder text-primary">
                          {currency(detail?.real_price)} VNĐ
                        </span>
                      </>
                    )}

                    {detail?.stock_item?.qty >= 1 ? (
                      <span className="font-size-sm ml-1">(Còn hàng)</span>
                    ) : (
                      <span className="font-size-sm ml-1">(Hết hàng)</span>
                    )}
                  </div>
                  {/* Form */}
                  <p className="mb-10">{detail?.short_description}</p>
                  <div className="form-group">
                    <div className="form-row mb-7">
                      {/* <div className="col-12 col-lg-auto">
                        <select class="custom-select mb-2">
                          <option value="1" selected>
                            1
                          </option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div> */}
                      <div className="col-12 col-lg-auto">
                        {/* Submit */}
                        {/* Wishlist */}
                        <Popconfirm
                          disabled={user}
                          title="Thông báo"
                          description={
                            <>
                              <p>
                                Bạn cần đăng nhập trước khi sử dụng chức năng
                                này
                              </p>
                              <div className="flex ">
                                <Button
                                  onClick={() =>
                                    navigate(PATH.account, {
                                      state: {
                                        redirect:
                                          window.location.pathname +
                                          window.location.search,
                                      },
                                    })
                                  }
                                >
                                  Đăng nhập
                                </Button>
                              </div>
                            </>
                          }
                          showCancel={false}
                          okButtonProps={{ hidden: true }}
                        >
                          <Button
                            loading={addCartLoading}
                            onClick={() => user && addToCart()}
                            className="mb-2"
                          >
                            Add to Cart
                            <i className="fe fe-shopping-cart ml-2"></i>
                          </Button>
                        </Popconfirm>
                      </div>
                      <div className="col-12 col-lg-auto">
                        {/* Wishlist */}
                        <Popconfirm
                          disabled={user}
                          title="Thông báo"
                          description={
                            <>
                              <p>
                                Bạn cần đăng nhập trước khi sử dụng chức năng
                                này
                              </p>
                              <div className="flex ">
                                <Button
                                  onClick={() =>
                                    navigate(PATH.account, {
                                      state: {
                                        redirect:
                                          window.location.pathname +
                                          window.location.search,
                                      },
                                    })
                                  }
                                >
                                  Đăng nhập
                                </Button>
                              </div>
                            </>
                          }
                          showCancel={false}
                          okButtonProps={{ hidden: true }}
                        >
                          <Button
                            className="mb-2"
                            onClick={() => user && onAddWishList()}
                          >
                            Wishlist <i className="fe fe-heart ml-2" />
                          </Button>
                        </Popconfirm>
                      </div>
                    </div>
                    {/* Text */}
                    <p>
                      <span className="text-gray-500">
                        Is your size/color sold out?
                      </span>
                      <a
                        className="text-reset text-decoration-underline"
                        data-toggle="modal"
                        href="#modalWaitList"
                      >
                        Join the Wait List!
                      </a>
                    </p>
                    {/* Share */}
                    <p className="mb-0">
                      <span className="mr-4">Share:</span>
                      <a
                        className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350"
                        href="#!"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                      <a
                        className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350"
                        href="#!"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a
                        className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350"
                        href="#!"
                      >
                        <i className="fab fa-pinterest-p" />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* DESCRIPTION */}
      <section className="pt-11">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Nav */}
              <div className="nav nav-tabs nav-overflow justify-content-start justify-content-md-center border-bottom">
                <div className="nav-link active" data-toggle="tab">
                  Description
                </div>
              </div>
              {/* Content */}
              <div className="tab-content">
                <div>
                  <div className="row justify-content-center py-9">
                    <div className="col-12 col-lg-10 col-xl-8">
                      <div className="row">
                        <div className="col-12">
                          {/* Text */}
                          <ShortedContent>{detail?.description}</ShortedContent>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* REVIEWS */}
      <section className="pt-9 pb-11" id="reviews">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Heading */}
              <h4 className="mb-10 text-center">Customer Reviews</h4>
              {/* Header */}

              <div className="row align-items-center">
                <div className="col-12 col-md-auto">
                  {/* Dropdown */}
                  {/* <div className="dropdown mb-4 mb-md-0">
                    <a
                      className="dropdown-toggle text-reset"
                      data-toggle="dropdown"
                      href="#"
                    >
                      <strong>Sort by: Newest</strong>
                    </a>
                    <div className="dropdown-menu mt-3">
                      <a className="dropdown-item" href="#!">
                        Newest
                      </a>
                      <a className="dropdown-item" href="#!">
                        Oldest
                      </a>
                    </div>
                  </div> */}
                </div>
                <div className="col-12 col-md text-md-center">
                  {/* Rating */}
                  <div
                    className="rating text-dark h6 mb-4 mb-md-0"
                    data-value={detail?.rating_average}
                  >
                    <div className="rating-item">
                      <i className="fas fa-star" />
                    </div>
                    <div className="rating-item">
                      <i className="fas fa-star" />
                    </div>
                    <div className="rating-item">
                      <i className="fas fa-star" />
                    </div>
                    <div className="rating-item">
                      <i className="fas fa-star" />
                    </div>
                    <div className="rating-item">
                      <i className="fas fa-star" />
                    </div>
                  </div>
                  {/* Count */}
                  <strong className="font-size-sm ml-2">
                    Reviews ({reviewPaginate?.count})
                  </strong>
                </div>
                {/* <div className="col-12 col-md-auto">
                  <a
                    className="btn btn-sm btn-dark"
                    data-toggle="collapse"
                    href="#reviewForm"
                  >
                    Write Review
                  </a>
                </div> */}
              </div>
              {/* New Review */}
              <div className="" id="reviewForm">
                {/* Divider */}
                <hr className="my-8" />
                {/* Form */}
                {/* <form>
                  <div className="row">
                    <div className="col-12 mb-6 text-center">
                      <p className="mb-1 font-size-xs">Score:</p>
                      <div className="rating-form">
                        <input
                          className="rating-input"
                          type="range"
                          min={1}
                          max={5}
                          defaultValue={5}
                        />
                        <div className="rating h5 text-dark" data-value={5}>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="sr-only" htmlFor="reviewName">
                          Your Name:
                        </label>
                        <input
                          className="form-control form-control-sm"
                          id="reviewName"
                          type="text"
                          placeholder="Your Name *"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label className="sr-only" htmlFor="reviewEmail">
                          Your Email:
                        </label>
                        <input
                          className="form-control form-control-sm"
                          id="reviewEmail"
                          type="email"
                          placeholder="Your Email *"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label className="sr-only" htmlFor="reviewTitle">
                          Review Title:
                        </label>
                        <input
                          className="form-control form-control-sm"
                          id="reviewTitle"
                          type="text"
                          placeholder="Review Title *"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label className="sr-only" htmlFor="reviewText">
                          Review:
                        </label>
                        <textarea
                          className="form-control form-control-sm"
                          id="reviewText"
                          rows={5}
                          placeholder="Review *"
                          required
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-12 text-center">
                      <button className="btn btn-outline-dark" type="submit">
                        Post Review
                      </button>
                    </div>
                  </div>
                </form> */}
              </div>
              {/* Reviews */}
              <div className="mt-8">
                {/* Review */}
                <div className="review">
                  <div className="review-body">
                    <div className="row">
                      <ListReview
                        loadingCount={5}
                        loading={reviewLoading}
                        data={reviews}
                        empty={
                          <div className="col-12 mt-5">
                            <p className="text-xl border p-5 text-center mb-5">
                              Sản phẩm hiện chưa có đánh giá nào, hãy giúp chúng
                              tôi mua hàng và đánh giá cho người khác biết
                            </p>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
                {/* Review */}
              </div>
              {reviewLoading ? (
                <></>
              ) : (
                <Paginate totalPage={reviewPaginate?.totalPage} />
              )}
              {/* Pagination */}
              {/* <nav className="d-flex justify-content-center mt-9">
                <ul className="pagination pagination-sm text-gray-400">
                  <li className="page-item">
                    <a className="page-link page-link-arrow" href="#">
                      <i className="fa fa-caret-left" />
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link page-link-arrow" href="#">
                      <i className="fa fa-caret-right" />
                    </a>
                  </li>
                </ul>
              </nav> */}
            </div>
          </div>
        </div>
      </section>
      {/* FEATURES */}
      <section className="bg-light py-9">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="d-flex mb-6 mb-lg-0">
                {/* Icon */}
                <i className="fe fe-truck font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="heading-xxs mb-1">Free shipping</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    From all orders over $100
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
                  <h6 className="mb-1 heading-xxs">Free returns</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    Return money within 30 days
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
                  <h6 className="mb-1 heading-xxs">Secure shopping</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    You're in safe hands
                  </p>
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
                  <h6 className="mb-1 heading-xxs">Over 10,000 Styles</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    We have everything you need
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
