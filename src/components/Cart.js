import React, { useContext } from "react";
import Context from "../Context";

function Cart() {
  const { cart, removeFromCart, checkout } = useContext(Context);
  const cartItems = Object.values(cart);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.amount, 0);

  return (
    <div>
      <h1 className="title">Shopping Cart</h1>
      {cartItems.map(item => (
        <div key={item.id} className="box">
          <p>{item.title} - ${item.price} x {item.amount}</p>
          <button className="button is-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <p className="subtitle">Total: ${total.toFixed(2)}</p>
      <button className="button is-success" onClick={checkout}>Checkout</button>
    </div>
  );
}

export default Cart;