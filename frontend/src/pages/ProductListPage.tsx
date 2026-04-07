import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import type { Product } from "../types";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

import "../styles/ProductList.css";

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sort") || "latest";

  const [error, setError] = useState("");

  const role = useSelector((state: RootState) => state.auth.user?.role);

  useEffect(() => {
    const fecthProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products?page=${currentPage}&limit=10&sort=${sortBy}`,
        );
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message);
        } else {
          alert("Failed to load product");
          setError("Failed to load products");
        }
      }
    };
    fecthProducts();
  }, [currentPage, sortBy]);

  if (error) return <p>{error}</p>;

  return (
    <div className="list-page">
      <div className="list-header">
        <h1 className="list-title">Products</h1>
        <div className="list-controls">
          <select
            className="list-sort"
            value={sortBy}
            onChange={(e) =>
              setSearchParams({ page: "1", sort: e.target.value })
            }
          >
            <option value="latest">Last added</option>
            <option value="price_asc">Price: low to high</option>
            <option value="price_desc">Price: high to low</option>
          </select>
          {role === "vendor" && (
            <Link className="list-add-btn" to="/products/create">
              Add Product
            </Link>
          )}
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() =>
            setSearchParams({ page: String(currentPage - 1), sort: sortBy })
          }
          disabled={currentPage === 1}
        >
          «
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={page === currentPage ? "active" : ""}
            onClick={() =>
              setSearchParams({ page: String(page), sort: sortBy })
            }
          >
            {page}
          </button>
        ))}
        <button
          onClick={() =>
            setSearchParams({ page: String(currentPage + 1), sort: sortBy })
          }
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default ProductListPage;
