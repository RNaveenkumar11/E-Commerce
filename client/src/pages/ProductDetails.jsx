import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../services/api";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/no.png"

export default function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  useEffect(() => {
    getProduct(id)
      .then((res) => setProduct(res.data))
      .catch(() => console.log("Error loading product"));
  }, [id]);

  if (!product) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4">

      <div className="row align-items-center">


        <div className="col-md-6 text-center">
          <img
            src={product.image}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>


        <div className="col-md-6">
          <h2 className="mb-3">{product.name}</h2>

          <p className="text-muted">
            {product.description || "No description available"}
          </p>

          <h3 className="text-success mb-3">₹ {product.price}</h3>

          <div className="d-flex align-items-center mb-3">
            <button className="btn btn-outline-secondary" onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
            <span className="mx-3">{qty}</span>
            <button className="btn btn-outline-secondary" onClick={() => setQty(qty + 1)}>+</button>
          </div>

          <button
            className="btn btn-success"
            onClick={() => {
              addToCart({ ...product, quantity: qty })
              setAdded(true)
            }}

          >
            Add to Cart
          </button>
          <button
            className="btn btn-secondary mx-5 "
            onClick={() => navigate("/app/home")}
          >
            ← Back to Shop
          </button>
        </div>



      </div>
      {added && <div className="alert alert-success mt-2">Added to cart!</div>}
    </div>
  );
}
