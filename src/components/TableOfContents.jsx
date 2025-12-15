// TableOfContents.jsx
import React, { useState } from 'react';
import { BorderBox } from './donate/components/BorderBox';

export default function TableOfContents({ headings }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleCount = 4;

  if (!headings || headings.length === 0) return null;

  const visibleHeadings = isExpanded ? headings : headings.slice(0, visibleCount);
  const hasMore = headings.length > visibleCount;

  return (
    <section className="my-8">
      <BorderBox borderColor="bg-[#c5629a]" innerBg="bg-[#0a0a12]">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-[#c5629a] minecraftFont flex items-center gap-2">
              <i className="hn hn-list"></i>
              Зміст статті
            </h2>
            {hasMore && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 text-gray-400 hover:text-[#c5629a] transition-colors"
              >
                <i className={`hn ${isExpanded ? 'hn-chevron-up' : 'hn-chevron-down'} text-xl`}></i>
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            {visibleHeadings.map((heading) => (
              <a 
                key={heading.slug} 
                href={`#${heading.slug}`} 
                className={`
                  block p-3 bg-[#1a1a2e] hover:bg-[#2a1a3e] border-l-2 transition-colors
                  ${heading.level === 3 ? 'ml-4 border-[#c5629a]/30' : 'border-[#c5629a]'}
                `}
              >
                <span className="flex items-center gap-3 text-gray-300 hover:text-white">
                  <i className="hn hn-angle-right text-[#c5629a] text-xs"></i>
                  <span>{heading.text}</span>
                </span>
              </a>
            ))}
          </div>

          {hasMore && !isExpanded && (
            <button 
              onClick={() => setIsExpanded(true)} 
              className="mt-4 text-[#c5629a] hover:text-[#f390d0] font-bold minecraftFont transition-colors w-full text-center"
            >
              Показати ще {headings.length - visibleCount}...
            </button>
          )}
        </div>
      </BorderBox>
    </section>
  );
}