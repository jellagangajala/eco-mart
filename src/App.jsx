import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './navbar.css';
import {
  FaHome, FaLeaf, FaDrumstickBite, FaGlassWhiskey, FaCandyCane,
  FaShoppingCart, FaBox, FaInfoCircle, FaPhoneAlt, FaSignInAlt, FaBars, FaTimes
} from 'react-icons/fa';

import Home from './Home';
import Veg from './Veg';
import NonVeg from './NonVeg';
import Milk from './Milk';
import Chocolates from './Chocolates';
import Cart from './Cart';
import Orders from './Orders';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import SignUp from './SignUp';
import { logOut } from './store';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useSelector(state => state.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.users.isAuthenticated);
  const currentUser = useSelector(state => state.users.currentUser);

  return (
    <BrowserRouter basename={import.meta.env.DEV ? undefined : "/React-EcoMart"}>
      <nav className="navbar">
        {/* ✅ Logo and Brand */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link" onClick={() => setMenuOpen(false)}>
            <img src="/logo.png" alt="EcoMart Logo" className="brand-logo" />
            <span className="brand-text">EcoMart</span>
          </Link>
        </div>

        {/* 📱 Mobile Menu Toggle */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* ✅ Navigation Links */}
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}><FaHome /> Home</Link>
          <Link to="/Veg" className="navbar-link" onClick={() => setMenuOpen(false)}><FaLeaf /> Veg</Link>
          <Link to="/NonVeg" className="navbar-link" onClick={() => setMenuOpen(false)}><FaDrumstickBite /> Non-Veg</Link>
          <Link to="/Milk" className="navbar-link" onClick={() => setMenuOpen(false)}><FaGlassWhiskey /> Milk</Link>
          <Link to="/Chocolates" className="navbar-link" onClick={() => setMenuOpen(false)}><FaCandyCane /> Chocolates</Link>
          <Link to="/Cart" className="navbar-link" onClick={() => setMenuOpen(false)}><FaShoppingCart /> Cart ({cartCount})</Link>
          <Link to="/Orders" className="navbar-link" onClick={() => setMenuOpen(false)}><FaBox /> Orders</Link>
          <Link to="/AboutUs" className="navbar-link" onClick={() => setMenuOpen(false)}><FaInfoCircle /> About Us</Link>
          <Link to="/ContactUs" className="navbar-link" onClick={() => setMenuOpen(false)}><FaPhoneAlt /> Contact Us</Link>

          {isAuthenticated ? (
            <div className="auth-links">
              <span className="user-greet">Welcome, {currentUser.username}</span>
              <button onClick={() => { dispatch(logOut()); setMenuOpen(false); }}>Log Out</button>
            </div>
          ) : (
            <Link to="/SignUp" className="navbar-link" onClick={() => setMenuOpen(false)}><FaSignInAlt /> Sign In</Link>
          )}
        </div>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Veg" element={<Veg />} />
          <Route path="/NonVeg" element={<NonVeg />} />
          <Route path="/Milk" element={<Milk />} />
          <Route path="/Chocolates" element={<Chocolates />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
