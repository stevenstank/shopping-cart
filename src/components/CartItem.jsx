import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext';
import './CartItem.css';

function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  function handleDecrement() {
    if (item.quantity === 1) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  }

  function handleIncrement() {
    updateQuantity(item.id, item.quantity + 1);
  }

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} className="cart-item-image" />
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
        <div className="cart-item-controls">
          <button onClick={handleDecrement} aria-label="Decrease quantity">-</button>
          <span className="cart-item-quantity">{item.quantity}</span>
          <button onClick={handleIncrement} aria-label="Increase quantity">+</button>
        </div>
      </div>
      <p className="cart-item-subtotal">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
