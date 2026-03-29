import { Link} from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../hooks/useCart";

interface Props {
    product: Product;
  }

const CartProductCard = ({ product }:Props) => {
  const { cartItem, handleRemove, handleIncrease, handleDecrease } =
    useCart(product);
  return <div>
    <Link to={`/products/${product._id}`}>
        {product.image.length > 0 ? (
          <img src={product.image[0]} alt={product.name} />
        ) : (
          <p>No image</p>
        )}
        <p>{product.name}</p>
      </Link>
      <p>${product.price}</p>
      <div>
          <button onClick={() => handleDecrease()}>-</button>
          <span>{cartItem!.quantity}</span>
          <button onClick={() => handleIncrease()}>+</button>
        </div>
        <button onClick={() => handleRemove()}>+</button>
  </div>;
};

export default CartProductCard;
