// components/ArticleMeta.jsx
import React from 'react';

// Допоміжна функція для нормалізації даних
const normalizeContributors = (data, singleProp, singleMcProp) => {
  if (Array.isArray(data)) return data;
  if (typeof data === 'string') return [{ name: data, mc: data }];
  if (singleProp) return [{ name: singleProp, mc: singleMcProp }];
  return [];
};

// Компонент для відображення списку імен з міткою
function ContributorList({ label, contributors }) {
  if (!contributors || contributors.length === 0) return null;
  return (
    <span className="inline">
      <span className="font-semibold">{label}:</span>
      <span className="ml-1.5">
        {contributors.map((c, idx) => (
          <span key={idx}>
            {c.name}
            {idx < contributors.length - 1 && ", "}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function ArticleMeta({
  authors,
  author,
  authorImg,
  editors,
  date,
  variant = "compact", // 'compact' або 'full'
}) {
  // Нормалізуємо дані
  const normalizedAuthors = normalizeContributors(authors, author, authorImg);
  const normalizedEditors = normalizeContributors(editors);
  const allContributors = [...normalizedAuthors, ...normalizedEditors];
  const uniqueContributors = allContributors.filter(
    (person, index, self) => index === self.findIndex((p) => p.mc === person.mc)
  );

  // Форматування дати
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return d.toLocaleDateString("uk-UA", options);
  };
  
  // --- Повний вигляд для сторінки статті ---
  if (variant === 'full') {
    return (
        <div className="flex flex-col gap-3 text-sm text-gray-400 minecraftFont">
      <div className="flex items-center gap-3 text-sm text-gray-400 mt-4 flex-wrap">
        {/* 1. Блок з аватарами */}
        {uniqueContributors.length > 0 && (
          <div className="flex flex-shrink-0">
            {uniqueContributors.map((person, idx) => (
              <div key={person.mc || idx} className="relative" style={{ marginLeft: idx === 0 ? 0 : -8, zIndex: uniqueContributors.length - idx }} title={person.name}>
                {person.mc && <img src={`https://nmsr.nickac.dev/face/${person.mc}`} alt={person.name} className="w-8 h-8 object-cover cornerCutSmall"/>}
              </div>
            ))}
          </div>
        )}
        
        {/* 2. Текстовий блок */}
        <div className="flex items-center flex-wrap gap-x-3">
          <ContributorList label={normalizedAuthors.length > 1 ? "Автори" : "Автор"} contributors={normalizedAuthors} />
          <ContributorList label={normalizedEditors.length > 1 ? "Редактори" : "Редактор"} contributors={normalizedEditors} />
        </div>
      </div>
      <div>
        {date && (
            <div className="flex items-center gap-2">
              <i className="hn hn-calendar-days-solid"></i>
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
          )}
      </div>
      </div>
    );
  }

  // --- Компактний вигляд для карток новин ---
  return (
    <div className="flex flex-col gap-4 text-sm text-gray-400 mt-auto minecraftFont">
    <div className="flex items-center gap-2 text-sm text-gray-400 mt-auto flex-wrap">
      {/* Аватари */}
      {uniqueContributors.length > 0 && (
        <div className="flex">
          {uniqueContributors.map((a, idx) => (
            <div key={idx} className="relative" style={{ marginLeft: idx === 0 ? 0 : -8, zIndex: uniqueContributors.length - idx }}>
              {a.mc && <img src={`https://nmsr.nickac.dev/face/${a.mc}`} alt={a.name} className="w-8 h-8 object-cover"/>}
            </div>
          ))}
        </div>
      )}
      
      {/* Імена */}
      <span className="ml-1">
        {uniqueContributors.map((a, idx) => (
          <span key={idx}>
            {a.name}
            {idx < uniqueContributors.length - 1 && ", "}
          </span>
        ))}
      </span>
      
      
    </div>

    {/* Дата */}
      {date && (
        <>
          <time dateTime={date}>{formatDate(date)}</time>
        </>
      )}
    </div>
  );
}