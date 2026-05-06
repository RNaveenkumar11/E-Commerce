import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signupUser } from '../services/api';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [flag, setFlag] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setFlag(true);
      setError("Passwords do not match");
      return;
    }

    signupUser({
      name: formData.name,
      email: formData.email,
      password: formData.password
    })
      .then((result) => {
        if (result.data.message === "User already exists") {
          setFlag(true);
          setError("User already exists");
        } else if (result.data.message === "User created successfully") {
          setFlag(false);
          setError("Account created successfully");
          setTimeout(() => navigate('/login'), 1500);
        }
      })
      .catch(() => {
        setFlag(true);
        setError("Server error");
      });

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">

      <div className="row shadow-lg rounded overflow-hidden" style={{ maxWidth: "950px", width: "100%" }}>


        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-success text-white p-4">
          <h1 className="fw-bold">Shopify</h1>
          <p className="text-center">
            Create your account and start shopping today!
          </p>
        </div>


        <div className="col-md-6 bg-white p-5">
          <h3 className="text-center mb-4">Create Account</h3>

          {error && flag && <div className="alert alert-danger">{error}</div>}
          {error && !flag && <div className="alert alert-success">{error}</div>}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

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
                placeholder="Create a password"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Register
            </button>

          </form>

          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => navigate('/login')}
              >
                Login
              </span>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Signup;