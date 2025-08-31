import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../Context";

function Header() {
  const { cart, user, logout } = useContext(Context);
  const cartCount = Object.keys(cart).length;

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="/hk-logo.png" alt="HK Logo" /> {/* Add your logo */}
          HK Store
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/products?category=cyber_services">Cyber Services</Link>
          <Link className="navbar-item" to="/products?category=stationery">Stationery</Link>
          <Link className="navbar-item" to="/products?category=electrical_gadgets">Electrical Gadgets</Link>
        </div>
        <div className="navbar-end">
          <Link className="navbar-item" to="/cart">Cart ({cartCount})</Link>
          {user ? (
            <a className="navbar-item" onClick={logout}>Logout</a>
          ) : (
            <Link className="navbar-item" to="/login">Login</Link>
          )}
          {user && user.accessLevel === 0 && (
            <Link className="navbar-item" to="/addproduct">Admin Panel</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;