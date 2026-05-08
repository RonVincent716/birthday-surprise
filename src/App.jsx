import React, { useEffect, useRef, useState } from 'react';
import GiftBox from './components/GiftBox';
import SurpriseMessages from './components/SurpriseMessages';
import ImageGallery from './components/ImageGallery';
import './styles/App.css';
import photo01 from './components/Images/image 1.jpg';
import photo02 from './components/Images/image 2.jpg';
import photo03 from './components/Images/image 3.jpg';
import photo04 from './components/Images/image 4.jpg';
import photo05 from './components/Images/image 5.jpg';
import photo06 from './components/Images/image 6.jpg';
import photo07 from './components/Images/image 7.jpg';
import photo08 from './components/Images/image 8.jpg';
import photo09 from './components/Images/image 9.jpg';

function App() {
  const [showSurprises, setShowSurprises] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [galleryPhase, setGalleryPhase] = useState('idle');
  const transitionTimers = useRef([]);

  const messages = [
    { emoji: '\u{1F389}', text: "You're amazing! Keep being awesome!" },
    { emoji: '\u2728', text: 'Another year, another chance to shine!' },
    { emoji: '\u{1F31F}', text: 'May all your dreams come true!' },
    { emoji: '\u{1F38A}', text: 'You deserve all the happiness today!' },
    { emoji: '\u{1F388}', text: "Life is a party, and you're the star!" },
    { emoji: '\u{1F381}', text: 'Thanks for being you! Happy birthday! \u{1F973}' }
  ];

  const uploadedImages = [
    { id: 1, src: photo01, alt: 'Photo 1' },
    { id: 2, src: photo02, alt: 'Photo 2' },
    { id: 3, src: photo03, alt: 'Photo 3' },
    { id: 4, src: photo04, alt: 'Photo 4' },
    { id: 5, src: photo05, alt: 'Photo 5' },
    { id: 6, src: photo06, alt: 'Photo 6' },
    { id: 7, src: photo07, alt: 'Photo 7' },
    { id: 8, src: photo08, alt: 'Photo 8' },
    { id: 9, src: photo09, alt: 'Photo 9' }
  ];

  // Group photos so each click reveals the next mini-gallery.
  const imageSets = uploadedImages.reduce((sets, image, index) => {
    const setIndex = Math.floor(index / 3);
    if (!sets[setIndex]) {
      sets[setIndex] = [];
    }

    sets[setIndex].push(image);
    return sets;
  }, []);

  const totalGalleries = imageSets.length || 1;

  const clearTransitionTimers = () => {
    transitionTimers.current.forEach((timer) => clearTimeout(timer));
    transitionTimers.current = [];
  };

  const queueTransition = (callback, delay) => {
    const timer = setTimeout(callback, delay);
    transitionTimers.current.push(timer);
  };

  useEffect(() => {
    return () => clearTransitionTimers();
  }, []);

  const handleGiftClick = () => {
    clearTransitionTimers();
    setShowSurprises(true);
    setShowImages(false);
    setImageIndex(0);
    setGalleryPhase('idle');
  };

  const handleReset = () => {
    clearTransitionTimers();
    setShowSurprises(false);
    setShowImages(false);
    setImageIndex(0);
    setGalleryPhase('idle');
  };

  const handleClickAgain = () => {
    clearTransitionTimers();

    if (!showImages) {
      setShowImages(true);
      setImageIndex(0);
      setGalleryPhase('enter');
      queueTransition(() => setGalleryPhase('idle'), 450);
      return;
    }

    setGalleryPhase('exit');

    queueTransition(() => {
      setImageIndex((prev) => (prev + 1) % totalGalleries);
      setGalleryPhase('enter');
    }, 220);

    queueTransition(() => setGalleryPhase('idle'), 620);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>{'\u{1F382} Happy Birthday! \u{1F382}'}</h1>
        <p>Click the gift to reveal your surprises!</p>
      </div>

      <GiftBox onClick={handleGiftClick} />

      {showSurprises && (
        <>
          <SurpriseMessages messages={messages} />
          <button className="reset-btn show" onClick={handleReset}>
            Hide Surprises
          </button>
          <button
            className={`click-again-btn show ${galleryPhase === 'exit' ? 'is-switching' : ''}`}
            onClick={handleClickAgain}
            disabled={galleryPhase === 'exit'}
          >
            {'\u{1F4F8} Click for Photos!'}
          </button>
        </>
      )}

      {showImages && (
        <ImageGallery
          images={imageSets[imageIndex] || []}
          index={imageIndex}
          phase={galleryPhase}
        />
      )}
    </div>
  );
}

export default App;
