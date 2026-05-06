import { useEffect } from "react";
import { getCartAPI, updateCartAPI, removeCartAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart, setCart }) {

  const navigate = useNavigate();


  const reloadCart = async () => {
    try {
      const res = await getCartAPI();

      const formatted = res.data.map((item) => ({
        ...item.productId,
        quantity: item.quantity
      }));

      setCart(formatted);
    } catch (err) {
      console.log("Error loading cart", err);
    }
  };


  useEffect(() => {
    reloadCart();
  }, []);


  const increaseQty = async (id, qty) => {
    await updateCartAPI({ productId: id, quantity: qty + 1 });
    reloadCart();
  };


  const decreaseQty = async (id, qty) => {
    if (qty === 1) {
      await removeCartAPI(id);
    } else {
      await updateCartAPI({ productId: id, quantity: qty - 1 });
    }
    reloadCart();
  };


  const removeItem = async (id) => {
    await removeCartAPI(id);
    reloadCart();
  };


  const handlePlaceOrder = async () => {
    await Promise.all(cart.map(item => removeCartAPI(item._id)));
    setCart([]);
    alert("Order placed successfully!");
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center">
          <p>No items in cart</p>
          <button className="btn btn-primary" onClick={() => navigate("/app/home")}>
            Shop More
          </button>
        </div>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li
                key={item._id}
                className="list-group-item d-flex align-items-center justify-content-between"
              >
                {/* LEFT */}
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={`https://e-commerce-backend-lasw.onrender.com/uploads/${item.image}`}
                    width="60"
                    height="60"
                    style={{ objectFit: "cover", borderRadius: "5px" }}
                  />

                  <div>
                    <h6 className="mb-1">{item.name}</h6>
                    <small>₹{item.price}</small>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => decreaseQty(item._id, item.quantity)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => increaseQty(item._id, item.quantity)}
                  >
                    +
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>


          <div className="card p-3 shadow-sm">
            <h4>Total: ₹{total}</h4>

            <button
              className="btn btn-success mt-2"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
