import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import Shop from '../pages/Shop';
import * as api from '../services/api';

vi.mock('../services/api');

const mockProducts = [
  { id: 1, title: 'Test Product One', price: 9.99, image: 'https://example.com/img1.jpg', category: 'test' },
  { id: 2, title: 'Test Product Two', price: 19.99, image: 'https://example.com/img2.jpg', category: 'test' },
];

function renderShop() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Shop />
      </CartProvider>
    </MemoryRouter>
  );
}

describe('Shop', () => {
  beforeEach(() => {
    api.fetchProducts.mockResolvedValue(mockProducts);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows a loading state initially', () => {
    renderShop();
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('renders products after loading', async () => {
    renderShop();
    await waitFor(() => {
      expect(screen.getByText('Test Product One')).toBeInTheDocument();
      expect(screen.getByText('Test Product Two')).toBeInTheDocument();
    });
  });

  it('shows an error message when the fetch fails', async () => {
    api.fetchProducts.mockRejectedValue(new Error('Network error'));
    renderShop();
    await waitFor(() => {
      expect(screen.getByText(/failed to load products/i)).toBeInTheDocument();
    });
  });

  it('renders product prices', async () => {
    renderShop();
    await waitFor(() => {
      expect(screen.getByText('₹829.17')).toBeInTheDocument();
      expect(screen.getByText('₹1659.17')).toBeInTheDocument();
    });
  });

  it('renders Add to Cart buttons for each product', async () => {
    renderShop();
    await waitFor(() => {
      const buttons = screen.getAllByRole('button', { name: /add to cart/i });
      expect(buttons).toHaveLength(mockProducts.length);
    });
  });

  it('increments quantity when + button is clicked', async () => {
    const user = userEvent.setup();
    renderShop();
    await waitFor(() => screen.getAllByRole('button', { name: /increase quantity/i }));
    const incrementButtons = screen.getAllByRole('button', { name: /increase quantity/i });
    const quantityInputs = screen.getAllByRole('spinbutton', { name: /quantity/i });
    await user.click(incrementButtons[0]);
    expect(quantityInputs[0]).toHaveValue(2);
  });

  it('decrements quantity but not below 1', async () => {
    const user = userEvent.setup();
    renderShop();
    await waitFor(() => screen.getAllByRole('button', { name: /decrease quantity/i }));
    const decrementButtons = screen.getAllByRole('button', { name: /decrease quantity/i });
    const quantityInputs = screen.getAllByRole('spinbutton', { name: /quantity/i });
    await user.click(decrementButtons[0]);
    expect(quantityInputs[0]).toHaveValue(1);
  });
});
