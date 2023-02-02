import { useSelector } from "react-redux";

export const useCart = () => useSelector((store) => store.cart);
