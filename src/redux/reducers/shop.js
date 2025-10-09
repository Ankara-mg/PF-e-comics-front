import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingCart: [],
  purchases: []
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.shoppingCart = action.payload
    },
    addToStateCart: (state, action) => {
      state.shoppingCart.push(action.payload)
    },
    removeFromStateCart: (state, action) => {
      state.shoppingCart = state.shoppingCart.filter(c => c.id !== action.payload.id)
    },
    setPurchases: (state, action) => {
      state.purchases = action.payload
    },
    clearCartState: (state) => {
      state.shoppingCart = []
    },
  }
});

export const { setShoppingCart, addToStateCart, removeFromStateCart, setPurchases, clearCartState } = shopSlice.actions;
export default shopSlice.reducer;
