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
  if (!totalSeconds || totalSeconds < 30) { // Наприклад, не показуємо, якщо менше 30 секунд
    return null; 
  }

  // Розраховуємо години, хвилини та секунди
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Формуємо рядок для відображення
  let timeString = 'Час на статтю:';
  
  if (hours > 0) {
    timeString += ` ${hours} ${getPlural(hours, 'година', 'години', 'годин')}`;
  }
  if (minutes > 0) {
    timeString += ` ${minutes} ${getPlural(minutes, 'хвилина', 'хвилини', 'хвилин')}`;
  }
  // Показуємо секунди, тільки якщо немає годин і хвилини менше 1 (тобто, якщо це єдиний показник)
  if (hours === 0 && minutes < 1 && seconds > 0) {
    timeString += ` ${seconds} ${getPlural(seconds, 'секунда', 'секунди', 'секунд')}`;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 italic">
      <i className="hn hn-clock text-base"></i>
      <span>{timeString}</span>
    </div>
  );
}