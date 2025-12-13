// src/components/CapeWingsViewer.js

import React, { useState } from 'react';

// --- Helper Components ---
function Toggle({ value, onChange, options }) {
  return (
    <div className="inline-flex gap-2">
      {options.map((option) => (
        <div 
          key={option.value}
          className={`bg-gray-700/50 p-[1px] cornerCutSmall transition-all duration-200 ${
            value === option.value ? 'bg-pink-500/70' : 'hover:bg-pink-500/70'
          }`}
        >
          <button
            onClick={() => onChange(option.value)}
            className={`px-4 py-2 font-bold uppercase bg-gray-800/60 cornerCutSmall transition-all duration-200 ${
              value === option.value
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        </div>
      ))}
    </div>
  );
}

// Image Display Component with image-based border on hover and holographic effect
function ImageDisplay({ src, label }) {
    const [isHovered, setIsHovered] = useState(false);
    
    if (!src) {
      return (
        <div className="bg-red-800 p-[2px] cornerCut">
          <div className="h-96 bg-red-900/20 cornerCut flex items-center justify-center">
            <div className="text-center">
              <img src="/icons/point.png" alt="Error" className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-red-400 font-bold">Зображення відсутнє</p>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Outer border container - uses image as background on hover */}
        <div 
          className="p-[2px] cornerCut transition-all duration-300 relative overflow-hidden"
          style={{
            backgroundColor: isHovered ? 'transparent' : 'rgb(55, 65, 81)',
          }}
        >
          {/* Image as border background - only visible on hover */}
          <img
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute pointer-events-none transition-opacity duration-300"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '300%',
              height: '300%',
              objectFit: 'cover',
              filter: 'blur(30px) saturate(2) brightness(1.3)',
              opacity: isHovered ? 1 : 0,
              imageRendering: 'auto',
            }}
          />
          
          {/* Holographic shine on border - only on hover */}
          <div 
            className="absolute pointer-events-none transition-opacity duration-300"
            style={{
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: `linear-gradient(
                135deg,
                transparent 0%,
                transparent 45%,
                rgba(255, 255, 255, 0.6) 49%,
                rgba(255, 255, 255, 1) 50%,
                rgba(255, 255, 255, 0.6) 51%,
                transparent 55%,
                transparent 100%
              )`,
              animation: isHovered ? 'holographicSlide 2.5s linear infinite' : 'none',
              opacity: isHovered ? 1 : 0,
            }}
          />
          
          {/* Rainbow holographic effect on border - only on hover */}
          <div 
            className="absolute pointer-events-none transition-opacity duration-300"
            style={{
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: `linear-gradient(
                135deg,
                transparent 0%,
                transparent 42%,
                rgba(255, 0, 128, 0.5) 46%,
                rgba(0, 255, 255, 0.5) 50%,
                rgba(255, 255, 0, 0.5) 54%,
                transparent 58%,
                transparent 100%
              )`,
              animation: isHovered ? 'holographicSlide 2.5s linear infinite' : 'none',
              opacity: isHovered ? 0.8 : 0,
              mixBlendMode: 'overlay',
            }}
          />
          
          {/* Inner container */}
          <div className="h-96 bg-[#1a1a2e] cornerCut overflow-hidden flex items-center justify-center relative">
            
            {/* Glow layer inside - scaled up blurred image */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ opacity: 0.6 }}
            >
              <img
                src={src}
                alt=""
                aria-hidden="true"
                style={{
                  width: '200%',
                  height: '200%',
                  objectFit: 'contain',
                  filter: 'blur(50px) saturate(1.5) brightness(1.1)',
                  imageRendering: 'auto',
                }}
              />
            </div>
            
            {/* Dark vignette overlay for better contrast */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 20%, rgba(26,26,46,0.7) 100%)',
              }}
            />
            
            {/* Main sharp image */}
            <img
              src={src}
              alt={label || "Render"}
              className="relative z-10"
              style={{
                maxWidth: '80%',
                maxHeight: '80%',
                objectFit: 'contain',
                imageRendering: 'pixelated',
                filter: 'drop-shadow(4px 6px 0px rgba(0,0,0,0.5))',
              }}
            />
          </div>
        </div>
        
        {/* Label */}
        {label && (
          <div 
            className={`mt-3 text-center text-sm font-bold uppercase transition-all duration-300 ${
              isHovered ? 'text-white' : 'text-gray-400'
            }`}
          >
            {label}
          </div>
        )}
        
        {/* Keyframes style */}
        <style jsx>{`
          @keyframes holographicSlide {
            0% {
              transform: translateX(-100%) translateY(-100%);
            }
            100% {
              transform: translateX(100%) translateY(100%);
            }
          }
        `}</style>
      </div>
    );
}

// --- Main CapeWingsViewer Component ---
export default function CapeWingsViewer(props) {
  console.log("CapeWingsViewer received:", props);

  const { capefrontimage, capebackimage, wingsimage } = props;
  const [capeSide, setCapeSide] = useState('front');

  const hasCape = capefrontimage || capebackimage;
  const hasWings = wingsimage;
  const hasBothCapeImages = capefrontimage && capebackimage;

  if (!hasCape && !hasWings) {
    return (
      <div className="block my-6 p-6 bg-orange-600/50 pixelcut">
        <div className="flex items-start gap-3">
          <img src="/icons/point.png" alt="Warning" className="w-6 h-6 mt-1" />
          <div>
            <h3 className="font-bold text-gray-200 text-xl mb-2">Помилка CapeWingsViewer</h3>
            <p className="text-gray-300">
              Не надано жодних зображень (capefrontimage, capebackimage, wingsimage). 
              Перевірте markdown розмітку та відповідність компонентів.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const activeCapeImage = capeSide === 'front' ? capefrontimage : capebackimage;
  
  return (
    <div className="block my-8" style={{ display: 'block', clear: 'both' }}>
      {/* Header section - only show if both cape images exist */}
      {hasBothCapeImages && (
        <section className="bg-green-900/20 p-6 cornerCut mb-6">
          <div>
            <h2 className="text-xl font-bold text-pink-400 mb-4">Сторона плащу</h2>
            <Toggle
              value={capeSide}
              onChange={setCapeSide}
              options={[
                { value: 'back', label: 'Ззаду' },
                { value: 'front', label: 'Спереду' },
              ]}
            />
          </div>
        </section>
      )}
      
      {/* Image Display Area */}
      <div className="relative">
        {hasWings && hasCape ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageDisplay 
              src={wingsimage} 
              label="Крила" 
            />
            <ImageDisplay 
              src={activeCapeImage} 
              label={hasBothCapeImages ? (capeSide === 'front' ? 'Плащ (спереду)' : 'Плащ (ззаду)') : 'Плащ'} 
            />
          </div>
        ) : hasWings ? (
          <ImageDisplay 
            src={wingsimage} 
            label="Крила" 
          />
        ) : hasCape ? (
          <ImageDisplay 
            src={activeCapeImage} 
            label={hasBothCapeImages ? (capeSide === 'front' ? 'Плащ (спереду)' : 'Плащ (ззаду)') : 'Плащ'} 
          />
        ) : null}
      </div>
    </div>
  );
}