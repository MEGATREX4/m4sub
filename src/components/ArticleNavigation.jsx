import React from 'react';
import { Link } from 'react-router-dom';
import { BorderBox } from './donate/components/BorderBox';

function NavButton({ article, direction }) {
  const isPrev = direction === 'prev';
  
  // Якщо немає статті, повертаємо пустий div для збереження grid
  if (!article) {
    return <div className="hidden md:block" />;
  }
  
  return (
    <Link to={`/news/${article['page-link']}`} className="block group h-full">
      <BorderBox 
        borderColor="bg-[#c5629a]/50 group-hover:bg-[#c5629a]" 
        innerBg="bg-[#1a1a2e] group-hover:bg-[#2a1a3e]"
      >
        <div className={`p-4 h-full flex items-center gap-4 transition-all ${isPrev ? 'flex-row' : 'flex-row-reverse'}`}>
          {/* Arrow Icon */}
          <div className="w-12 h-12 flex items-center justify-center bg-[#c5629a]/20 group-hover:bg-[#c5629a] transition-all flex-shrink-0">
            <i className={`
              hn ${isPrev ? 'hn-arrow-left-solid' : 'hn-arrow-right-solid'} 
              text-[#c5629a] group-hover:text-white text-xl
              transition-transform ${isPrev ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}
            `}></i>
          </div>

          {/* Text Content */}
          <div className={`flex-1 min-w-0 ${isPrev ? 'text-left' : 'text-right'}`}>
            <div className={`text-xs text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2 ${!isPrev ? 'justify-end' : ''}`}>
              {isPrev ? (
                <>
                  <i className="hn hn-angle-left text-[8px]"></i>
                  Попередня
                </>
              ) : (
                <>
                  Наступна
                  <i className="hn hn-angle-right text-[8px]"></i>
                </>
              )}
            </div>
            
            <div 
              className="font-bold text-gray-300 group-hover:text-white line-clamp-2 transition-colors"
              title={article.title}
            >
              {article.title}
            </div>
          </div>
        </div>
      </BorderBox>
    </Link>
  );
}

export default function ArticleNavigation({ prevArticle, nextArticle }) {
  if (!prevArticle && !nextArticle) {
    return null;
  }

  return (
    <nav className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <i className="hn hn-compass text-[#c5629a]"></i>
        <span className="text-gray-400 text-sm minecraftFont">Навігація</span>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-gray-700/50 to-transparent"></div>
      </div>
      
      {/* Використовуємо CSS Grid з рівними рядками */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ gridAutoRows: '1fr' }}>
        <NavButton article={prevArticle} direction="prev" />
        <NavButton article={nextArticle} direction="next" />
      </div>
    </nav>
  );
}