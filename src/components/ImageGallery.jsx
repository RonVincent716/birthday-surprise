import React, { useEffect, useState } from 'react';
import '../styles/ImageGallery.css';

function ImageGallery({ images, index, phase = 'idle' }) {
  const [loadedImages, setLoadedImages] = useState(new Set());

  useEffect(() => {
    setLoadedImages(new Set());
  }, [index, images]);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => new Set([...prev, id]));
  };

  return (
    <div className={`gallery-container active gallery-${phase}`}>
      <div className="gallery-header">
        <h2>{`\u{1F4F8} Photo Gallery #${index + 1}`}</h2>
        <p>{'Look at these amazing memories! \u2728'}</p>
      </div>

      <div className="gallery-grid" key={`grid-${index}`}>
        {images.map((img, idx) => (
          <div
            key={`${index}-${img.id}`}
            className={`gallery-item gallery-item-${idx + 1} ${loadedImages.has(img.id) ? 'loaded' : ''}`}
          >
            <div className="image-wrapper">
              <img
                src={img.src}
                alt={img.alt}
                onLoad={() => handleImageLoad(img.id)}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x300?text=Photo+${img.id}`;
                  handleImageLoad(img.id);
                }}
              />
              <div className="image-overlay">
                <p>{img.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="gallery-footer">
        <p>{'More beautiful memories on the next click! \u{1F495}'}</p>
      </div>
    </div>
  );
}

export default ImageGallery;
