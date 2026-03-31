import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import type { RootState } from "../store";
import { setCart,clearCart } from "../store/slices/cartSlice";

const MainLayout = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      dispatch(clearCart());
      return;
    }
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/carts`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        dispatch(setCart(res.data.cart.items));
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [token, dispatch]);
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
