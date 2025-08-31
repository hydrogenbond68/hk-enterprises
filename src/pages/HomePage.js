import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from "../Context";
import ProductCard from '../components/ProductCard';

function HomePage() {
  const { products, categories } = useContext(Context);
  const featured = products.slice(0, 3); // Mock featured

  return (
    <div>
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">Welcome to HK</p>
          <p className="subtitle">Your Hub for Cyber Services, Stationery, and Gadgets</p>
        </div>
      </section>
      <section className="section">
        <h2 className="title">Categories</h2>
        <div className="columns">
          {categories.map(cat => (
            <div className="column" key={cat}>
              <Link to={`/products?category=${cat}`}>{cat.replace('_', ' ').toUpperCase()}</Link>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <h2 className="title">Featured Products</h2>
        <div className="columns">
          {featured.map(product => (
            <div className="column is-one-third" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;