import moment from "moment";
import React from "react";
import Skeleton from "../Skeleton";
import { withListLoading } from "@/utils/withListLoading";

const Loading = () => {
  return (
    <div className="mt-8">
      {/* Review */}
      <div className="review">
        <div className="review-body">
          <div className="row">
            <div className="col-12 col-md-auto">
              {/* Avatar */}
              <div className="avatar avatar-xxl mb-6 mb-md-0">
                <span className="avatar-title rounded-circle">
                  <Skeleton shape="circle" width={100} height={100} />
                </span>
              </div>
            </div>
            <div className="col-12 col-md">
              {/* Header */}
              <div className="row mb-6">
                <div className="col-12">
                  {/* Rating */}
                  <div className="rating font-size-sm text-dark">
                    <Skeleton height={24} width={84.38} />
                  </div>
                </div>
                <div className="col-12">
                  {/* Time */}
                  <span className="font-size-xs text-muted">
                    <Skeleton height={24} width={250} />
                  </span>
                </div>
              </div>
              {/* Text */}
              <Skeleton height={60} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReviewItem = ({ star, content, createdAt, user }) => {
  return (
    <div className="mt-8">
      {/* Review */}
      <div className="review">
        <div className="review-body">
          <div className="row">
            <div className="col-12 col-md-auto">
              {/* Avatar */}
              <div className="avatar avatar-xxl mb-6 mb-md-0">
                <span className="avatar-title rounded-circle">
                  {user.avatar ? (
                    <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={user.avatar}
                      />
                    </div>
                  ) : (
                    <i className="fa fa-user" />
                  )}
                </span>
              </div>
            </div>
            <div className="col-12 col-md">
              {/* Header */}
              <div className="row mb-6">
                <div className="col-12">
                  {/* Rating */}
                  <div
                    className="rating font-size-sm text-dark"
                    data-value={star}
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
                </div>
                <div className="col-12">
                  {/* Time */}
                  <span className="font-size-xs text-muted">
                    {user.name},{" "}
                    <time dateTime="2019-07-25">
                      {moment(createdAt).local("vi").format("MMM DD YYYY")}
                    </time>
                  </span>
                </div>
              </div>
              {/* Text */}
              <p className="text-gray-500">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ListReview = withListLoading(ReviewItem, Loading);
