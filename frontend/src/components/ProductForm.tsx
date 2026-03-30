import axios from "axios";
import { useState, useEffect } from "react";
import type { SubmitEvent } from "react";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

import "../styles/ProductForm.css";

const ProductForm = ({
  mode,
  id,
}: {
  mode: "create" | "edit";
  id?: string;
}) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        );
        const p = res.data.product;
        setName(p.name);
        setDescription(p.description);
        setCategory(p.category);
        setPrice(p.price);
        setInventory(p.inventory);
        const firstImage = p.image?.[0] ?? "";
        setImageUrl(firstImage);
        setPreviewUrl(firstImage);
      } catch (err) {
        console.log(err);
      }
    };
    if (mode !== "edit" || !id) {
      return;
    }
    fetchProduct();
  }, [mode, id]);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Number(price) < 0) {
      alert("Price must be at least 0");
      return;
    }
    if (Number(inventory) < 0) {
      alert("Inventory must be at least 0");
      return;
    }
    if (!name.trim()) {
      alert("Product name is required");
      return;
    }
    console.log({ name, description, category, price, inventory, imageUrl });
    const payload = {
      name: name.trim(),
      description,
      category,
      price: Number(price),
      inventory: Number(inventory),
      image: imageUrl ? [imageUrl] : [],
    };
    try {
      if (mode === "create") {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/products`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const newProductId = res.data.product._id;
        navigate(`/products/${newProductId}`);
      } else {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        navigate(`/products/${id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = () => {
    setPreviewUrl(imageUrl);
  };
  if (!token) {
    return;
  }

  return (
    <div className="product-page">
      <h1 className="product-page-title">
        {mode === "create" ? "Create Product" : "Edit Product"}
      </h1>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Product Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Category1">Category1</option>
              <option value="Category2">Category2</option>
            </select>
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>In Stock Quantity</label>
            <input
              type="number"
              min={0}
              value={inventory}
              onChange={(e) => setInventory(Number(e.target.value))}
            />
          </div>
          <div className="form-group form-group-image">
            <label>Add Image Link</label>
            <div className="image-input">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="http://"
              />
              <button
                type="button"
                className="upload-btn"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
        <div className="image-preview">
          {previewUrl ? (
            <img src={previewUrl} alt="preview" />
          ) : (
            <p>image preview!</p>
          )}
        </div>
        <button type="submit" className="product-submit-btn">
          {mode === "create" ? "Add Product" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
