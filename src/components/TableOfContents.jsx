import React, { useState } from 'react';

export default function TableOfContents({ headings }) {
  // Стан для відстеження, чи розгорнуто список
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Кількість пунктів, які видно за замовчуванням
  const visibleCount = 4;

  if (!headings || headings.length === 0) {
    return null;
  }

  // Визначаємо, які пункти показувати
  const visibleHeadings = isExpanded ? headings : headings.slice(0, visibleCount);
  // Перевіряємо, чи є ще пункти для відображення
  const hasMore = headings.length > visibleCount;

  return (
    <section className="my-8 bg-green-900/20 p-6 md:p-8 cornerCut">
      {/* Заголовок і кнопка "розгорнути" в одному flex-контейнері */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-pink-400">Зміст статті</h2>
        
        {/* Показуємо кнопку, тільки якщо є що розгортати */}
        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label={isExpanded ? "Згорнути зміст" : "Розгорнути зміст"}
          >
            <i className={`hn ${isExpanded ? 'hn-angle-up-solid' : 'hn-angle-down-solid'} text-2xl`}></i>
          </button>
        )}
      </div>
      
      {/* Список пунктів змісту */}
      <div className="flex flex-col gap-3">
        {visibleHeadings.map((heading) => (
          <div key={heading.slug} className={`${heading.level === 3 ? 'ml-4' : ''}`}>
            <div className="bg-gray-700/50 p-[1px] cornerCutSmall transition-all duration-200 hover:bg-pink-500/70">
              <a 
                href={`#${heading.slug}`}
                className="block w-full h-full p-3 bg-gray-800/60 cornerCutSmall text-gray-300 no-underline"
              >
                <span className="flex items-center gap-3">
                  <img src="/icons/point.png" alt="Point icon" className="invert w-4 h-4 flex-shrink-0" />
                  <span>{heading.text}</span>
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопка "Показати ще", якщо список згорнутий */}
      {hasMore && !isExpanded && (
        <div className="mt-4 text-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="text-pink-400 hover:text-pink-300 font-semibold transition-colors"
            >
              Показати ще {headings.length - visibleCount}...
            </button>
        </div>
      )}

    </section>
  );
}