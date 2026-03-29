import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../hooks/useCart";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { cartItem, handleAdd, handleIncrease, handleDecrease } =
    useCart(product);

  const role = useSelector((state: RootState) => state.auth.user?.role);

  return (
    <div>
      <Link to={`/products/${product._id}`}>
        {product.image.length > 0 ? (
          <img src={product.image[0]} alt={product.name} />
        ) : (
          <p>No image</p>
        )}
        <p>{product.name}</p>
      </Link>
      <p>${product.price}</p>
      {cartItem ? (
        <div>
          <button onClick={() => handleDecrease()}>-</button>
          <span>{cartItem.quantity}</span>
          <button onClick={() => handleIncrease()}>+</button>
        </div>
      ) : (
        <button onClick={() => handleAdd()}>Add</button>
      )}
      {role === "vendor" && (
        <Link to={`/products/edit/${product._id}`}>Edit</Link>
      )}
    </div>
  );
};

export default ProductCard;
