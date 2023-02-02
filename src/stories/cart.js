import { cartService } from "@/services/cart";
import { handleError } from "@/utils/handleError";
import { getToken, preCheckoutStore } from "@/utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCartThunkAction = createAsyncThunk(
  "cart/getCartItem",
  async (_, thunkApi) => {
    if (getToken()) {
      try {
        const res = await cartService.getCart();
        thunkApi.dispatch(cartActions.setCart(res.data));
      } catch (err) {
        console.error(err);
      }
    }
  }
);
// export const updateQuantityAction = createAsyncThunk(
//   "cart/updateQuantity",
//   async (data, thunkApi) => {
//     try {
//       if (data.quantity <= 0) {
//         await cartService.removeItem(data.productId);
//       } else {
//         await cartService.updateCart(data.productId, data.quantity);
//       }
//       await thunkApi.dispatch(getCartThunkAction());
//     } catch (err) {
//       throw handleError(err);
//     }
//   }
// );
export const updateQuantityAction = createAsyncThunk(
  "cart/updateQuantity",
  async (data, thunkApi) => {
    try {
      if (data.quantity <= 0) {
        await cartService.removeItem(data.productId);
      } else {
        await cartService.updateCart(data.productId, data.quantity);
      }
      await thunkApi.dispatch(getCartThunkAction());
      if (data.showPopover) {
        thunkApi.dispatch(cartActions.toggleCartDrawer(true));
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
      }
    } catch (err) {
      throw handleError(err);
    }
  }
);

export const {
  reducer: cartReducer,
  actions: cartActions,
  name,
  getInitialState,
} = createSlice({
  initialState: () => ({
    cart: null,
    openCart: false,
    loading: {
      cartLoading: true,
      loadingPreCheckoutData: true,
    },
    preCheckoutData: null,
    preCheckoutRequest: preCheckoutStore.get("preCheckoutRequest") || {
      listItem: [],
      shippingMethod: "mien-phi",
      promotionCode: [],
      payment: {
        paymentMethod: "money",
      },
    },
  }),
  name: "cart",

  reducers: {
    toggleCartDrawer(state, action) {
      state.openCart = action.payload;
    },
    setCart(state, action) {
      state.cart = action.payload;
    },
    clearCart() {
      return getInitialState();
    },
    clearPreCheckout() {
      const reset = getInitialState();
      state.preCheckoutData = reset.preCheckoutData;
      state.preCheckoutRequest = reset.preCheckoutRequest;
    },
    setLoading(state, action) {
      for (let i in action.payload) {
        state.loading[i] = action.payload[i];
      }
    },
    set(state, action) {
      for (let i in action.payload) {
        state[i] = action.payload[i];
      }
    },
    changeShippingMethod(state, action) {
      state.preCheckoutRequest.shippingMethod = action.payload;
    },
    changePaymentMethod(state, action) {
      state.preCheckoutRequest.payment.paymentMethod = action.payload;
    },
  },
  extraReducers: (bluider) => {},
});
