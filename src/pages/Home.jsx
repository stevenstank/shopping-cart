import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <main className="home">
      <section className="home-hero">
        <h1>Welcome to ShopCart</h1>
        <p>Browse our catalogue and find what you need.</p>
        <Link to="/shop" className="home-cta">Browse Products</Link>
      </section>
      <section className="home-features">
        <div className="feature-card">
          <h2>Wide Selection</h2>
          <p>Products across multiple categories sourced from real inventory data.</p>
        </div>
        <div className="feature-card">
          <h2>Simple Checkout</h2>
          <p>Add items to your cart and manage quantities before you buy.</p>
        </div>
        <div className="feature-card">
          <h2>Transparent Pricing</h2>
          <p>No hidden fees. The price you see is the price you pay.</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
