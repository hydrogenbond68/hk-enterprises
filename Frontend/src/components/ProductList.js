import React, { useContext, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Context from "../Context";

function ProductList() {
  const { products, filterProducts } = useContext(Context);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(new URLSearchParams(window.location.search).get('category') || '');

  useEffect(() => {
    if (category) {
      setFilteredProducts(filterProducts(category));
    } else {
      setFilteredProducts(products);
    }
  }, [category, products, filterProducts]);

  const handleSearch = e => {
    setSearch(e.target.value);
    setFilteredProducts(products.filter(p => p.title.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  return (
    <div>
      <input className="input" type="text" placeholder="Search products..." value={search} onChange={handleSearch} />
      <div className="columns is-multiline">
        {filteredProducts.map(product => (
          <div className="column is-one-third" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;