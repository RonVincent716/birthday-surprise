import React, { useEffect, useState } from 'react';
import '../styles/SurpriseMessages.css';  // Changed to look in styles folder

function SurpriseMessages({ messages, onShowWheel }) {
  const [confetti, setConfetti] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
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
              animation: `fall ${item.duration}s linear ${item.delay}s forwards`
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
        <button 
          className="nav-button prev-button" 
          onClick={handlePrevCard}
          disabled={isAnimating}
        >
          ←
        </button>

        <div className={`letter-wrapper ${isAnimating ? 'animating' : ''}`}>
          <div className={`letter ${isOpen ? 'open' : 'closed'}`}>
            <div className="envelope">
              <div className="envelope-flap"></div>
              <div className="envelope-body">
                <div className="seal">💌</div>
                <div className="envelope-address">
                  <span>To the Pretty nurse I knew ❤️</span>
                  <span className="small-text">Happy birthday 🎉</span>
                </div>
              </div>
            </div>

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

            {!isOpen ? (
              <button className="open-button" onClick={handleOpenLetter} disabled={isAnimating}>
                <span className="button-text">Open Letter</span>
                <span className="button-icon">✨</span>
              </button>
            ) : (
              <button className="close-button" onClick={handleCloseLetter} disabled={isAnimating}>
                <span className="button-text">Close Letter</span>
                <span className="button-icon">📬</span>
              </button>
            )}
          </div>
        </div>

        <button className="nav-button next-button" onClick={handleNextCard} disabled={isAnimating}>
          →
        </button>
      </div>

      {/* Show Pictures Button - appears when letter is open */}
      {isOpen && (
        <button className="show-pictures-btn" onClick={onShowWheel}>
          <span>🎨 Show Pictures</span>
          <span className="btn-icon">📸</span>
        </button>
      )}

      <div className="card-counter">
        <span className="counter-heart">❤️</span>
        Letter {currentIndex + 1} of {messages.length}
        <span className="counter-heart">❤️</span>
      </div>

      {!isOpen && (
        <div className="instruction-text">
          <span>💌 Tap the Open Letter button to read your birthday message 💌</span>
        </div>
      )}
    </div>
  );
}

export default SurpriseMessages;