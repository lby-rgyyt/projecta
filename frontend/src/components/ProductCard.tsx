import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../hooks/useCart";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

import "../styles/ProductCard.css";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { cartItem, handleAdd, handleIncrease, handleDecrease } =
    useCart(product);

  const role = useSelector((state: RootState) => state.auth.user?.role);

  return (
    <div className="card">
      <Link className="card-link" to={`/products/${product._id}`}>
        {product.image.length > 0 ? (
          <img className="card-image" src={product.image[0]} alt={product.name} />
        ) : (
          <div className="card-no-image">No image</div>
        )}
      </Link>
      <div className="card-body">
        <p className="card-name">{product.name}</p>
        <p className="card-price">${product.price.toFixed(2)}</p>
        <div className="card-actions">
          {cartItem ? (
            <div className="card-qty">
              <button onClick={() => handleDecrease()}>–</button>
              <span>{cartItem.quantity}</span>
              <button onClick={() => handleIncrease()}>+</button>
            </div>
          ) : (
            <button className="card-add-btn" onClick={() => handleAdd()}>Add</button>
          )}
          {role === "vendor" && (
            <Link className="card-edit-btn" to={`/products/edit/${product._id}`}>Edit</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
