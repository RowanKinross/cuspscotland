import React from 'react';

function OutdoorTherapy({ openCUSPModal }) {
  return (
    <div className="outdoor-therapy-page">
      <h2>Individual & Group Outdoor Therapy</h2>
      <p>We offer individual sessions and group places for those seeking support in the outdoors.</p>
      <button className="referral-btn" onClick={openCUSPModal}>Referral Form</button>
    </div>
  );
}

export default OutdoorTherapy;
