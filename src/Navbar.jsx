import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session
    navigate("/login", { replace: true }); // Redirect to login
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">🏠 RealEstate</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/buyer">Buy</Link></li>
        <li><Link to="/seller">Sell</Link></li>
        {user && <li><Link to="/profile">Profile</Link></li>}
      </ul>
      <div className="nav-right">
        {user ? (
          <>
            <span className="username">👤 {user.name}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="login-button" onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
