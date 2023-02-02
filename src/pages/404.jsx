import { PATH } from "@/config/path";
import React from "react";
import { Link } from "react-router-dom";

export const Page404 = () => {
  return (
    <section className="py-12">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
            {/* Icon */}
            <div className="mb-7 font-size-h1">🙁</div>
            {/* Heading */}
            <h2 className="mb-5">404. Page not found.</h2>
            {/* Text */}
            <p className="mb-7 text-gray-500">
              Sorry, we couldn't find the page you where looking for. We suggest
              that you return to home page.
            </p>
            {/* Button */}
            <Link className="btn btn-dark" to={PATH.home}>
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
