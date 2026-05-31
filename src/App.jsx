import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import dayjs from 'dayjs';
import './App.css';



function App() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFeedback('');
    emailjs.send(
      'service_z4gztrd', // Service ID
      'template_ovrfp3p', // Template ID
      {
        name: form.name,
        email: form.email,
        message: form.message,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      },
      '7KUqYQDRMLAewrq1b' // Public key
    ).then(
      (result) => {
        setFeedback('Message sent! We will get back to you soon.');
        setForm({ name: '', email: '', message: '' });
      },
      (error) => {
        setFeedback('Failed to send. Please try again.');
      }
    ).finally(() => setSending(false));
  };

  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="main-wrapper">
      <header className="header">
        <img
          className="cuspLogo"
          src="/Diamond_Logo_DarkSand.png"
          alt="Cusp Scotland logo"
        />
        <button
          className={`nav-hamburger${navOpen ? ' open' : ''}`}
          aria-label="Toggle navigation menu"
          onClick={() => setNavOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`navdropdown${navOpen ? ' open' : ''}`}>
          <ul>
            <li><a href="#home" onClick={() => setNavOpen(false)}>Home</a></li>
            <li><a href="#wilderness" onClick={() => setNavOpen(false)}>Wilderness Weekends</a></li>
            <li><a href="#outdoor-therapy" onClick={() => setNavOpen(false)}>Individual & Group Outdoor Therapy</a></li>
            <li><a href="#training" onClick={() => setNavOpen(false)}>Training & Partnerships</a></li>
          </ul>
        </nav>
      </header>
      <main className="content">
        <div className='contentNoise'>
        <section className="intro-section">
          <h2 className="site-tagline">Support & wellbeing using the natural environment</h2>
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
            <div
              className='contact-info-link' 
              onClick={() => setShowModal(true)}
            >Email</div>
            <a 
              className='contact-info-link'
              href='https://www.linkedin.com/company/cuspcic/'
              target='_blank'
              >LinkedIn</a>
          </div>
          <div className="contact-info">
          </div>
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
              <h2>Contact us</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <label>
                  Name
                  <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </label>
                <label>
                  Message
                  <textarea name="message" value={form.message} onChange={handleChange} required />
                </label>
                <button type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send'}</button>
                {feedback && <div className="form-feedback">{feedback}</div>}
              </form>
            </div>
          </div>
        )}
        </section>
        </div>
      </main>
      <footer className="footer">
        <div className='footerImgAndTag'>
          <img
            className="cuspLogoFooter"
            src="/CUSP_Logo_Flat_Dark.png"
            alt="Cusp Scotland logo"
            />
          <h3 className='changeHappens'>Where change happens</h3>
        </div>
        <p>&copy; {new Date().getFullYear()} Cusp Scotland. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App
