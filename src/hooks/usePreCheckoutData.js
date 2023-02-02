import { useDispatch } from "react-redux";
import { useCart } from "./useCart";
import { useEffect } from "react";

export const usePreCheckoutData = () => {
  const {
    preCheckoutData,
    loading: { loadingPreCheckoutData },
    preCheckoutRequest,
  } = useCart();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!preCheckoutData) {
    }
  }, []);
};
