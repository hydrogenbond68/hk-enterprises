import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from "../Context";

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(Context);

  const handleAdd = () => {
    addToCart({ ...product, amount: quantity });
  };

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={product.image} alt={product.title} />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{product.title}</p>
            <p className="subtitle is-6">Ksh{product.price}</p>
            <p>{product.description.substring(0, 100)}...</p>
            <span className="tag">{product.category}</span>
          </div>
        </div>
        <div className="content">
          {product.bookable ? (
            <Link to={`/product/${product.id}`} className="button is-primary">Book Now</Link>
          ) : (
            <>
              <div className="field has-addons">
                <button className="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input className="input" type="number" value={quantity} readOnly />
                <button className="button" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="button is-primary" onClick={handleAdd}>Add to Cart</button>
            </>
          )}
          <Link to={`/product/${product.id}`} className="button is-link">Details</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;