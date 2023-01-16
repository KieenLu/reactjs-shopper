import { cartService } from "@/services/cart";
import { handleError } from "@/utils/handleError";
import { getToken } from "@/utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCartThunkAction = createAsyncThunk(
  "cart/getCart",
  async (data, thunkApi) => {
    if (getToken()) {
      const res = await cartService.getCart(data);
      thunkApi.dispatch(cartActions.setCart(res.data));
    }
    try {
    } catch (err) {
      console.error(err);
      handleError(err);
      throw err;
    }
  }
);
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantiry",
  async (data, thunkApi) => {
    try {
      if (data.quantity <= 0) {
        await cartService.removeItem(data.productId);
      } else {
        await cartService.updateCart(data.productId, data.quantity);
      }
      await thunkApi.dispatch(getCartThunkAction());
    } catch (err) {
      throw handleError(err);
    }
  }
);

export const { reducer: cartReducer, actions: cartActions } = createSlice({
  initialState: () => ({
    cart: null,
    openCart: false,
  }),
  name: "cart",
  reducers: {
    toggleCartDrawer(state, action) {
      state.openCart = action.payload;
    },
    setCart(state, action) {
      state.cart = action.payload;
    },
  },
  extraReducers: (bluider) => {},
});
