import { PATH } from "@/config/path";
import { useQuery } from "@/hooks/useQuery";
import { useSearch } from "@/hooks/useSearch";
import { orderService } from "@/services/order";
import { updateQuantityAction } from "@/stories/cart";
import { withListLoading } from "@/utils/withListLoading";
import { withLoading } from "@/utils/withLoading";
import moment from "moment";
import queryString from "query-string";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { generatePath, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Paginate } from "../Paginate";
import Skeleton from "../Skeleton";
import { OrderItemStatus } from "./orderItemStatus";

const OrderItemLoading = () => {
  return (
    <div className="card card-lg mb-5 border">
      <div className="card-body pb-0">
        {/* Info */}
        <div className="card card-sm">
          <Skeleton height={75.69} />
        </div>
      </div>
      <div className="card-footer">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6">
            <div className="form-row mb-4 mb-lg-0">
              <div className="col-3">
                <div className="embed-responsive embed-responsive-1by1 bg-cover">
                  <Skeleton className="absolute h-full top-0 left-0" />
                </div>
              </div>
              <div className="col-3">
                <div className="embed-responsive embed-responsive-1by1 bg-cover">
                  <Skeleton className="absolute h-full top-0 left-0" />
                </div>
              </div>
              <div className="col-3">
                <div className="embed-responsive embed-responsive-1by1 bg-cover">
                  <Skeleton className="absolute h-full top-0 left-0" />
                </div>
              </div>
              <div className="col-3">
                <div className="embed-responsive embed-responsive-1by1 bg-cover">
                  <Skeleton className="absolute h-full top-0 left-0" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="flex justify-end gap-3">
              <Skeleton height={40.5} width={83} />
              <Skeleton height={40.5} width={105.11} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderItem = withLoading((props) => {
  const { _id, status, listItems, finishedDate } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const moreImage = listItems.slice(3);
  const checkoutReturn = useMemo(() => {
    if (status === "finished") {
      return moment(finishedDate) > moment().add(-7, "d");
    }
  }, []);
  const onReOrder = () => {
    for (let i in listItems) {
      dispatch(
        updateQuantityAction({
          productId: listItems[i].productId,
          quantity: 1,
        })
      );
    }
    navigate(PATH.viewCart);
  };
  return (
    <div className="card card-lg mb-5 border">
      <div className="card-body pb-0">
        {/* Info */}
        <div className="card card-sm">
          <OrderItemStatus {...props} />
        </div>
      </div>
      <div className="card-footer">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6">
            <div className="form-row mb-4 mb-lg-0">
              {listItems.slice(0, 3).map((e) => (
                <div key={e.productId} className="col-3">
                  {/* Image */}
                  <div
                    className="embed-responsive embed-responsive-1by1 bg-cover"
                    style={{
                      backgroundImage: `url(${e.product.thumbnail_url})`,
                    }}
                  />
                </div>
              ))}
              {moreImage.length > 0 && (
                <div className="col-3">
                  <div className="embed-responsive embed-responsive-1by1 bg-light">
                    <a
                      className="embed-responsive-item embed-responsive-item-text text-reset"
                      href="#!"
                    >
                      <div className="font-size-xxs font-weight-bold">
                        +{moreImage.length} <br /> ảnh
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="flex justify-end gap-3">
              {["finished", "cancel"].includes(status) && (
                <Button size="xs" type="outline" onClick={onReOrder}>
                  Mua lại
                </Button>
              )}
              {status === "finished" && checkoutReturn && (
                <Button size="xs" type="outline" link="#">
                  Đổi trả
                </Button>
              )}
              {status === "pending" && (
                <Button size="xs" type="outline" link="#">
                  Hủy đơn
                </Button>
              )}
              <Button
                size="xs"
                type="outline"
                link={generatePath(PATH.profile.orderDetail, { id: _id })}
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}, OrderItemLoading);

const ListOrderItem = withListLoading(OrderItem);

export const ListOrder = ({ status }) => {
  const [search, setSearch] = useSearch({ page: 1 });
  const qs = queryString.stringify({
    status,
    page: search.page,
  });
  const { loading, data: { data: orders = [], paginate = {} } = {} } = useQuery(
    {
      queryFn: () => orderService.getOrder(`?${qs}`),
    }
  );

  return (
    <>
      <ListOrderItem
        loading={loading}
        data={orders}
        loadingCount={5}
        empty={
          <div className="flex items-center flex-col gap-5 text-center">
            <img width={200} src="/src/assets/img/empty-order.jpg" alt="" />
            <p>Chưa có đơn hàng nào</p>
          </div>
        }
      />
      <Paginate totalPage={paginate.totalPage} />
    </>
  );
};
