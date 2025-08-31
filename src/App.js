import React, { Component } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"; // Updated import: Routes instead of Switch
//import axios from 'axios';
//import jwt_decode from 'jwt-decode';

import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';

import Context from "./Context";
import productsData from './products.json';

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

  // ... (Keep the rest of the methods like componentDidMount, login, logout, etc., unchanged)

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
          <div className="container">
            <Header logout={this.logout} />
            <Routes> {/* Replaced Switch with Routes */}
              <Route exact path="/" element={<HomePage />} /> {/* Use element prop */}
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/addproduct" element={<AddProduct />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </Context.Provider>
    );
  }
}