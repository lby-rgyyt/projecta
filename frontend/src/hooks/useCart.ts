import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { RootState } from "../store";
import { setCart } from "../store/slices/cartSlice";
import type { Product, CartItem } from "../types";

export const useCart = (product: Product) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.cart.items);
  const token = useSelector((state: RootState) => state.auth.token);
  const cartItem = items.find((item) => item.productId._id === product._id);

  const updateCart = async (newItems: CartItem[]) => {
    // cart model only has productId
    const toBackend = newItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    // update backend api, get the updated cart
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/carts`,
      { items: toBackend },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    dispatch(setCart(res.data.cart.items));
  };

  const handleAdd = async () => {
    if (!token) {
      navigate("/signin");
      return;
    }
    const newItems = [
      ...items,
      {
        productId: product,
        quantity: 1,
      },
    ];
    try {
      await updateCart(newItems);
    } catch (err) {
      console.error(err);
    }
  };

  const handleIncrease = async () => {
    if (!token) return;
    const newItems = items.map((item) =>
      item.productId._id === product._id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
    try {
      await updateCart(newItems);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecrease = async () => {
    if (!token) return;
    const newItems = items
      .map((item) =>
        item.productId._id === product._id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      )
      .filter((item) => item.quantity > 0);
    try {
      await updateCart(newItems);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async () => {
    if (!token) return;
    const newItems = items.filter((item) => item.productId._id !== product._id);
    try {
      await updateCart(newItems);
    } catch (err) {
      console.error(err);
    }
  };
  return { cartItem, handleAdd, handleIncrease, handleDecrease, handleRemove };
};
