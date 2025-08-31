import React, { useState, useContext } from "react";
import Context from "../Context";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("stationery");
  const [stock, setStock] = useState(0);
  const [bookable, setBookable] = useState(false);
  const { addProduct } = useContext(Context);

  const handleSubmit = e => {
    e.preventDefault();
    addProduct({ title, description, price, image, category, stock: bookable ? null : stock, bookable });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label>Title</label>
        <input className="input" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="field">
        <label>Description</label>
        <textarea className="textarea" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div className="field">
        <label>Price</label>
        <input className="input" type="number" value={price} onChange={e => setPrice(parseFloat(e.target.value))} />
      </div>
      <div className="field">
        <label>Image URL</label>
        <input className="input" value={image} onChange={e => setImage(e.target.value)} />
      </div>
      <div className="field">
        <label>Category</label>
        <div className="select">
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="cyber_services">Cyber Services</option>
            <option value="stationery">Stationery</option>
            <option value="electrical_gadgets">Electrical Gadgets</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label>Stock (leave blank for services)</label>
        <input className="input" type="number" value={stock} onChange={e => setStock(parseInt(e.target.value))} disabled={bookable} />
      </div>
      <div className="field">
        <label>
          <input type="checkbox" checked={bookable} onChange={e => setBookable(e.target.checked)} />
          Bookable Service
        </label>
      </div>
      <button className="button is-primary" type="submit">Add Product</button>
    </form>
  );
}

export default AddProduct;