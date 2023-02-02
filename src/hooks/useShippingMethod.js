import { cartService } from "@/services/cart";
import { useQuery } from "./useQuery";
import { ONE_HOUR } from "@/config";

export const useShippingMethod = () => {
  return useQuery({
    queryFn: () => cartService.getMethodShipping(),
    queryKey: [`shipping-method`],
    cacheTime: ONE_HOUR,
    limitDuration: 1000,
  });
};
