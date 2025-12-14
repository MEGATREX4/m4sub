// src/components/donate/components/ImageCarousel.jsx
import { useState, useEffect, useMemo } from 'react';
import { IMAGES_BASE_URL } from '../constants';

export const ImageCarousel = ({ images, alt, className = "", textureUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageStates, setImageStates] = useState({});

  const displayImages = useMemo(() => {
    let result = [];
    
    if (images && Array.isArray(images) && images.length > 0) {
      result = images
        .filter(img => img && typeof img === 'string' && img.trim() !== '')
        .map(img => {
          if (IMAGES_BASE_URL && img.startsWith('/')) {
            return `${IMAGES_BASE_URL}${img}`;
          }
          return img;
        });
    }
    
    if (result.length === 0 && textureUrl && typeof textureUrl === 'string' && textureUrl.trim() !== '') {
      const url = IMAGES_BASE_URL && textureUrl.startsWith('/') 
        ? `${IMAGES_BASE_URL}${textureUrl}` 
        : textureUrl;
      result = [url];
    }
    
    return result;
  }, [images, textureUrl]);

  useEffect(() => {
    setCurrentIndex(0);
    const initialStates = {};
    displayImages.forEach((_, idx) => {
      initialStates[idx] = 'loading';
    });
    setImageStates(initialStates);
  }, [displayImages.length]);

  const handleLeftClick = (e) => {
    e.stopPropagation();
    if (displayImages.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const handleRightClick = (e) => {
    e.stopPropagation();
    if (displayImages.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  const handleImageLoad = (idx) => {
    setImageStates(prev => ({ ...prev, [idx]: 'loaded' }));
  };

  const handleImageError = (idx) => {
    console.error("Image failed to load:", displayImages[idx]);
    setImageStates(prev => ({ ...prev, [idx]: 'error' }));
  };

  if (displayImages.length === 0) {
    return (
      <div className={`bg-[#0a0a12] flex flex-col items-center justify-center ${className}`}>
        <i className="hn hn-image text-4xl opacity-50"></i>
        <span className="text-xs text-gray-500 mt-1">Немає фото</span>
      </div>
    );
  }

  const currentImage = displayImages[currentIndex];
  const currentState = imageStates[currentIndex] || 'loading';

  return (
    <div className={`relative overflow-hidden bg-[#0a0a12] ${className}`}>
      {currentState === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a12] z-10">
          <i className="hn hn-brightness-low text-2xl animate-pulse"></i>
        </div>
      )}

      {currentState === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a12] z-10 p-2">
          <i className="hn hn-alert-circle text-3xl text-red-500 opacity-70"></i>
          <span className="text-xs text-red-400 mt-2 text-center break-all max-w-full">
            404: {currentImage}
          </span>
        </div>
      )}

      <img
        key={currentImage}
        src={currentImage}
        alt={alt || "Item image"}
        style={{ imageRendering: "pixelated" }}
        className={`w-full h-full object-contain transition-opacity duration-200 ${
          currentState === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => handleImageLoad(currentIndex)}
        onError={() => handleImageError(currentIndex)}
        draggable="false"
      />

      {displayImages.length > 1 && (
        <>
          <div
            onClick={handleLeftClick}
            className="absolute left-0 top-0 w-1/4 h-full cursor-pointer z-20 hover:bg-black/10 transition-colors flex items-center justify-start pl-2"
          >
            <i className="hn hn-chevron-left text-white/0 hover:text-white/50 text-2xl"></i>
          </div>
          <div
            onClick={handleRightClick}
            className="absolute right-0 top-0 w-1/4 h-full cursor-pointer z-20 hover:bg-black/10 transition-colors flex items-center justify-end pr-2"
          >
            <i className="hn hn-chevron-right text-white/0 hover:text-white/50 text-2xl"></i>
          </div>
        </>
      )}

      {displayImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {displayImages.map((_, idx) => (
            <div
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`w-3 h-3 cursor-pointer transition-all ${
                idx === currentIndex
                  ? "bg-white"
                  : imageStates[idx] === 'error'
                    ? "bg-red-500/50"
                    : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};