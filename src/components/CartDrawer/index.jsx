import { cartActions } from "@/stories/cart";
import { currency } from "@/utils/currency";
import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem";
import { Link } from "react-router-dom";
import { PATH } from "@/config/path";

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
        <ul className="list-group list-group-lg list-grozup-flush">
          {cart?.listItems?.map((e) => (
            <CartItem quantity={e.quantity} key={e.product.id} {...e.product} />
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
        {cart?.totalQuantity === 0 ? (
          <div className="modal-body flex-grow-0 my-auto">
            {/* Heading */}
            <h6 className="mb-7 text-center">Your cart is empty 😞</h6>
            {/* Button */}
            <Link
              onClick={onClose}
              className="btn btn-block btn-outline-dark"
              to={PATH.shop}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="modal-body">
            <a className="btn btn-block btn-dark" href="./checkout.html">
              Continue to Checkout
            </a>
            <Link
              onClick={onClose}
              className="btn btn-block btn-outline-dark"
              to={PATH.viewCart}
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
      {/* Empty cart (remove `.d-none` to enable it) */}
    </Drawer>
  );
};
