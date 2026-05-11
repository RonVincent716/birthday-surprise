import React, { useState } from 'react';
import '../styles/GiftBox.css';  // Changed to look in styles folder

function GiftBox({ onClick }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onClick();
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className="gift-box-wrapper">
      <div className={`gift-box ${isAnimating ? 'animate' : ''}`} onClick={handleClick}>
        <div className="gift-lid"></div>
        <div className="gift-body"></div>
        <div className="gift-ribbon-vertical"></div>
        <div className="gift-ribbon-horizontal"></div>
        <div className="gift-bow"></div>
      </div>
      <p className="gift-hint">✨ Click the gift to open ✨</p>
    </div>
  );
}

export default GiftBox;