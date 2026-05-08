// SurpriseMessages.jsx
import React, { useEffect, useState } from 'react';
import '../styles/SurpriseMessages.css';

function SurpriseMessages({ messages }) {
  const [confetti, setConfetti] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Generate confetti on mount
    const confettiEmojis = ['💕', '💗', '💖', '💝', '💘', '💓', '🎀', '🌸', '🌹', '✨', '⭐', '🌟'];
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2.5 + Math.random() * 1.5
    }));
    setConfetti(newConfetti);
  }, []);

  const handleOpenLetter = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsOpen(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleCloseLetter = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsOpen(false);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleNextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsOpen(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrevCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsOpen(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
      setIsAnimating(false);
    }, 300);
  };

  const currentMessage = messages[currentIndex];

  return (
    <div className="surprises-container active">
      {/* Confetti */}
      <div className="confetti-container">
        {confetti.map(item => (
          <div
            key={item.id}
            className="confetti"
            style={{
              left: `${item.left}%`,
              animation: `fall ${item.duration}s linear ${item.delay}s forwards`,
              '--emoji': `'${item.emoji}'`
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="decorative-hearts">
        <span className="heart left-heart">💕</span>
        <span className="heart right-heart">💕</span>
      </div>

      {/* Envelope/Letter Container */}
      <div className="letter-container">
        {/* Navigation Buttons */}
        <button 
          className="nav-button prev-button" 
          onClick={handlePrevCard}
          disabled={isAnimating}
          aria-label="Previous card"
        >
          ←
        </button>

        {/* Letter Card */}
        <div className={`letter-wrapper ${isAnimating ? 'animating' : ''}`}>
          <div className={`letter ${isOpen ? 'open' : 'closed'}`}>
            {/* Envelope Back (visible when closed) */}
            <div className="envelope">
              <div className="envelope-flap"></div>
              <div className="envelope-body">
                <div className="seal">💌</div>
                <div className="envelope-address">
                  <span>To the Pretty nurse i knew ❤️ </span>
                  <span className="small-text">Happy birthday 🎉 </span>
                </div>
              </div>
            </div>

            {/* Letter Content (visible when open) */}
            <div className="letter-content">
              <div className="letter-paper">
                <div className="letter-header">
                  <span className="letter-emoji">{currentMessage.emoji}</span>
                  <div className="letter-decoration">✦ ✦ ✦</div>
                </div>
                <div className="letter-message">
                  <p>{currentMessage.text}</p>
                </div>
                <div className="letter-footer">
                  <span>With love 💕</span>
                </div>
              </div>
            </div>

            {/* Open/Close Button */}
            {!isOpen ? (
              <button 
                className="open-button"
                onClick={handleOpenLetter}
                disabled={isAnimating}
              >
                <span className="button-text">Click me</span>
                <span className="button-icon">✨</span>
              </button>
            ) : (
              <button 
                className="close-button"
                onClick={handleCloseLetter}
                disabled={isAnimating}
              >
                <span className="button-text">Close letter</span>
                <span className="button-icon">📬</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button 
          className="nav-button next-button" 
          onClick={handleNextCard}
          disabled={isAnimating}
          aria-label="Next card"
        >
          →
        </button>
      </div>

      {/* Card Counter */}
      <div className="card-counter">
        <span className="counter-heart">❤️</span>
        Letter {currentIndex + 1} of {messages.length}
        <span className="counter-heart">❤️</span>
      </div>

      {/* Instruction text */}
      {!isOpen && (
        <div className="instruction-text">
          <span>💌 Tap the Click me button to open a letter 💌</span>
        </div>
      )}
    </div>
  );
}

export default SurpriseMessages;