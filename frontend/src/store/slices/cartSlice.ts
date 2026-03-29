import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
    productId: {
        _id: string
        name: string
        price: number
        image: string[]
      }
  quantity: number;
}
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});
export const { setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
