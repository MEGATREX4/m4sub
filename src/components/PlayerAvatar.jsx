import React from 'react';

export default function PlayerAvatar({ username, size = 'default', className = '' }) {
  // `username` може містити екрануючі слеші (напр., "DONKI\_F").
  // Очищуємо його ТІЛЬКИ для API-запиту, видаляючи всі символи '\'.
  const apiUsername = username.replace(/\\/g, '');
  const apiUrl = `https://nmsr.nickac.dev/face/${apiUsername}`;
  
  // Визначаємо класи розміру
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'player-avatar', // використовує CSS класи
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
    fill: 'w-full h-full'  // NEW: заповнює батьківський контейнер
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.default;
  
  return (
    <img
      src={apiUrl}
      alt={`Аватар @${apiUsername}`}
      className={`${sizeClass} ${className} object-cover`}
      style={{ imageRendering: 'pixelated' }}
      loading="lazy"
      onError={(e) => { 
        e.target.style.display = 'none'; 
      }}
    />
  );
}