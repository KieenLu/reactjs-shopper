import { MESSAGE } from "@/config/message";
import { PATH } from "@/config/path";
import { useAction } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";
import { productService } from "@/services/product";
import { updateQuantityAction } from "@/stories/cart";
import { currency } from "@/utils/currency";
import { handleError } from "@/utils/handleError";
import { Popconfirm, message } from "antd";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button";
const ProductCard = ({
  onRemoveWishlistSuccess,
  showRemove,
  showWishlist,
  categories,
  name,
  price,
  real_price,
  images,
  slug,
  id,
  rating_average,
  review_count,
}) => {
  const _slug = "/" + slug;
  const { user } = useAuth();
  const { cart } = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const salePrice = price - real_price;
  const image_1 = images[0].thumbnail_url;
  const image_2 = images?.[1]?.thumbnail_url || image_1;
  const loadingWishlsitRef = useRef(false);

  const onAddWishlist = async () => {
    if (loadingWishlsitRef.current) return;
    loadingWishlsitRef.current = true;
    const key = `wishlist-${id}`;
    try {
      message.loading({
        key,
        content: "Đang thêm sản phẩm vào danh sách yêu thích",
        duration: 1,
      });
      await productService.addWishList(id);
      message.success({
        key,
        content: `Đã thêm sản phẩm "${name}" vào danh sách yêu thích thành công.`,
        duration: 1,
      });
    } catch (err) {
      handleError(err, key);
    }
    loadingWishlsitRef.current = false;
  };
  const _onRemoveWishlistSuccess = async (ev) => {
    ev.preventDefault();
    try {
      message.loading({
        key: "removeWishList",
        content: "Đang xóa sản phẩm khỏi danh sách yêu thích",
      });
      await productService.deleteWishList(id);
      onRemoveWishlistSuccess?.(id);
      message.success({
        key: "removeWishList",
        content: `Đã xóa sản phẩm "${name}" khỏi danh sách yêu thích thành công.`,
        duration: 2,
      });
    } catch (err) {
      handleError(err);
    }
    loadingWishlsitRef.current = false;
  };

  const onAddProductCart = useAction({
    action: () => {
      const quantity =
        cart?.listItems?.find((e) => e.productId === id)?.quantity || 0;
      return dispatch(
        updateQuantityAction({
          productId: id,
          quantity: quantity + 1,
          showPopover: true,
        })
      );
    },
    messageLoading: MESSAGE.LOADING_ADD_CART(name),
    messageSuccess: false,
  });
  // const onAddProductCart = async () => {
  //   try {
  //     await dispatch(
  //       updateQuantityAction({
  //         productId: id,
  //         quantity: 1,
  //       })
  //     );
  //   } catch (err) {
  //     handleError(err);
  //   }
  // };
  return (
    <div className="product-card card mb-7">
      {/* Image */}
      {salePrice > 0 && (
        <div className="card-sale badge badge-dark card-badge card-badge-left text-uppercase">
          -{Math.floor((salePrice / price) * 100)}%
        </div>
      )}
      <div className="card-img">
        {/* Image */}
        <Link to={_slug} className="card-img-hover">
          <img className="card-img-top card-img-back" src={image_2} alt="..." />
          <img
            className="card-img-top card-img-front"
            src={image_1}
            alt="..."
          />
        </Link>
        {/* Actions */}
        <div className="card-actions">
          {/* <span className="card-action">
            <button
              className="btn btn-xs btn-circle btn-white-primary"
              data-toggle="button"
              onClick={onAddProductCart}
            >
              <i className="fe fe-shopping-cart" />
            </button>
          </span> */}
          <Popconfirm
            disabled={user}
            title="Thông báo"
            description={
              <>
                <p>Bạn cần đăng nhập trước khi sử dụng chức năng này</p>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() =>
                      navigate(PATH.account, {
                        state: {
                          redirect:
                            window.location.pathname + window.location.search,
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
            <span className="card-action">
              <button
                className="btn btn-xs btn-circle btn-white-primary"
                data-toggle="button"
                onClick={() => user && onAddProductCart()}
              >
                <i className="fe fe-shopping-cart" />
              </button>
            </span>
          </Popconfirm>
          {showWishlist && (
            <Popconfirm
              disabled={user}
              title="Thông báo"
              description={
                <>
                  <p>Bạn cần đăng nhập trước khi sử dụng chức năng này</p>
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() =>
                        navigate(PATH.account, {
                          state: {
                            redirect:
                              window.location.pathname + window.location.search,
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
              <span className="card-action">
                <button
                  onClick={() => user && onAddWishlist()}
                  className="btn btn-xs btn-circle btn-white-primary"
                  data-toggle="button"
                >
                  <i className="fe fe-heart" />
                </button>
              </span>
            </Popconfirm>
          )}
          {showRemove && (
            <span className="card-action">
              <button
                onClick={_onRemoveWishlistSuccess}
                className="btn btn-xs btn-circle btn-white-primary"
                data-toggle="button"
              >
                <i className="fe fe-x" />
              </button>
            </span>
          )}
        </div>
      </div>
      <div className="card-body px-0">
        <div className="card-product-category font-size-xs">
          <a className="text-muted" href="shop.html">
            Dresses
          </a>
        </div>
        <div className="card-product-title font-weight-bold">
          <Link className="text-body card-product-name" to={_slug}>
            {name}
          </Link>
        </div>
        <div className="card-product-rating">
          {rating_average > 0 && (
            <>
              {rating_average}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                size={14}
                color="#fdd836"
                height={14}
                width={14}
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "rgb(253, 216, 54)" }}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                size={14}
                color="#fdd836"
                height={14}
                width={14}
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "rgb(253, 216, 54)" }}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                size={14}
                color="#fdd836"
                height={14}
                width={14}
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "rgb(253, 216, 54)" }}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                size={14}
                color="#fdd836"
                height={14}
                width={14}
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "rgb(253, 216, 54)" }}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                size={14}
                color="#fdd836"
                height={14}
                width={14}
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "rgb(253, 216, 54)" }}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              ({review_count} nhận xét)
            </>
          )}
        </div>
        {/* Price */}
        <div className="card-product-price flex items-baseline ">
          {real_price < price ? (
            <>
              <span className="text-primary sale">{currency(real_price)}</span>
              <span className="font-size-xs text-gray-350 text-decoration-line-through ml-1">
                {currency(price)} VND
              </span>
            </>
          ) : (
            <>
              <span className="text-xl flex h-full items-end">
                {currency(real_price)} VND
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
