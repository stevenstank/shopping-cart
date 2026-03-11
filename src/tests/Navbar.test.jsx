import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';

function renderNavbar(cartItems = []) {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Navbar />
      </CartProvider>
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  it('renders all navigation links', () => {
    renderNavbar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
  });

  it('renders the brand name', () => {
    renderNavbar();
    expect(screen.getByText('ShopCart')).toBeInTheDocument();
  });

  it('does not show cart count when cart is empty', () => {
    renderNavbar();
    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument();
  });
});
