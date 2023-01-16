import { PATH } from "@/config/path";
import { currency } from "@/utils/currency";
import { handleError } from "@/utils/handleError";
import { Drawer } from "antd";
import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import { InputStyle } from "./InputStyle";
import { cartActions, updateQuantity } from "@/stories/cart";

export const CartDrawer = () => {
  const { openCart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(cartActions.toggleCartDrawer(false));
  };
  const { cart } = useSelector((store) => store.cart);
  return (
    <Drawer
      headerStyle={{ display: "none" }}
      bodyStyle={{ padding: 0 }}
      width={470}
      open={openCart}
      onClose={onClose}
    >
      {/* Full cart (add `.d-none` to disable it) */}
      <div className="modal-content">
        {/* Close */}
        <button
          onClick={onClose}
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <i className="fe fe-x" aria-hidden="true" />
        </button>
        {/* Header*/}
        <div className="modal-header line-height-fixed font-size-lg">
          <strong className="mx-auto">
            Your Cart ({cart?.totalQuantity || 0})
          </strong>
        </div>
        {/* List group */}
        <ul className="list-group list-group-lg list-group-flush">
          {cart?.listItems.map((e) => (
            <ProductItemInCart
              quantity={e.quantity}
              key={e.product.id}
              {...e.product}
            />
          ))}
        </ul>
        {/* Footer */}
        <div className="modal-footer line-height-fixed font-size-sm bg-light mt-auto">
          <strong>Subtotal</strong>{" "}
          <strong className="ml-auto">
            {currency(cart?.subTotal || 0)} VND
          </strong>
        </div>
        {/* Buttons */}
        <div className="modal-body">
          <a className="btn btn-block btn-dark" href="./checkout.html">
            Continue to Checkout
          </a>
          <a
            className="btn btn-block btn-outline-dark"
            href="./shopping-cart.html"
          >
            View Cart
          </a>
        </div>
      </div>
      {/* Empty cart (remove `.d-none` to enable it) */}
      <div className="modal-content d-none">
        {/* Close */}
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <i className="fe fe-x" aria-hidden="true" />
        </button>
        {/* Header*/}
        <div className="modal-header line-height-fixed font-size-lg">
          <strong className="mx-auto">Your Cart (0)</strong>
        </div>
        {/* Body */}
        <div className="modal-body flex-grow-0 my-auto">
          {/* Heading */}
          <h6 className="mb-7 text-center">Your cart is empty 😞</h6>
          {/* Button */}
          <a className="btn btn-block btn-outline-dark" href="#!">
            Continue Shopping
          </a>
        </div>
      </div>
    </Drawer>
  );
};

const ProductItemInCart = ({
  images,
  name,
  real_price,
  slug,
  id,
  quantity,
}) => {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);

  const changeQuantiry = (quantity) => async () => {
    try {
      setDisable(true);
      await dispatch(
        updateQuantity({
          productId: id,
          quantity,
        })
      );
      setDisable(false);
    } catch (err) {
      handleError(err);
    }
  };

  //   // const increment = async () => {
  //   //   try {
  //   //     setDisable(true);
  //   //     await dispatch(
  //   //       updateQuantity({
  //   //         productId: id,
  //   //         quantity: quantity + 1,
  //   //       })
  //   //     );
  //   //     setDisable(false);
  //   //   } catch (err) {
  //   //     handleError(err);
  //   //   }
  //   // };

  //   // const decrement = async () => {
  //   //   try {
  //   //     setDisable(true);
  //   //     await dispatch(
  //   //       updateQuantity({
  //   //         productId: id,
  //   //         quantity: quantity - 1,
  //   //       })
  //   //     );
  //   //     setDisable(false);
  //   //   } catch (err) {
  //   //     handleError(err);
  //   //   }
  //   // };
  const onClose = () => {
    dispatch(cartActions.toggleCartDrawer(false));
  };

  return (
    <li className="list-group-item">
      <div className="row align-items-center">
        <div className="col-4">
          {/* Image */}
          <Link onClick={onClose}>
            <img
              className="img-fluid"
              src={images[0].thumbnail_url}
              alt="..."
            />
          </Link>
        </div>
        <div className="col-8">
          {/* Title */}
          <p className="font-size-sm font-weight-bold mb-6">
            <Link className="text-body" onClick={onClose}>
              {name}
            </Link>
            <br />
            <span className="text-muted">{currency(real_price)}VND</span>
          </p>
          {/*Footer */}
          <div className="d-flex align-items-center">
            {/* Select */}
            <InputStyle className={classNames({ disable })}>
              <button onClick={changeQuantiry(quantity - 1)}>-</button>
              <input value={quantity}></input>
              <button onClick={changeQuantiry(quantity + 1)}>+</button>
            </InputStyle>
            {/* Remove */}
            <a
              onClick={changeQuantiry(0)}
              className="font-size-xs text-gray-400 ml-auto"
              href="#!"
            >
              <i className="fe fe-x" /> Xóa sản phẩm
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};
