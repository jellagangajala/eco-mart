import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {
  const sliderImages = [
    '/images/VegItems.jpg',
    '/images/NonVegItems.jpg',
    '/images/MilkProducts.jpg',
    '/images/Chocolates.jpg' 
  ];

  const productHighlights = [
    {
      title: 'Fresh Vegetables 🥕🥬',
      desc: 'Locally sourced and pesticide-free.',
      image: '/images/veg-highlight.jpg',
      bgColor: '#f3e5f5' // Light purple
    },
    {
      title: 'Premium Dairy 🧈🥛',
      desc: 'Pure and fresh milk, paneer, butter, and more.',
      image: '/images/dairy-highlight.jpg',
      bgColor: '#e0ffe0' // Light green
    },
    {
      title: 'Delicious Chocolates 🍫🍬',
      desc: 'Sweeten your day with premium treats.',
      image: '/images/choco-highlight.jpg',
      bgColor: '#fce4ec' // Light pink
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <div className="home-container">
      {/* Carousel */}
      <Slider {...sliderSettings} className="hero-slider">
        {sliderImages.map((src, i) => (
          <div key={i}>
            <img src={src} alt={`Banner ${i + 1}`} className="slider-image" />
          </div>
        ))}
      </Slider>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">🌟 Welcome to <span>Jella Gangajala's Grocery Store</span></h1>
        <p className="hero-subtitle">Your daily needs, delivered fresh & fast!</p>
        <Link to="/veg">
          <button className="primary-btn">🛍️ Start Shopping</button>
        </Link>
      </section>

      {/* Product Highlights */}
      <section className="highlight-section">
        <h2>🌟 Product Highlights</h2>
        <div className="highlight-grid">
          {productHighlights.map((item, idx) => (
            <div key={idx} className="highlight-card" style={{ backgroundColor: item.bgColor }}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="category-section">
        <h2>🛒 Shop by Categories</h2>
        <div className="category-cards">
          <Link to="/veg" className="category-card veg gradient-btn">🥦 Veg</Link>
          <Link to="/nonveg" className="category-card nonveg gradient-btn">🍗 Non-Veg</Link>
          <Link to="/milk" className="category-card milk gradient-btn">🥛 Milk</Link>
          <Link to="/chocolates" className="category-card choco gradient-btn">🍫 Chocolates</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>✨ Why Choose Us?</h2>
        <ul>
          <li>🚚 Superfast & Contactless Delivery</li>
          <li>💳 Multiple Payment Options</li>
          <li>🎁 Exclusive Coupons & Offers</li>
          <li>🌱 Fresh from Local Farmers</li>
        </ul>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h3>💼 Already placed an order?</h3>
        <p>Track or manage your orders anytime!</p>
        <Link to="/orders">
          <button className="secondary-btn">📦 My Orders</button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Jella Gangajala Grocery Store</p>
          <p>📞 Support: +91-6304028175 | ✉️ Email: gangajalajella@gmail.com</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
