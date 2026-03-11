import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider, useCart } from '../context/CartContext';
import Cart from '../pages/Cart';

const mockCartItem = {
  id: 1,
  title: 'A Great Product',
  price: 25.0,
  image: 'https://example.com/product.jpg',
  quantity: 2,
};

function CartSeedWrapper({ items, children }) {
  const { addToCart } = useCart();

  useEffect(() => {
    items.forEach((item) => {
      addToCart(
        { id: item.id, title: item.title, price: item.price, image: item.image },
        item.quantity
      );
    });
  }, []);

  return children;
}

CartSeedWrapper.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  children: PropTypes.node.isRequired,
};

function renderCartWithItems(items = []) {
  return render(
    <MemoryRouter>
      <CartProvider>
        <CartSeedWrapper items={items}>
          <Cart />
        </CartSeedWrapper>
      </CartProvider>
    </MemoryRouter>
  );
}

function renderEmptyCart() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Cart />
      </CartProvider>
    </MemoryRouter>
  );
}

describe('Cart', () => {
  it('shows an empty state when the cart has no items', () => {
    renderEmptyCart();
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('shows a link to the shop when empty', () => {
    renderEmptyCart();
    expect(screen.getByRole('link', { name: /go to shop/i })).toBeInTheDocument();
  });

  it('renders cart items when items exist', async () => {
    renderCartWithItems([mockCartItem]);
    expect(await screen.findByText('A Great Product')).toBeInTheDocument();
  });

  it('displays the quantity of each item', async () => {
    renderCartWithItems([mockCartItem]);
    expect(await screen.findByText('2')).toBeInTheDocument();
  });

  it('increases item quantity when + is clicked', async () => {
    const user = userEvent.setup();
    renderCartWithItems([mockCartItem]);
    const incrementBtn = await screen.findByRole('button', { name: /increase quantity/i });
    await user.click(incrementBtn);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('decreases item quantity when - is clicked', async () => {
    const user = userEvent.setup();
    renderCartWithItems([mockCartItem]);
    const decrementBtn = await screen.findByRole('button', { name: /decrease quantity/i });
    await user.click(decrementBtn);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('removes item from cart when quantity reaches zero', async () => {
    const user = userEvent.setup();
    renderCartWithItems([{ ...mockCartItem, quantity: 1 }]);
    expect(await screen.findByText('A Great Product')).toBeInTheDocument();
    const decrementBtn = screen.getByRole('button', { name: /decrease quantity/i });
    await user.click(decrementBtn);
    expect(screen.queryByText('A Great Product')).not.toBeInTheDocument();
  });

  it('displays the correct total price', async () => {
    renderCartWithItems([mockCartItem]);
    expect(await screen.findByText('Total: ₹4150.00')).toBeInTheDocument();
  });

  it('shows the Buy button', async () => {
    renderCartWithItems([mockCartItem]);
    expect(await screen.findByRole('button', { name: /buy/i })).toBeInTheDocument();
  });

  it('shows the payment section when Buy is clicked', async () => {
    const user = userEvent.setup();
    renderCartWithItems([mockCartItem]);
    const buyBtn = await screen.findByRole('button', { name: /buy/i });
    await user.click(buyBtn);
    expect(screen.getByText(/IF YOU PAY YOU WONT GET THE ITEM/i)).toBeInTheDocument();
  });
});

