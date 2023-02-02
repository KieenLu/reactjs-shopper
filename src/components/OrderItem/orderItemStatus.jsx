import { currency } from "@/utils/currency";
import { withLoading } from "@/utils/withLoading";
import moment from "moment";
import React, { useMemo } from "react";

const STATUS = {
  pending: "Chờ xác nhận",
  confirm: "Chờ giao hàng",
  shipping: "Đang giao hàng",
  finished: "Hoàn thành",
  cancel: "Đã hủy",
};

const DATE_FORMAT = "MMM DD, YYYY";

export const OrderItemStatus = withLoading(
  ({
    _id,
    status,
    total,
    createdAt,
    confirmDate,
    finishedDate,
    shippingDate,
  }) => {
    const strCreatedAt = useMemo(
      () => moment(createdAt).format(DATE_FORMAT),
      [createdAt]
    );

    return (
      <div className="card-body bg-light">
        <div className="row">
          <div className="col-6 col-lg-3">
            {/* Heading */}
            <h6 className="heading-xxxs text-muted">MÃ ĐƠN HÀNG:</h6>
            {/* Text */}
            <p className="mb-lg-0 font-size-sm font-weight-bold">
              {_id.substring(_id.length - 6)}
            </p>
          </div>
          {["pending", "cancel"].includes(status) && (
            <div className="col-6 col-lg-3">
              {/* Heading */}
              <h6 className="heading-xxxs text-muted">Ngày tạo đơn:</h6>
              {/* Text */}
              <p className="mb-lg-0 font-size-sm font-weight-bold">
                <time dateTime="2019-09-25">{strCreatedAt}</time>
              </p>
            </div>
          )}
          {status === "confirm" && (
            <div className="col-6 col-lg-3">
              {/* Heading */}
              <h6 className="heading-xxxs text-muted">Ngày xác nhận:</h6>
              {/* Text */}
              <p className="mb-lg-0 font-size-sm font-weight-bold">
                <time dateTime="2019-09-25">
                  {moment(confirmDate).format(DATE_FORMAT)}
                </time>
              </p>
            </div>
          )}
          {status === "shipping" && (
            <div className="col-6 col-lg-3">
              {/* Heading */}
              <h6 className="heading-xxxs text-muted">Ngày vận chuyển:</h6>
              {/* Text */}
              <p className="mb-lg-0 font-size-sm font-weight-bold">
                <time dateTime="2019-09-25">
                  {moment(shippingDate).format(DATE_FORMAT)}
                </time>
              </p>
            </div>
          )}
          {status === "finished" && (
            <div className="col-6 col-lg-3">
              {/* Heading */}
              <h6 className="heading-xxxs text-muted">Ngày giao hàng:</h6>
              {/* Text */}
              <p className="mb-lg-0 font-size-sm font-weight-bold">
                <time dateTime="2019-09-25">
                  {moment(finishedDate).format(DATE_FORMAT)}
                </time>
              </p>
            </div>
          )}

          <div className="col-6 col-lg-3">
            {/* Heading */}
            <h6 className="heading-xxxs text-muted">Trạng thái:</h6>
            {/* Text */}
            <p className="mb-0 font-size-sm font-weight-bold">
              {STATUS[status]}
            </p>
          </div>
          <div className="col-6 col-lg-3">
            {/* Heading */}
            <h6 className="heading-xxxs text-muted">Tổng tiền:</h6>
            {/* Text */}
            <p className="mb-0 font-size-sm font-weight-bold">
              {currency(total)}
            </p>
          </div>
        </div>
      </div>
    );
  }
);
