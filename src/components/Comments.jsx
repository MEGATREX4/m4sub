import React, { useEffect, useRef, useState } from 'react';
import { BorderBox } from './donate/components/BorderBox';
import './Comments.css';

export default function Comments({ title, slug }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const observerTarget = useRef(null);
  const iframeRef = useRef(null);

  // Lazy loading with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoaded) {
          setIsLoaded(true);
        }
      },
      { threshold: 0, rootMargin: '200px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [isLoaded]);

  // Load Giscus script
  useEffect(() => {
    if (!isLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'MEGATREX4/m4sub');
    script.setAttribute('data-repo-id', 'R_kgDONmjQhg');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDONmjQhs4CxgZy');
    script.setAttribute('data-mapping', 'url');
    script.setAttribute('data-strict', '1');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '1');
    script.setAttribute('data-input-position', 'top');
    
    const themeUrl = `https://cdn.jsdelivr.net/gh/MEGATREX4/m4sub@main/public/giscus-m4sub-theme4.css`;
    script.setAttribute('data-theme', themeUrl);
    
    script.setAttribute('data-lang', 'uk');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    const comments = document.getElementById('giscus-comments');
    if (comments) {
      comments.innerHTML = '';
      comments.appendChild(script);
    }

    return () => {
      const commentsEl = document.getElementById('giscus-comments');
      if (commentsEl) {
        commentsEl.innerHTML = '';
      }
    };
  }, [isLoaded, slug]);

  // Listen to Giscus events
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'https://giscus.app') return;
      if (!(typeof event.data === 'object' && event.data.giscus)) return;

      const giscusData = event.data.giscus;

      if ('discussion' in giscusData) {
        const count = giscusData.discussion.totalCommentCount;
        setCommentCount(count);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <section className="mt-8" ref={observerTarget}>
      <BorderBox borderColor="bg-[#c5629a]/30" innerBg="bg-[#0a0a12]">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <i className="hn hn-comments-solid text-[#c5629a] text-xl"></i>
            <h2 className="text-xl font-bold text-[#c5629a] minecraftFont">
              Коментарі
            </h2>
            {commentCount > 0 && (
              <span className="bg-[#c5629a]/20 text-[#f390d0] text-xs px-2 py-0.5">
                {commentCount}
              </span>
            )}
            <div className="flex-1 h-[2px] bg-gradient-to-r from-[#c5629a]/50 to-transparent"></div>
          </div>

          {/* Content */}
          {!isLoaded ? (
            <div className="flex flex-col items-center justify-center py-12 gap-6">
              {/* Loading skeleton */}
              <div className="space-y-4 w-full max-w-md">
                <div className="h-4 bg-gray-700/50 w-3/4 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-700/50 w-1/2 mx-auto animate-pulse"></div>
                <div className="h-20 bg-gray-700/50 w-full mt-4 animate-pulse"></div>
              </div>
              
              <button 
                onClick={() => setIsLoaded(true)}
                className="px-6 py-3 bg-[#c5629a] hover:bg-[#f390d0] text-white font-bold minecraftFont transition-colors flex items-center gap-2"
              >
                <i className="hn hn-comments"></i>
                Завантажити коментарі
              </button>
            </div>
          ) : (
            <div 
              id="giscus-comments" 
              className="giscus-wrapper"
              ref={iframeRef}
            ></div>
          )}

          {/* Login Prompt */}
          <div className="mt-6 pt-4 border-t border-gray-700/30">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <i className="hn hn-github"></i>
              Щоб залишити коментар, увійдіть через GitHub
            </p>
          </div>
        </div>
      </BorderBox>
    </section>
  );
}