import React, { useRef, useState } from 'react';
import './ContactUs.css';
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaFacebook, FaInstagram, FaTwitter
} from 'react-icons/fa';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactUs() {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // 🌙 Dark mode toggle

  const sendEmail = (e) => {
    e.preventDefault();

    const name = form.current.from_name.value.trim();
    const email = form.current.from_email.value.trim();
    const message = form.current.message.value.trim();

    // ✅ Validation
    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    emailjs.sendForm(
      'service_i3t0kvh',
      'template_b9s5dgr',
      form.current,
      'gimfEfjaE6hdhlA1x'
    ).then(() => {
      toast.success("Message sent successfully!");
      form.current.reset();
      setIsLoading(false);
    }).catch((error) => {
      toast.error("Failed to send the message. Try again later.");
      console.error(error);
      setIsLoading(false);
    });
  };

  return (
    <div className={`contact-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* ✅ Theme Toggle Button */}
      <button
        className="toggle-mode"
        onClick={() => {
          setDarkMode(prev => {
            const newMode = !prev;
            document.body.classList.toggle('dark', newMode); // ✅ Enable dark mode styles
            return newMode;
          });
        }}
      >
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* ✅ Left Side Info */}
      <div className="contact-left">
        <h2 className="title-green">Get in Touch</h2>
        <p><FaEnvelope className="icon-red" /> <strong>Email:</strong> minnijella@gmail.com</p>
        <p><FaPhone className="icon-green" /> <strong>Phone:</strong> 6304028175</p>
        <p><FaMapMarkerAlt className="icon-red" /> <strong>Address:</strong> Karimnager</p>

        <h3 className="follow-title">Follow Us</h3>
        <div className="social-icons">
          <FaFacebook className="social-icon" />
          <FaInstagram className="social-icon" />
          <FaTwitter className="social-icon" />
        </div>
      </div>

      {/* ✅ Right Side Form */}
      <div className="contact-right">
        <h2>Send Us a Message</h2>
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="from_name" placeholder="Enter your name" required />
          <input type="email" name="from_email" placeholder="Enter your email" required />
          <textarea name="message" rows="5" placeholder="Your message" required></textarea>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {/* ✅ Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ContactUs;
