import React, { useState } from 'react';
import '../styles/PhotoWheel.css';

// Import your images from the Images folder
import image1 from './Images/image1.jpg';
import image2 from './Images/image2.jpg';
import image3 from './Images/image3.jpg';
import image4 from './Images/image4.jpg';
import image5 from './Images/image5.jpg';
import image6 from './Images/image6.jpg';
import image7 from './Images/image7.jpg';
import image8 from './Images/image8.jpg';
import image9 from './Images/image9.jpg';

const photos = [
  { 
    id: 1, 
    title: "Birthday Celebration", 
    desc: "A special day filled with joy!",
    image: image1
  },
  { 
    id: 2, 
    title: "Spring Memories", 
    desc: "Beautiful moments together",
    image: image2
  },
  { 
    id: 3, 
    title: "Coffee Dates", 
    desc: "Warm conversations and laughter",
    image: image3
  },
  { 
    id: 4, 
    title: "Sunset Walks", 
    desc: "Golden hour magic",
    image: image4
  },
  { 
    id: 5, 
    title: "Surprise Gifts", 
    desc: "Presents and happiness",
    image: image5
  },
  { 
    id: 6, 
    title: "Silly Selfies", 
    desc: "Crazy faces and fun times",
    image: image6
  },
  { 
    id: 7, 
    title: "Holiday Cheer", 
    desc: "Festive celebrations",
    image: image7
  },
  { 
    id: 8, 
    title: "Star Moments", 
    desc: "Shining bright together",
    image: image8
  },
  { 
    id: 9, 
    title: "Cherished Times", 
    desc: "Memories to treasure forever",
    image: image9
  }
];

function PhotoWheel() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenPhoto, setFullscreenPhoto] = useState(null);

  const handlePhotoClick = (photo) => {
    setFullscreenPhoto(photo);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setFullscreenPhoto(null);
  };

  const navigatePhoto = (direction) => {
    const currentIndex = photos.findIndex(p => p.id === fullscreenPhoto.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % photos.length;
    } else {
      newIndex = (currentIndex - 1 + photos.length) % photos.length;
    }
    setFullscreenPhoto(photos[newIndex]);
  };

  return (
    <div className="gallery-container-new">
      {/* Fullscreen Modal */}
      {isFullscreen && fullscreenPhoto && (
        <div className="fullscreen-modal" onClick={closeFullscreen}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-fullscreen" onClick={closeFullscreen}>✖</button>
            <img 
              src={fullscreenPhoto.image} 
              alt={fullscreenPhoto.title}
              className="fullscreen-image"
            />
            <div className="fullscreen-info">
              <h2>{fullscreenPhoto.title}</h2>
              <p>{fullscreenPhoto.desc}</p>
            </div>
            <button className="nav-fullscreen prev-fullscreen" onClick={() => navigatePhoto('prev')}>
              ←
            </button>
            <button className="nav-fullscreen next-fullscreen" onClick={() => navigatePhoto('next')}>
              →
            </button>
          </div>
        </div>
      )}

      <div className="gallery-header-new">
        <h1>📸 Our Beautiful Photo Gallery 📸</h1>
        <p>Click on any photo to view it in fullscreen</p>
      </div>

      <div className="photo-grid">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="photo-card"
            onClick={() => handlePhotoClick(photo)}
          >
            <div className="photo-image-wrapper">
              <img 
                src={photo.image} 
                alt={photo.title}
                className="photo-image"
              />
              <div className="photo-overlay">
                <span className="view-icon">🔍</span>
                <p>Click to view</p>
              </div>
            </div>
            <div className="photo-info">
              <h3>{photo.title}</h3>
              <p>{photo.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="gallery-footer-new">
        <p>✨ Each photo holds a special memory we've shared ✨</p>
        <button className="back-btn" onClick={() => window.location.reload()}>
          ← Back to Letters
        </button>
      </div>
    </div>
  );
}

export default PhotoWheel;