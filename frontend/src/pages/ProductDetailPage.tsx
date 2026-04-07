import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import type { Product } from "../types";
import { useCart } from "../hooks/useCart";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

import "../styles/ProductDetail.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  const [error, setError] = useState("");

  const { cartItem, handleAdd, handleIncrease, handleDecrease } = useCart(
    product ?? {
        _id: "",
        name: "",
        price: 0,
        image: [],
        description: "",
        category: "",
        inventory: 0,
      },
  );

  const role = useSelector((state: RootState) => state.auth.user?.role);

  useEffect(() => {
    const fetchProdcut = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        );
        setProduct(res.data.product);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message);
        } else {
          alert("Failed to load product");
          setError("Failed to load product");
        }
      }
    };

    fetchProdcut();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="detail-page">
      <h1 className="detail-page-title">Products Detail</h1>
      <div className="detail-card">
        <div className="detail-image">
          {product.image.length > 0 ? (
            <img src={product.image[0]} alt={product.name} />
          ) : (
            <p>No image</p>
          )}
        </div>
        <div className="detail-info">
          <p className="detail-category">{product.category}</p>
          <h2 className="detail-name">{product.name}</h2>
          <div className="detail-price-row">
            <span className="detail-price">${product.price}</span>
            {product.inventory === 0 ? (
              <span className="detail-stock out">Out of Stock</span>
            ) : (
              <span className="detail-stock in">
                In Stock: {product.inventory}
              </span>
            )}
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-actions">
            {cartItem ? (
              <div className="detail-qty">
                <button onClick={() => handleDecrease()}>-</button>
                <span>{cartItem.quantity}</span>
                <button onClick={() => handleIncrease()}>+</button>
              </div>
            ) : (
              <button className="detail-add-btn" onClick={() => handleAdd()}>
                Add To Cart
              </button>
            )}
            {role === "vendor" && (
              <Link
                className="detail-edit-btn"
                to={`/products/edit/${product._id}`}
              >
                Edit
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
