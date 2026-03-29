import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import type { Product } from "../types";

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    const fecthProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products?page=${currentPage}&limit=10&sort=${sortBy}`,
        );
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.log(err);
      }
    };
    fecthProducts();
  }, [currentPage, sortBy]);

  return (
    <div>
      <div>
        <p>Products</p>
        <div>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="latest">Last added</option>
            <option value="price_asc">Price: low to high</option>
            <option value="price_desc">Price: high to low</option>
          </select>
          <Link to="/products/create">AddProduct</Link>
        </div>
      </div>
      <div>
        {products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
      <div>
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default ProductListPage;
