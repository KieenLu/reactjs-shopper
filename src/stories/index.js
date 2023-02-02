import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer, getUserThunkAction } from "./auth";
import { cartReducer, getCartThunkAction } from "./cart";

const reducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});
export const store = configureStore({
  reducer: reducers,
  devTools: import.meta.env.VITE_NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.dispatch(getUserThunkAction());
store.dispatch(getCartThunkAction());
