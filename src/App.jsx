import React, { useState } from 'react';
import './styles/App.css';  // Changed to look in styles folder
import SurpriseMessages from './components/SurpriseMessages';
import GiftBox from './components/GiftBox';
import PhotoWheel from './components/PhotoWheel';

function App() {
  const [showWheel, setShowWheel] = useState(false);
  const [isGiftOpened, setIsGiftOpened] = useState(false);

  const messages = [
    {
      id: 1,
      emoji: "\uD83C\uDF82",
      text: "Happy Birthday to the most amazing person I know! \uD83C\uDF82\n\nEvery day with you is a gift, and today we celebrate YOU. Your smile brightens my world, your kindness inspires me, and your presence makes everything better.\n\nMay this year bring you endless joy, beautiful surprises, and all the love you deserve. \u2728 Labarn lang diha and see you soon :)"
    }
  ];

  const handleGiftClick = () => {
    setIsGiftOpened(true);
  };

  const handleShowWheel = () => {
    setShowWheel(true);
  };

  return (
    <div className="app">
      {!isGiftOpened ? (
        <div className="gift-screen">
          <div className="gift-intro">
            <h1 className="gift-title">✨ A Special Surprise Awaits ✨</h1>
            <p className="gift-subtitle">Click the gift box to begin your birthday journey</p>
          </div>
          <GiftBox onClick={handleGiftClick} />
        </div>
      ) : !showWheel ? (
        <div className="letter-screen">
          <SurpriseMessages 
            messages={messages} 
            onShowWheel={handleShowWheel}
          />
        </div>
      ) : (
        <div className="wheel-screen">
          <PhotoWheel />
        </div>
      )}
    </div>
  );
}

export default App;
