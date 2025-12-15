import React from 'react';

// Допоміжна функція для правильного відмінювання
const getPlural = (number, one, few, many) => {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return many;
  if (n1 > 1 && n1 < 5) return few;
  if (n1 === 1) return one;
  return many;
};

export default function ReadingTime({ totalSeconds }) {
  // Не відображаємо, якщо час занадто малий
  if (!totalSeconds || totalSeconds < 30) {
    return null; 
  }

  // Розраховуємо години, хвилини та секунди
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Формуємо частини рядка
  const parts = [];
  
  if (hours > 0) {
    parts.push(`${hours} ${getPlural(hours, 'година', 'години', 'годин')}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} ${getPlural(minutes, 'хвилина', 'хвилини', 'хвилин')}`);
  }
  // Показуємо секунди, тільки якщо немає годин і хвилини менше 1
  if (hours === 0 && minutes < 1 && seconds > 0) {
    parts.push(`${seconds} ${getPlural(seconds, 'секунда', 'секунди', 'секунд')}`);
  }

  const timeString = parts.join(' ');

  return (
    <div className="inline-flex items-center gap-2 text-sm bg-[#1a1a2e] border border-gray-700/30 px-3 py-1.5">
      <i className="hn hn-clock text-[#c5629a]"></i>
      <span className="text-gray-400">{timeString}</span>
    </div>
  );
}