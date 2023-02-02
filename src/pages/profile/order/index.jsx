import { ListOrder } from "@/components/OrderItem";
import { Tab } from "@/components/Tab";
import { useQuery } from "@/hooks/useQuery";
import { orderService } from "@/services/order";
import { Badge } from "antd";
import React from "react";
import { Helmet } from "react-helmet";

export default function ProfileOrder() {
  const { data: { count: pendingCount } = {} } = useQuery({
    queryFn: () => {
      orderService.count("?status=pending");
    },
  });
  const { data: { count: confirmCount } = {} } = useQuery({
    queryFn: () => {
      orderService.count("?status=confirm");
    },
  });
  const { data: { count: shippingCount } = {} } = useQuery({
    queryFn: () => {
      orderService.count("?status=shipping");
    },
  });
  return (
    <>
      <Helmet>
        <title>Theo dõi đơn hàng</title>
      </Helmet>
      <Tab
        disabledRemove
        name="order-tab"
        defaultActive="all"
        onChangeSearchParams={(search) => {
          search.delete("page");
        }}
      >
        <div>
          <div className="nav mb-10">
            <Tab.Title value="all">Tất cả đơn</Tab.Title>
            <Badge count={pendingCount} style={{ right: 10, top: 5 }}>
              <Tab.Title value="pending">Đang xử lý</Tab.Title>
            </Badge>
            <Badge count={confirmCount} style={{ right: 10, top: 5 }}>
              <Tab.Title value="confirm">Đã xác nhận</Tab.Title>
            </Badge>
            <Badge count={shippingCount} style={{ right: 10, top: 5 }}>
              <Tab.Title value="shipping">Đang vận chuyển</Tab.Title>
            </Badge>
            <Tab.Title value="finished">Đã giao</Tab.Title>
            <Tab.Title value="cancel">Đã hủy</Tab.Title>
          </div>
          <div className="tab-content">
            <Tab.Content value="all">
              <ListOrder />
            </Tab.Content>
            <Tab.Content value="pending">
              <ListOrder status="pending" />
            </Tab.Content>
            <Tab.Content value="confirm">
              <ListOrder status="confirm" />
            </Tab.Content>
            <Tab.Content value="shipping">
              <ListOrder status="shipping" />
            </Tab.Content>
            <Tab.Content value="finished">
              <ListOrder status="finished" />
            </Tab.Content>
            <Tab.Content value="cancel">
              <ListOrder status="cancel" />
            </Tab.Content>
          </div>
        </div>
      </Tab>
    </>
  );
}
