import { Link } from "react-router-dom";
import noImage from "../assets/no.png"


export default function ProductCard({ product, addToCart }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={product.image}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">₹{product.price}</p>
          <div className="d-flex justify-content-between">
            <Link to={`/app/product/${product._id}`} className="btn btn-primary btn-sm">View</Link>
            <button className="btn btn-success btn-sm" onClick={() => addToCart(product)}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
