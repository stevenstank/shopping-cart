import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import './Cart.css';

function Cart() {
  const { cartItems, totalItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="cart cart-empty">
        <h1>Your cart is empty</h1>
        <Link to="/shop" className="cart-back-link">Go to Shop</Link>
      </main>
    );
  }

  return (
    <main className="cart">
      <h1 className="cart-heading">Your Cart ({totalItems} items)</h1>
      <div className="cart-list">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="cart-summary">
        <p className="cart-total">Total: ${total.toFixed(2)}</p>
      </div>
    </main>
  );
}

export default Cart;
