import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { useState } from "react";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { getCartAPI, addToCartAPI } from "./services/api";


export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = async (product) => {
    const qty = product.quantity || 1;

    await addToCartAPI({
      productId: product._id,
      quantity: qty
    });


    const res = await getCartAPI();

    const formatted = res.data.map((item) => ({
      ...item.productId,
      quantity: item.quantity
    }));

    setCart(formatted);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getCartAPI().then((res) => {
        const formatted = res.data.map((item) => ({
          ...item.productId,
          quantity: item.quantity
        }));

        setCart(formatted);
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        


        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        >

          <Route index element={<Home addToCart={addToCart} />} />
          <Route path="home" element={<Home addToCart={addToCart} />} />
          <Route path="cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="product/:id" element={<ProductDetails addToCart={addToCart} />} />

          <Route
            path="admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}