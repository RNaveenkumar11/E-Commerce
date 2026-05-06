import { useEffect, useState } from "react";
import API from "../services/api";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null
  });

  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");


  const load = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch {
      setMessage("Failed to load products");
    }
  };

  useEffect(() => {
    load();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("price", form.price);
      data.append("description", form.description);
      if (form.image) data.append("image", form.image);

      if (editId) {
        await API.put(`/products/${editId}`, data);
        setMessage("Product updated successfully");
      } else {
        await API.post("/products", data);
        setMessage("Product added successfully");
      }

      setForm({
        name: "",
        price: "",
        description: "",
        image: null
      });
      setEditId(null);
      load();

    } catch (err) {
      setMessage(err.response?.data?.message || "Action failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      setMessage("Product deleted");
      load();
    } catch (err) {
      setMessage(err.response?.data?.message || "Delete failed");
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description || "",
      image: null
    });
    setEditId(product._id);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Admin Panel</h2>


      {message && (
        <div className="alert alert-info">{message}</div>
      )}


      <form onSubmit={handleSubmit} className="row g-2 mb-4">
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            type="file"
            className="form-control"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />
        </div>

        <div className="col-md-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <div className="col-md-3">
          <button className="btn btn-primary w-100">
            {editId ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>


      <div className="row">
        {products.map((p) => (
          <div key={p._id} className="col-md-4 mb-3">
            <div className="card shadow-sm">

              <img
                src={`https://e-commerce-backend-lasw.onrender.com/uploads/${product.image}`}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/300")
                }
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5>{p.name}</h5>
                <p>₹ {p.price}</p>

                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
