import React from 'react';

// Допоміжна функція для нормалізації даних
const normalizeContributors = (data, singleProp, singleMcProp) => {
  if (Array.isArray(data)) return data;
  if (typeof data === 'string') return [{ name: data, mc: data }];
  if (singleProp) return [{ name: singleProp, mc: singleMcProp }];
  return [];
};

export default function ArticleContributors({ authors, author, authorImg, editors }) {
  // Нормалізуємо авторів та редакторів
  const normalizedAuthors = normalizeContributors(authors, author, authorImg);
  const normalizedEditors = normalizeContributors(editors);
  const allContributors = [...normalizedAuthors, ...normalizedEditors];
  
  // Видаляємо дублікати для аватарів
  const uniqueContributors = allContributors.filter(
    (person, index, self) => index === self.findIndex((p) => p.mc === person.mc)
  );

  if (uniqueContributors.length === 0) {
    return null;
  }

  // Компактний вигляд: аватари та імена через кому
  return (
    <div className="flex items-center gap-1 text-sm text-gray-400 flex-wrap">
      {/* Аватари */}
      <div className="flex">
        {uniqueContributors.map((person, idx) => (
          <div
            key={person.mc || idx}
            className="relative"
            style={{ marginLeft: idx === 0 ? 0 : -8, zIndex: uniqueContributors.length - idx }}
            title={person.name}
          >
            {person.mc && <img src={`https://nmsr.nickac.dev/face/${person.mc}`} alt={person.name} className="w-8 h-8 object-cover"/>}
          </div>
        ))}
      </div>
      
      {/* Імена */}
      <span className="ml-2">
        {uniqueContributors.map((person, idx) => (
          <span key={idx}>
            {person.name}
            {idx < uniqueContributors.length - 1 && ", "}
          </span>
        ))}
      </span>
    </div>
  );
}