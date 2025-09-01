import React, { useState, useContext } from 'react';
import Context from "../Context";
import axios from 'axios';

const Checkout = () => {
  const { cart, clearCart, user } = useContext(Context);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const total = Object.values(cart).reduce((acc, item) => acc + item.price * item.amount, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/initiate-payment', { phone: `254${phone.slice(1)}`, amount: total }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('STK Push sent! Enter PIN on phone.');
      clearCart();
    } catch (err) {
      alert('Payment initiation failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h2 className="title">Checkout</h2>
      <p>Total: Ksh{total.toFixed(2)}</p>
      <div className="field">
        <label className="label">M-Pesa Phone Number (07xxxxxxxx)</label>
        <input className="input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="07xxxxxxxx" />
      </div>
      <button className="button is-primary" onClick={handleCheckout} disabled={loading}>Pay with M-Pesa</button>
    </div>
  );
};

export default Checkout;