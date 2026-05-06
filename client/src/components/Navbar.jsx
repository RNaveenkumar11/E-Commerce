import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const role = localStorage.getItem("role") || "{}";
  const isAdmin = role?.toLowerCase() === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/app">Shopify</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/app">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/app/cart">Cart</Link>
          </li>

          
          {isAdmin && (
            <li className="nav-item">
              <Link className="nav-link" to="/app/admin">Admin</Link>
            </li>
          )}

          {isLoggedIn ? (
            <li className="nav-item">
              <button className="btn btn-danger ms-3" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}

        </ul>
      </div>
    </nav>
  );
}