// src/components/CapeWingsViewer.js

import React, { useState } from 'react';

// --- Helper Components ---
function TriToggle({ value, onChange, options }) {
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
            className={`px-6 py-2 font-bold uppercase bg-gray-800/60 cornerCutSmall transition-all duration-200 ${
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

// Image Display Component with double div border pattern
function ImageDisplay({ src, label }) {
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
      <div className="relative">
        {/* Outer div acts as border */}
        <div className="bg-gray-700 p-[1px] cornerCut">
          {/* Inner div with actual content - using dark purple/blue background */}
          <div className="h-96 bg-[#1a1a2e]/80 cornerCut overflow-hidden flex items-center justify-center p-4">
            <img
              src={src}
              alt={label || "Render"}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                imageRendering: 'pixelated',
                // Sharp drop shadow using filter
                filter: 'drop-shadow(6px 8px 0px rgba(0,0,0,0.3))',
              }}
            />
          </div>
        </div>
        {label && (
          <div className="mt-2 text-center text-sm text-gray-400 font-bold uppercase">
            {label}
          </div>
        )}
      </div>
    );
}

// --- Main CapeWingsViewer Component ---
export default function CapeWingsViewer(props) {
  console.log("CapeWingsViewer received:", props);

  const { capefrontimage, capebackimage, wingsimage } = props;
  const [displayMode, setDisplayMode] = useState('both');
  const [capeSide, setCapeSide] = useState('back');

  const hasCape = capefrontimage || capebackimage;
  const hasWings = wingsimage;

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

  const showCape = (displayMode === 'cape' || displayMode === 'both') && hasCape;
  const showWings = (displayMode === 'wings' || displayMode === 'both') && hasWings;
  const activeCapeImage = capeSide === 'front' ? capefrontimage : capebackimage;
  
  return (
    <div className="block my-8" style={{ display: 'block', clear: 'both' }}>
      {/* Header section matching ArticleMetaSection style */}
      <section className="bg-green-900/20 p-6 cornerCut mb-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-pink-400 mb-4">Режим відображення</h2>
            <TriToggle
              value={displayMode}
              onChange={setDisplayMode}
              options={[
                { value: 'wings', label: 'Крила' },
                { value: 'both', label: 'Обидва' },
                { value: 'cape', label: 'Плащ' },
              ]}
            />
          </div>
          
          {showCape && (hasCape && capefrontimage && capebackimage) && (
            <div className="flex-1">
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
          )}
        </div>
      </section>
      
      {/* Image Display Area */}
      <div className="relative">
        {showWings && showCape ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageDisplay src={wingsimage} label="Крила" />
            <ImageDisplay 
              src={activeCapeImage} 
              label={capeSide === 'front' ? 'Плащ (спереду)' : 'Плащ (ззаду)'} 
            />
          </div>
        ) : showWings ? (
          <ImageDisplay src={wingsimage} label="Крила" />
        ) : showCape ? (
          <ImageDisplay 
            src={activeCapeImage} 
            label={capeSide === 'front' ? 'Плащ (спереду)' : 'Плащ (ззаду)'} 
          />
        ) : null}
      </div>
    </div>
  );
}