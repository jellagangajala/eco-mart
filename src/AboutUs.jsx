import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './AboutUs.css';

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const cards = [
    {
      title: "OUR STORY",
      text: "We began with a passion for innovation and a desire to make a difference.",
    },
    {
      title: "OUR TEAM",
      text: "Our team is made up of professionals dedicated to excellence.",
    },
    {
      title: "OUR HISTORY",
      text: "Over the years, we’ve helped countless clients achieve success.",
    },
    {
      title: "OUR FUTURE",
      text: "Looking ahead, we aim to lead with sustainability and technology.",
    },
  ];

  return (
    <div className="about-container">
      <h1 className="about-title">🌟 ABOUT US</h1>
      <p className="about-subtitle">Discover who we are and what drives us forward.</p>

      <div className="card-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className="about-card"
            data-aos="fade-up"
            data-aos-delay={index * 100} // delay for each card
          >
            <h2>{card.title}</h2>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
