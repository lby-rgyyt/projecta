import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import type { Product } from "../types";
import { useCart } from "../hooks/useCart";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
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
        console.log(err);
      }
    };

    fetchProdcut();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      Product Detail
      <div>
        {product.image.length > 0 ? (
          <img src={product.image[0]} alt={product.name} />
        ) : (
          <p>No image</p>
        )}
      </div>
      <div>
        <p>{product.category}</p>
        <div>
          <p>{product.price}</p>
          {product.inventory === 0 ? (
            <p>Out of Stock</p>
          ) : (
            <p>{product.inventory}</p>
          )}
        </div>
        <p>{product.description}</p>
      </div>
      <div>
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
    </div>
  );
};

export default ProductDetailPage;
