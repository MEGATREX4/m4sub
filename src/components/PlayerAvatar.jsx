import React from 'react';

export default function PlayerAvatar({ username }) {
  // `username` може містити екрануючі слеші (напр., "DONKI\_F").
  // Очищуємо його ТІЛЬКИ для API-запиту, видаляючи всі символи '\'.
  const apiUsername = username.replace(/\\/g, '');
  const apiUrl = `https://nmsr.nickac.dev/face/${apiUsername}`;
  
  return (
    <img
      src={apiUrl}
      alt={`Аватар @${apiUsername}`} // Використовуємо чистий нік для alt-тексту
      className="player-avatar"
      loading="lazy"
      onError={(e) => { 
        e.target.style.display = 'none'; 
      }}
    />
  );
}