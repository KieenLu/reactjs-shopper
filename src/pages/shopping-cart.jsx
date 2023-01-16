import React from "react";

const ShoppingCart = () => {
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
                <li className="breadcrumb-item active">Shopping Cart</li>
              </ol>
            </div>
          </div>
        </div>
      </nav>
      {/* CONTENT */}
      <section className="pt-7 pb-12">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Heading */}
              <h3 className="mb-10 text-center">Shopping Cart</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-7">
              {/* List group */}
              <ul className="list-group list-group-lg list-group-flush-x mb-6">
                <li className="list-group-item product-view-cart">
                  <div className="row align-items-center">
                    <div className="col-4 d-flex flex items-center gap-2">
                      <div className="custom-control custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="loginRemember"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="loginRemember"
                        />
                      </div>
                      {/* Image */}
                      <a href="product.html">
                        <img
                          src="./img/products/product-6.jpg"
                          alt="..."
                          className="img-fluid"
                        />
                      </a>
                    </div>
                    <div className="col">
                      {/* Title */}
                      <div className="d-flex mb-2 font-weight-bold">
                        <a className="text-body" href="product.html">
                          Cotton floral print
                        </a>
                      </div>
                      {/* Text */}
                      <p className="mb-7 font-size-sm text-muted">
                        Size: M <br />
                        Color: Red
                      </p>
                      {/*Footer */}
                      <div className="d-flex align-items-center">
                        {/* Select */}
                        <div className="d-flex align-items-center mb-2 font-weight-bold">
                          <span className="mr-2">$40.00</span>
                          <div className="btn-group btn-quantity ">
                            <button className="btn">-</button>
                            <input defaultValue={1} />
                            <button className="btn">+</button>
                          </div>
                        </div>
                        {/* Remove */}
                        <a
                          className="font-size-xs text-gray-400 ml-auto"
                          href="#!"
                        >
                          <i className="fe fe-x" /> Xóa
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item product-view-cart">
                  <div className="row align-items-center">
                    <div className="col-4 d-flex items-center gap-2">
                      <div className="custom-control custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="loginRemember"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="loginRemember"
                        />
                      </div>
                      {/* Image */}
                      <a href="product.html">
                        <img
                          src="./img/products/product-10.jpg"
                          alt="..."
                          className="img-fluid"
                        />
                      </a>
                    </div>
                    <div className="col">
                      {/* Title */}
                      <div className="d-flex mb-2 font-weight-bold">
                        <a className="text-body" href="product.html">
                          Suede cross body Bag
                        </a>
                      </div>
                      {/* Text */}
                      <p className="mb-7 font-size-sm text-muted">
                        Color: Brown
                      </p>
                      {/*Footer */}
                      <div className="d-flex align-items-center">
                        {/* Select */}
                        <div className="d-flex align-items-center mb-2 font-weight-bold">
                          <span className="mr-2">$40.00</span>
                          <div className="btn-group btn-quantity ">
                            <button className="btn">-</button>
                            <input defaultValue={2} />
                            <button className="btn">+</button>
                          </div>
                          <span className="ml-2">$80.00</span>
                        </div>
                        {/* Remove */}
                        <a
                          className="font-size-xs text-gray-400 ml-auto"
                          href="#!"
                        >
                          <i className="fe fe-x" /> Xóa
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              {/* Footer */}
              <div className="row align-items-end justify-content-between mb-10 mb-md-0">
                <div className="col-12 col-md-7">
                  <div className="promotion-code-card mb-5">
                    <div className="title">Promotion (-50%)</div>
                    <div className="Code">SALE50</div>
                    <i className="fe fe-x close" />
                  </div>
                  {/* Coupon */}
                  <form className="mb-7 mb-md-0">
                    <label
                      className="font-size-sm font-weight-bold"
                      htmlFor="cartCouponCode"
                    >
                      Coupon code:
                    </label>
                    <div className="row form-row">
                      <div className="col">
                        {/* Input */}
                        <input
                          className="form-control form-control-sm"
                          id="cartCouponCode"
                          type="text"
                          placeholder="Enter coupon code*"
                        />
                      </div>
                      <div className="col-auto">
                        {/* Button */}
                        <button className="btn btn-sm btn-dark" type="submit">
                          Apply
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
              {/* Total */}
              <div className="product-card card mb-7 bg-light">
                <div className="card-body">
                  <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                    <li className="list-group-item d-flex">
                      <span>Subtotal</span>{" "}
                      <span className="ml-auto font-size-sm">$89.00</span>
                    </li>
                    <li className="list-group-item d-flex">
                      <span>Promotion</span>{" "}
                      <span className="ml-auto font-size-sm">-$44.50</span>
                    </li>
                    <li className="list-group-item d-flex">
                      <span>Tax</span>{" "}
                      <span className="ml-auto font-size-sm">$00.00</span>
                    </li>
                    <li className="list-group-item d-flex font-size-lg font-weight-bold">
                      <span>Total</span>{" "}
                      <span className="ml-auto font-size-sm">$44.50</span>
                    </li>
                    <li className="list-group-item font-size-sm text-center text-gray-500">
                      Giá vận chuyển sẽ được tính khi checkout *
                    </li>
                  </ul>
                </div>
              </div>
              {/* Button */}
              <a className="btn btn-block btn-dark mb-2" href="checkout.html">
                Proceed to Checkout
              </a>
              {/* Link */}
              <a
                className="btn btn-link btn-sm px-0 text-body"
                href="shop.html"
              >
                <i className="fe fe-arrow-left mr-2" /> Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;
