import { ONE_HOUR } from "@/config";
import { useQuery } from "@/hooks/useQuery";
import { cartService } from "@/services/cart";
import { preCheckoutStore } from "@/utils/token";
import React from "react";
import { useRef } from "react";

const Checkout = () => {
  const defaultSelectAddress = () =>
    preCheckoutStore.get("selectAddress") || {};
  const queryGetShippingMethod = useQuery({
    queryFn: () => cartService.getMethodShipping(),
    queryKey: [`shipping-method`],
    cacheTime: ONE_HOUR,
    limitDuration: 1000,
  });
  const queryCheckout = useQuery({
    queryFn: ({ params }) => cartService.checkout(...params),
    enabled: false,
  });
  const addressFormRef = useRef();

  return <div>Checkout</div>;
};

export default Checkout;
