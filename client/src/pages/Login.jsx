import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { loginUser } from "../services/api.js";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    setError("");

    loginUser(formData)
      .then((result) => {
        if (result.data.message === "Login successful") {
          localStorage.setItem("token", result.data.token || "dummy");
          localStorage.setItem("role", result.data.role);
          navigate('/app/home'); // updated route
        } else if (result.data.message === "Invalid password") {
          setError("Incorrect Password");
        } else {
          setError("User not found");
        }
      })
      .catch(() => setError("Server error"));
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">

      <div className="row shadow-lg rounded overflow-hidden" style={{ maxWidth: "900px", width: "100%" }}>


        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-primary text-white p-4">
          <h1 className="fw-bold">Shopify</h1>
          <p className="text-center">
            Discover the best products at unbeatable prices.
          </p>
        </div>


        <div className="col-md-6 bg-white p-5">
          <h3 className="text-center mb-4">Login to your account</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>



            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <p>
              Don't have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;