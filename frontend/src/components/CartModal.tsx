import CartProductCard from "./CartProductCard";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectTotalPrice } from "../store";

const CartModal = ({ onClose }: { onClose: () => void }) => {
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const taxRate = 0;
//   const [taxRate, setTaxRate] = useState(0);
  const items = useSelector((state: RootState) => state.cart.items);

  const subtotal = useSelector(selectTotalPrice);
  const afterDiscount = subtotal - discount;
  const tax = afterDiscount * taxRate;
  const estimatedTotal = (subtotal - discount) * (1 + taxRate);

  const handleClickApply = async () => {
    // fetch and validate discountCode
    // const res = await axios 

    setDiscount(100);
    console.log("Click Apply");
  };

  const handleClickCheckout = () => {
    console.log("Click Checkout");
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Cart <span className="cart-count">({items.length})</span></h2>
          <button className="cart-close" onClick={onClose}>&times;</button>
        </div>
        <div className="cart-items">
          {items.map((item) => (
            <CartProductCard key={item.productId._id} product={item.productId} />
          ))}
        </div>
        <div className="cart-discount">
          <p>Apply Discount Code</p>
          <div className="cart-discount-row">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="20 DOLLAR OFF"
            />
            <button className="cart-apply-btn" onClick={handleClickApply}>Apply</button>
          </div>
        </div>
        <div className="cart-summary">
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>  
          <div className="cart-summary-row cart-total">
            <span>Estimated total</span>
            <span>${estimatedTotal.toFixed(2)}</span>
          </div>
          <button className="cart-checkout-btn" onClick={handleClickCheckout}>Continue to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
