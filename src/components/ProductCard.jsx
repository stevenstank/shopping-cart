import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext';
import { toINR } from '../utils/currency';
import './ProductCard.css';

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  function handleDecrement() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function handleIncrement() {
    setQuantity((q) => q + 1);
  }

  function handleQuantityChange(e) {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) {
      setQuantity(val);
    }
  }

  function handleAddToCart() {
    addToCart(product, quantity);
    setQuantity(1);
  }

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">₹{toINR(product.price)}</p>
      </div>
      <div className="product-controls">
        <div className="quantity-control">
          <button onClick={handleDecrement} aria-label="Decrease quantity">-</button>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={handleQuantityChange}
            aria-label="Quantity"
          />
          <button onClick={handleIncrement} aria-label="Increase quantity">+</button>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
