import { cartActions, updateQuantityAction } from "@/stories/cart";
import { currency } from "@/utils/currency";
import classNames from "classnames";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { InputStyle } from "../CartDrawer/InputStyle";

const CartItem = ({ thumbnail_url, name, real_price, id, quantity }) => {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);

  const onChangeQuantity = (quantity) => async (ev) => {
    ev.preventDefault();
    try {
      setDisable(true);
      await dispatch(
        updateQuantityAction({
          productId: id,
          quantity,
        })
      );
      bb;
      setDisable(false);
    } catch (err) {
      console.error(err);
    }
  };

  const onClose = () => {
    dispatch(cartActions.toggleCartDrawer(false));
  };

  // const increment = async () => {
  //   try {
  //     setDisable(true);
  //     await dispatch(
  //       updateQuantity({
  //         productId: id,
  //         quantity: quantity + 1,
  //       })
  //     );
  //     setDisable(false);
  //   } catch (err) {
  //     handleError(err);
  //   }
  // };

  // const decrement = async () => {
  //   try {
  //     setDisable(true);
  //     await dispatch(
  //       updateQuantity({
  //         productId: id,
  //         quantity: quantity - 1,
  //       })
  //     );
  //     setDisable(false);
  //   } catch (err) {
  //     handleError(err);
  //   }
  // };

  return (
    <li className="list-group-item">
      <div className="row align-items-center">
        <div className="col-4">
          {/* Image */}
          <Link onClick={onClose}>
            <img className="img-fluid" src={thumbnail_url} alt="..." />
          </Link>
        </div>
        <div className="col-8">
          {/* Title */}
          <p className="font-size-sm font-weight-bold mb-6">
            <Link className="text-body" to={""} onClick={onClose}>
              {name}
            </Link>
            <br />
            <span className="text-muted">{currency(real_price)}VND</span>
          </p>
          {/*Footer */}
          <div className="d-flex align-items-center">
            {/* Select */}
            <InputStyle className={classNames({ disable })}>
              <button onClick={onChangeQuantity(quantity - 1)}>-</button>
              <input value={quantity}></input>
              <button onClick={onChangeQuantity(quantity + 1)}>+</button>
            </InputStyle>
            {/* Remove */}
            <a
              onClick={onChangeQuantity(0)}
              className={classNames(
                disable
                  ? "font-size-xs text-gray-400 ml-auto pointer-events-none opacity-20"
                  : "font-size-xs text-gray-400 ml-auto"
              )}
              href="#"
            >
              <i className="fe fe-x" /> Xóa sản phẩm
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};
export default CartItem;
