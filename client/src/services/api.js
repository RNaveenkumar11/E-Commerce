import axios from "axios";

const API = axios.create({
  baseURL: "https://e-commerce-backend-lasw.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});


export const loginUser = (data) => API.post("/auth/login", data);
export const signupUser = (data) => API.post("/auth/signup", data);

export const getProducts = (query = "") =>
  API.get(`/products?q=${query}`);

export const getProduct = (id) =>
  API.get(`/products/${id}`);



export const createProduct = (data) =>
  API.post("/products", data);

export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data);

export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);

export const getCartAPI = () => API.get("/cart");
export const addToCartAPI = (data) => API.post("/cart", data);
export const updateCartAPI = (data) => API.put("/cart", data);
export const removeCartAPI = (id) => API.delete(`/cart/${id}`);

export default API;
