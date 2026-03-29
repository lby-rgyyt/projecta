import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export const selectTotalPrice = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
