import React, { useMemo, useState } from 'react';
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
    title: 'Birthday Celebration',
    desc: 'A special day filled with joy!',
    image: image1
  },
  {
    id: 2,
    title: 'Spring Memories',
    desc: 'Beautiful moments together',
    image: image2
  },
  {
    id: 3,
    title: 'Coffee Dates',
    desc: 'Warm conversations and laughter',
    image: image3
  },
  {
    id: 4,
    title: 'Sunset Walks',
    desc: 'Golden hour magic',
    image: image4
  },
  {
    id: 5,
    title: 'Surprise Gifts',
    desc: 'Presents and happiness',
    image: image5
  },
  {
    id: 6,
    title: 'Silly Selfies',
    desc: 'Crazy faces and fun times',
    image: image6
  },
  {
    id: 7,
    title: 'Holiday Cheer',
    desc: 'Festive celebrations',
    image: image7
  },
  {
    id: 8,
    title: 'Star Moments',
    desc: 'Shining bright together',
    image: image8
  },
  {
    id: 9,
    title: 'Cherished Times',
    desc: 'Memories to treasure forever',
    image: image9
  }
];

function PhotoWheel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activePhoto = useMemo(() => photos[activeIndex], [activeIndex]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const navigate = (direction) => {
    setActiveIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % photos.length;
      }
      return (prev - 1 + photos.length) % photos.length;
    });
  };

  return (
    <div className="gallery-container-new">
      <div className="gallery-header-new">
        <h1>Our Beautiful Photo Gallery</h1>
        <p>Use arrows to browse. Captions update with each photo.</p>
      </div>

      <div className="carousel-shell">
        <button
          className="carousel-nav prev-nav"
          onClick={() => navigate('prev')}
          aria-label="Previous photo"
        >
          &#8592;
        </button>

        <div className="carousel-window">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {photos.map((photo) => (
              <div key={photo.id} className="carousel-slide">
                <div className="photo-card">
                  <div className="photo-image-wrapper">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="photo-image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div key={activePhoto.id} className="photo-caption">
            <h3>{activePhoto.title}</h3>
            <p>{activePhoto.desc}</p>
          </div>
        </div>

        <button
          className="carousel-nav next-nav"
          onClick={() => navigate('next')}
          aria-label="Next photo"
        >
          &#8594;
        </button>
      </div>

      <div className="carousel-dots" role="tablist" aria-label="Photo slides">
        {photos.map((photo, idx) => (
          <button
            key={photo.id}
            className={`dot ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            aria-selected={idx === activeIndex}
            role="tab"
          />
        ))}
      </div>

      <div className="gallery-footer-new">
        <p>Each photo holds a special memory we shared.</p>
        <button className="back-btn" onClick={() => window.location.reload()}>
          &#8592; Back to Letters
        </button>
      </div>
    </div>
  );
}

export default PhotoWheel;
