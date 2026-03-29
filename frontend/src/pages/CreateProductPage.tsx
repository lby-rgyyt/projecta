import { useState } from "react";
import type { SubmitEvent } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../store/slices/authSlice";

const CreateProductPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [previewUrl, setPreviewUrl] = useState("");

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
  };

  const handleUpload = () => {
    setPreviewUrl(imageUrl);
  };
  return (
    <div>
      Create Product
      <form onSubmit={handleSubmit}>
        <div>
          Product name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          Product Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Category1">Category1</option>
            <option value="Category2">Category2</option>
          </select>
        </div>
        <div>
          Price
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          In Stock Quantity
          <input
            type="number"
            min={0}
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
          />
        </div>
        <div>
          Add Image Link
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button type="button" onClick={handleUpload}>
            Upload
          </button>
        </div>
        <div>
          {previewUrl ? (
            <img src={previewUrl} alt="preview" />
          ) : (
            <p>image preview!</p>
          )}
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default CreateProductPage;
