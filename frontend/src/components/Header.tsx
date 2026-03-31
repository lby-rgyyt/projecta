import { useSelector, useDispatch } from "react-redux";
import { signout } from "../store/slices/authSlice";
import { clearCart } from "../store/slices/cartSlice";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import type { RootState } from "../store";
import { selectTotalPrice } from "../store";
import CartModal from "./CartModal";

import "../styles/Header.css";
import { LuCircleUser } from "react-icons/lu"; // 人物图标
import { FiShoppingCart } from "react-icons/fi"; // 购物车图标
import { FaStar } from "react-icons/fa"; // 黄色星星

const Header = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  // const items = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalPrice = useSelector(selectTotalPrice);

  const handleSignOut = () => {
    dispatch(clearCart());
    dispatch(signout());
    navigate("/signin");
  };
  return (
    <header className="site-header">
      <Link to="/" className="site-header__brand">
        <span className="site-header__brand-title brand-full">Management</span>
        <span className="site-header__brand-title brand-short">M</span>
        <span className="site-header__brand-sub">Chuwa</span>
      </Link>

      <nav className="header-actions">
        {token ? (
          <button className="header-action" onClick={handleSignOut}>
            <span className="header-icon-wrap">
              <LuCircleUser size={28} />
              <FaStar className="header-badge-star" size={12} color="#f5c518" />
            </span>
            <span className="header-action-text">Sign Out</span>
          </button>
        ) : (
          <Link to="/signin" className="header-action">
            <span className="header-icon-wrap">
              <LuCircleUser size={28} />
              <FaStar className="header-badge-star" size={12} color="#f5c518" />
            </span>
            <span className="header-action-text">Sign In</span>
          </Link>
        )}

        <button className="header-action" onClick={() => setIsCartOpen(true)}>
          <FiShoppingCart size={24} />${totalPrice.toFixed(2)}
        </button>

        {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
      </nav>
    </header>
  );
};
export default Header;
