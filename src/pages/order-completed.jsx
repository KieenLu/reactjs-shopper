import React from "react";

const OrderCompleted = () => {
  return (
    <section className="py-12">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
            {/* Icon */}
            <div className="mb-7 font-size-h1">❤️</div>
            {/* Heading */}
            <h2 className="mb-5">Your Order is Completed!</h2>
            {/* Text */}
            <p className="mb-7 text-gray-500">
              Your order{" "}
              <span className="text-body text-decoration-underline">
                673290789
              </span>{" "}
              has been completed. Your order details are shown for your personal
              accont.
            </p>
            {/* Button */}
            <a className="btn btn-dark" href="./account-order.html">
              View My Orders
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderCompleted;
