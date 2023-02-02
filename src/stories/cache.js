import { createSlice } from "@reduxjs/toolkit";

export const { reducer: cacheReducer, actions: cacheActions } = createSlice({
  name: "cache",
  initialState: {},
  reducers: {
    setCache(state, action) {
      for (let i in action.payload) {
        state[i] = action.payload[i];
      }
    },
    removeCache(state, action) {
      state[action.payload] = undefined;
    },
    clearCache(state) {
      return {};
    },
  },
});
