import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Context from "../Context";

function ProductDetails() {
  const { id } = useParams();
  const { products, addToCart } = useContext(Context);
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) return <div>Product not found</div>;

  const handleAdd = () => {
    addToCart({ ...product, amount: quantity });
  };

  return (
    <div className="columns">
      <div className="column">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="column">
        <h1 className="title">{product.title}</h1>
        <p>{product.description}</p>
        <p className="subtitle">${product.price}</p>
        {product.bookable ? (
          <button className="button is-primary">Book Service</button> // Extend with calendar
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
      </div>
    </div>
  );
}

export default ProductDetails;