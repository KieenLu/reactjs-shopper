import { Link } from "react-router-dom";
import Skeleton from "../Skeleton";

export const ProductCardLoading = () => {
  return (
    <div className="product-card card mb-7">
      {/* Image */}
      <div className="card-img">
        {/* Image */}
        <Link to="#" className="card-img-hover" href="product.html">
          <Skeleton height={300} />
        </Link>
      </div>
      {/* Body */}
      <div className="card-body px-0">
        {/* Category */}
        <div className="card-product-category font-size-xs">
          <a className="text-muted" href="shop.html">
            <Skeleton height="100%" width={150} />
          </a>
        </div>
        {/* Title */}
        <div className="card-product-title font-weight-bold">
          <Link className="text-body card-product-name" to="#">
            <Skeleton height="100%" />
          </Link>
        </div>
        <div className="card-product-rating">
          <Skeleton height="100%" width={150} />
        </div>
        {/* Price */}
        <div className="card-product-price">
          <Skeleton height="100%" width={100} />
        </div>
      </div>
    </div>
  );
};
