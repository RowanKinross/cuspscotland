import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import './App.css';



function App() {
  return (
    <div className="main-wrapper">
      <header className="header">
          <img
          className="cuspLogo"
          src="/Diamond_Logo_DarkSand.png"
          alt="Cusp Scotland logo"
          />
      </header>
      <main className="content">
        <section className="intro-section">
          <h2 className="site-tagline">Support & wellbeing using the natural environment.</h2>
          <h3>Who we are</h3>
          <p>
            Cusp (Scotland) is a community interest company dedicated to providing outdoor activities and support services aimed at enhancing the well-being of individuals and communities in Edinburgh and across Scotland. Our organisation focuses on assisting vulnerable populations, including those in need of social care and health-related support.
          </p>
        </section>
        <section className="about-section">
          <h3>About us</h3>
          <p>
            Founded by Jonny and Alex - with a combined experience of 60+ years in outdoor leadership, social work, recovery, counselling, psychotherapy and community support. We are passionate about making a positive impact on the lives of those who approach us, and we are committed to fostering a supportive and inclusive environment for all members of our community.
          </p>
        </section>
        <section className="contact-section">
          <h3>Contact</h3>
          <div className="contact-info">
            <a 
              className='contact-info-link'
              href="mailto:mail@cuspscotland.info">mail@cuspscotland.info</a>
            <a 
              className='contact-info-link'
              href='https://www.linkedin.com/company/cuspcic/'>LinkedIn</a>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Cusp Scotland. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App
