// src/components/Comments.jsx
import React, { useEffect, useRef, useState } from 'react';
import './Comments.css';

export default function Comments({ title, slug }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState('dark');
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

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
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
    script.setAttribute('data-strict', '1'); // Enable strict matching for better accuracy
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '1'); // Enable metadata events
    script.setAttribute('data-input-position', 'top');
    
    // Use custom theme 
    const themeUrl = `https://cdn.jsdelivr.net/gh/MEGATREX4/m4sub@main/public/giscus-m4sub-theme2.css`;
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
      const comments = document.getElementById('giscus-comments');
      if (comments) {
        comments.innerHTML = '';
      }
    };
  }, [isLoaded, slug]);

  // Listen to Giscus events
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'https://giscus.app') return;
      if (!(typeof event.data === 'object' && event.data.giscus)) return;

      const giscusData = event.data.giscus;

      // Handle discussion metadata
      if ('discussion' in giscusData) {
        console.log('Discussion loaded:', giscusData.discussion);
        // You can update your UI based on comment count, reactions, etc.
        const commentCount = giscusData.discussion.totalCommentCount;
        const reactionCount = giscusData.discussion.totalReactionCount;
        
        // Update comment count badge if you have one
        const badge = document.querySelector('.comment-count-badge');
        if (badge) {
          badge.textContent = commentCount;
        }
      }

      // Handle errors
      if ('error' in giscusData) {
        console.error('Giscus error:', giscusData.error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Function to send messages to Giscus
  const sendMessageToGiscus = (message) => {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
  };

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Update Giscus theme dynamically
    sendMessageToGiscus({
      setConfig: {
        theme: newTheme === 'dark' 
          ? `${window.location.origin}/giscus-m4sub-theme.css`
          : 'light'
      }
    });
  };

  return (
    <div className="comments-section" ref={observerTarget}>
      <div className="comments-header">
        <div className="flex items-center justify-between">
          <h2 className="comments-title">
            <i className="hn hn-comments-solid mr-3"></i>
            Коментарі
            <span className="comment-count-badge ml-3 text-sm bg-pink-500/20 px-2 py-1"></span>
          </h2>
          
          {/* Optional: Theme toggle button */}
          {false && ( // Set to true if you want theme toggle
            <button 
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label="Toggle theme"
            >
              <i className={`hn hn-${theme === 'dark' ? 'sun' : 'moon'}-solid`}></i>
            </button>
          )}
        </div>
        <div className="comments-divider"></div>
      </div>

      {!isLoaded ? (
        <div className="comments-loading">
          <div className="comments-loading-placeholder">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
              <div className="h-20 bg-gray-700/50 rounded w-full"></div>
            </div>
            <button 
              onClick={() => setIsLoaded(true)}
              className="load-comments-btn"
            >
              <i className="hn hn-comments mr-2"></i>
              Завантажити коментарі
            </button>
          </div>
        </div>
      ) : (
        <div 
          id="giscus-comments" 
          className="giscus-wrapper"
          ref={iframeRef}
        ></div>
      )}

      {/* Optional: Login prompt for non-authenticated users */}
      <div className="comment-login-prompt">
        <p className="text-sm text-gray-400 mt-4">
          <i className="hn hn-info-circle mr-2"></i>
          Щоб залишити коментар, увійдіть через ваш GitHub акаунт
        </p>
      </div>
    </div>
  );
}