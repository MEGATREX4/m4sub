import React, { useState } from 'react';

// No longer needs to import AlsoOnLinks or ShareButtons
export default function TableOfContents({ headings }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleCount = 4;

  // If there are no headings, it renders nothing.
  if (!headings || headings.length === 0) {
    return null;
  }

  const visibleHeadings = isExpanded ? headings : headings.slice(0, visibleCount);
  const hasMore = headings.length > visibleCount;

  return (
    <section className="my-8 bg-green-900/20 p-6 cornerCut">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-pink-400">Зміст статті</h2>
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
      
      <div className="flex flex-col gap-3">
        {visibleHeadings.map((heading) => (
          <div key={heading.slug} className={`${heading.level === 3 ? 'ml-4' : ''}`}>
            <div className="bg-gray-700/50 p-[1px] cornerCutSmall transition-all duration-200 hover:bg-pink-500/70">
              <a href={`#${heading.slug}`} className="block w-full h-full p-3 bg-gray-800/60 cornerCutSmall text-gray-300 no-underline">
                <span className="flex items-center gap-3">
                  <img src="/icons/point.png" alt="Point icon" className="invert w-4 h-4 flex-shrink-0" />
                  <span>{heading.text}</span>
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {hasMore && !isExpanded && (
        <div className="mt-4 text-center">
          <button onClick={() => setIsExpanded(true)} className="text-pink-400 hover:text-pink-300 font-semibold transition-colors">
            Показати ще {headings.length - visibleCount}...
          </button>
        </div>
      )}
    </section>
  );
}