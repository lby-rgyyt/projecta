import { useSelector, useDispatch } from "react-redux";
import { signout } from "../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import type { RootState } from '../store'
import { selectTotalPrice } from "../store";
import CartModal from "./CartModal";

const Header = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  // const items = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCartOpen,setIsCartOpen] = useState(false);

  const totalPrice = useSelector(selectTotalPrice)

  const handleSignOut = () => {
    dispatch(signout());
    navigate("/signin");
  };
  return (
    <header>
      <Link to="/">Management</Link>
      <nav>
        <Link to="/cart">Cart</Link>
        {token ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
        <button onClick={() => setIsCartOpen(true)}>Cart</button>
        {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
        <p>{totalPrice}</p>
      </nav>
    </header>
  );
};
export default Header;
