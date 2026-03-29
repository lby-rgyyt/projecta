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
    <div>
      <button onClick={onClose}>X</button>
      <div>
        {items.map((item) => {
          return (
            <CartProductCard
              key={item.productId._id}
              product={item.productId}
            />
          );
        })}
      </div>
      <div>
        <p>Apply Discount Code</p>
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <button onClick={handleClickApply}>Apply</button>
      </div>
      <div>
        <div>
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div>
          <span>Discount</span>
          <span>-${discount}</span>
        </div>
        <div>
          <span>Tax</span>
          <span>${tax}</span>
        </div>
        <div>
          <span>Estimated total</span>
          <span>${estimatedTotal}</span>
        </div>
        <button onClick={handleClickCheckout}>Continue to checkout</button>
      </div>
    </div>
  );
};

export default CartModal;
