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
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const [previewUrl, setPreviewUrl] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Product name is required";
    if (!description.trim()) newErrors.description = "Product description is required";
    if (price === "" || Number(price) < 0 || isNaN(Number(price))) newErrors.price = "Price must be a number and at least 0";
    if (Number(inventory) < 0)
      newErrors.inventory = "Inventory must be at least 0";
    if (!imageUrl.trim()) newErrors.imageUrl = "Image link is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!validate()) return;
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
            className={errors.name ? "input-error" : ""}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Product Description</label>
          <textarea
            value={description}
            className={errors.description ? "input-error" : ""}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <span className="error-msg">{errors.description}</span>}
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
              step="0.01"
              value={price}
              className={errors.price ? "input-error" : ""}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <span className="error-msg">{errors.price}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>In Stock Quantity</label>
            <input
              type="number"
              min={0}
              value={inventory}
              className={errors.inventory ? "input-error" : ""}
              onChange={(e) => setInventory(Number(e.target.value))}
            />
            {errors.inventory && (
              <span className="error-msg">{errors.inventory}</span>
            )}
          </div>
          <div className="form-group form-group-image">
            <label>Add Image Link</label>
            <div className="image-input">
              <input
                type="text"
                value={imageUrl}
                className={errors.imageUrl ? "input-error" : ""}
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
            {errors.imageUrl && (
              <span className="error-msg">{errors.imageUrl}</span>
            )}
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
