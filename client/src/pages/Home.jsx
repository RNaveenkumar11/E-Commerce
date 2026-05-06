import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  
  const loadProducts = (query = "") => {
    getProducts(query).then((res) => setProducts(res.data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      loadProducts(search);
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div>
      
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      
      <div className="row">
        {products.length > 0 ? (
          products.map((p) => (
            <ProductCard key={p._id} product={p} addToCart={addToCart} />
          ))
        ) : (
          <p className="text-center">No products found</p>
        )}
      </div>
    </div>
  );
}