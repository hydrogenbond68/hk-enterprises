import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import Checkout from './components/Checkout';

import Context from "./Context";
import productsData from './products.json';

// Layout component for common UI elements
const MainLayout = () => (
  <>
    <Header />
    <Outlet /> {/* Renders child routes */}
    <Footer />
  </>
);

// Protected Route wrapper for admin/user areas
const PrivateRoute = ({ children, isAdmin = false }) => {
  const { user } = React.useContext(Context);
  if (!user) return <Navigate to="/login" />;
  if (isAdmin && user.accessLevel !== 0) return <Navigate to="/" />;
  return children;
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: productsData,
      categories: ["cyber_services", "stationery", "electrical_gadgets"]
    };
    this.routerRef = React.createRef();
  }

  componentDidMount() {
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");
    user = user ? JSON.parse(user) : null;
    cart = cart ? JSON.parse(cart) : {};
    this.setState({ user, cart });
  }

  login = async (email, password) => {
    if (email === 'admin@hk.com' && password === 'password') {
      const user = { email, accessLevel: 0 }; // Admin
      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else if (email && password) {
      const user = { email, accessLevel: 1 }; // User
      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
    return false;
  };

  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  addToCart = cartItem => {
    let cart = { ...this.state.cart };
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cartItem.stock && cart[cartItem.id].amount > cartItem.stock) {
      cart[cartItem.id].amount = cartItem.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = cartItemId => {
    let cart = { ...this.state.cart };
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    localStorage.removeItem("cart");
    this.setState({ cart: {} });
  };

  addProduct = (product) => {
    let products = [...this.state.products];
    product.id = products.length + 1;
    products.push(product);
    this.setState({ products });
  };

  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }
    alert("Checkout complete!");
    this.clearCart();
  };

  filterProducts = (category) => {
    return this.state.products.filter(p => p.category === category);
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout,
          filterProducts: this.filterProducts
        }}
      >
        <Router ref={this.routerRef}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />

              <Route path="/products">
                <Route index element={<ProductList />} /> {/* All products */}
                <Route path=":category" element={<ProductList />} /> {/* Filtered by category */}
              </Route>

              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />

              {/* Admin-only routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute isAdmin={true}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/add-product"
                element={
                  <PrivateRoute isAdmin={true}>
                    <AddProduct />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </Context.Provider>
    );
  }
}
