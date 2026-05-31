import React from 'react';

function TrainingPartnerships({ openContactModal }) {
  return (
    <div className="training-partnerships-page">
      <h2>Training & Partnerships</h2>
      <p>We work with organisations to deliver training, workshops, and partnership projects. Get in touch to discuss how we can collaborate.</p>
      <button className="referral-btn" onClick={openContactModal}>Contact Us</button>
    </div>
  );
}

export default TrainingPartnerships;
