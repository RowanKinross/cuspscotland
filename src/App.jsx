import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './App.css';



function App() {
  return (
    <div className="main-wrapper">
      <header className="header">
        <img
          src="/scotland_landscape.jpg"
          alt="Scotland landscape banner"
          className="banner-image"
        />
        <div className="overlay">
          <h1 className="site-title">Cusp</h1>
          <h2 className="site-tagline">Support & Wellbeing</h2>
        </div>
      </header>
      <main className="content">
        <section className="intro-section">
          <h3>Welcome</h3>
          <p>

            Welcome to Cusp (Scotland), a community interest company dedicated to providing social work activities and support services aimed at enhancing the well-being of individuals and communities in Edinburgh. Our organization focuses on assisting vulnerable populations, including those in need of social care and health-related support.
          </p>
        </section>
        <section className="about-section">
          <h3>About</h3>
          <p>
            Founded by Jonny and Alex - with a combined experience of 60+ years in social work, counselling, and community support. We are passionate about making a positive impact on the lives of those who approach us, and we are committed to fostering a supportive and inclusive environment for all members of our community.
          </p>
        </section>
        <section className="contact-section">
          <h3>Contact</h3>
          <p>
            mail@cuspscotland.info<br />
          </p>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Cusp Scotland. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App
