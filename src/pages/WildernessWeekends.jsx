import React from 'react';

function WildernessWeekends({ openBRAWModal }) {
  return (
    <div className="wilderness-weekends-page">
      <h2>Wilderness Weekends</h2>
      <p>Details of upcoming trips or expeditions will appear here. Join us for immersive weekends in nature, designed for wellbeing and adventure.</p>
      <button className="referral-btn" onClick={openBRAWModal}>Referral Form</button>
    </div>
  );
}

export default WildernessWeekends;
