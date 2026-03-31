import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../hooks/useCart";

import "../styles/CartModal.css";

interface Props {
  product: Product;
}

const CartProductCard = ({ product }: Props) => {
  const { cartItem, handleRemove, handleIncrease, handleDecrease } =
    useCart(product);

  if (!cartItem) return;
  return (
    <div className="cart-item">
      <Link className="cart-item-image" to={`/products/${product._id}`}>
        {product.image.length > 0 ? (
          <img src={product.image[0]} alt={product.name} />
        ) : (
          <p>No image</p>
        )}
      </Link>
      <div className="cart-item-info">
        <div className="cart-item-top">
          <p className="cart-item-name">{product.name}</p>
          <p className="cart-item-price">${product.price.toFixed(2)}</p>
        </div>
        <div className="cart-item-bottom">
          <div className="cart-item-qty">
            <button onClick={() => handleDecrease()}>–</button>
            <span>{cartItem.quantity}</span>
            <button onClick={() => handleIncrease()}>+</button>
          </div>
          <button className="cart-item-remove" onClick={() => handleRemove()}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
