import React from 'react';
import { Link } from 'react-router-dom';

// Компонент для однієї кнопки навігації
function NavButton({ article, direction }) {
  if (!article) return <div />; // Пустий div для збереження сітки

  const isPrev = direction === 'prev';
  
  return (
    <Link 
      to={`/news/${article['page-link']}`}
      className={`
        group flex items-center justify-between gap-4 p-4 
        bg-[#c5629a] hover:bg-[#f390d0] 
        transition-colors duration-200 cornerCut
      `}
    >
      {/* Іконка-стрілка для попередньої статті */}
      {isPrev && (
        <i className="hn hn-arrow-left-solid text-[#e5e7eb] text-4xl transition-transform group-hover:-translate-x-1"></i>
      )}

      {/* Блок з текстом */}
      <div className={`flex-1 ${isPrev ? 'text-left' : 'text-right'}`}>
        <div className="text-xs text-[#e5e7eb]/70 uppercase tracking-wider">
          {isPrev ? 'Попередня стаття' : 'Наступна стаття'}
        </div>
        
        {/* --- ГОЛОВНА ЗМІНА ТУТ --- */}
        <div 
          className="mt-1 font-bold text-[#e5e7eb] line-clamp-2"
          title={article.title} // Додаємо повний заголовок у спливаючу підказку
        >
          {article.title}
        </div>
        
      </div>

      {/* Іконка-стрілка для наступної статті */}
      {!isPrev && (
        <i className="hn hn-arrow-right-solid text-[#e5e7eb] text-4xl transition-transform group-hover:translate-x-1"></i>
      )}
    </Link>
  );
}

export default function ArticleNavigation({ prevArticle, nextArticle }) {
  // Не рендеримо нічого, якщо немає обох статей
  if (!prevArticle && !nextArticle) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
      <NavButton article={prevArticle} direction="prev" />
      <NavButton article={nextArticle} direction="next" />
    </div>
  );
}