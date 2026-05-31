
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import dayjs from 'dayjs';
import WildernessWeekends from './pages/WildernessWeekends';
import OutdoorTherapy from './pages/OutdoorTherapy';
import TrainingPartnerships from './pages/TrainingPartnerships';
import BRAWReferralForm from './components/BRAWReferralForm/BRAWReferralForm';
import CUSPReferralForm from './components/CUSPReferralForm/CUSPReferralForm';
import './App.css';





function Home({ showModal, setShowModal, form, setForm, sending, setSending, feedback, setFeedback, handleChange, handleSubmit }) {
  return (
    <>
      <section className="intro-section">
        <h2 className="site-tagline">Support & wellbeing using the natural environment</h2>
        <div className="who-nav-row">
          <h3 style={{margin: 0}}>Who we are</h3>
        </div>
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
    </>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showBRAWModal, setShowBRAWModal] = useState(false);
  const [showCUSPModal, setShowCUSPModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [navOpen, setNavOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFeedback('');
    emailjs.send(
      'service_z4gztrd',
      'template_ovrfp3p',
      {
        name: form.name,
        email: form.email,
        message: form.message,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      },
      '7KUqYQDRMLAewrq1b'
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

  return (
    <Router>
      <div className="main-wrapper">
        <header className="header">
          <img
            className="cuspLogo"
            src="/Diamond_Logo_DarkSand.png"
            alt="Cusp Scotland logo"
          />
        </header>
        <main className="content">
          <div className='contentNoise'>
            <div className="who-nav-row">
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
                  <li><a href="/" onClick={e => {e.preventDefault(); setNavOpen(false); window.location.href = '/';}}>Home</a></li>
                  <li><a href="/wilderness" onClick={e => {e.preventDefault(); setNavOpen(false); window.location.href = '/wilderness';}}>Wilderness Weekends</a></li>
                  <li><a href="/outdoor-therapy" onClick={e => {e.preventDefault(); setNavOpen(false); window.location.href = '/outdoor-therapy';}}>Individual & Group Outdoor Therapy</a></li>
                  <li><a href="/training" onClick={e => {e.preventDefault(); setNavOpen(false); window.location.href = '/training';}}>Training & Partnerships</a></li>
                </ul>
              </nav>
            </div>
            <Routes>
              <Route path="/" element={<Home showModal={showModal} setShowModal={setShowModal} form={form} setForm={setForm} sending={sending} setSending={setSending} feedback={feedback} setFeedback={setFeedback} handleChange={handleChange} handleSubmit={handleSubmit} />} />
              <Route path="/wilderness" element={<WildernessWeekends openBRAWModal={() => setShowBRAWModal(true)} />} />
              <Route path="/outdoor-therapy" element={<OutdoorTherapy openCUSPModal={() => setShowCUSPModal(true)} />} />
              <Route path="/training" element={<TrainingPartnerships openContactModal={() => setShowModal(true)} />} />
            </Routes>
            {showBRAWModal && (
              <div className="modal-overlay" onClick={() => setShowBRAWModal(false)}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                  <button className="modal-close" onClick={() => setShowBRAWModal(false)}>×</button>
                  <BRAWReferralForm onClose={() => setShowBRAWModal(false)} />
                </div>
              </div>
            )}
            {showCUSPModal && (
              <div className="modal-overlay" onClick={() => setShowCUSPModal(false)}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                  <button className="modal-close" onClick={() => setShowCUSPModal(false)}>×</button>
                  <CUSPReferralForm onClose={() => setShowCUSPModal(false)} />
                </div>
              </div>
            )}
            {/* Contact modal for Home and Training pages */}
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
    </Router>
  );
}

export default App;
