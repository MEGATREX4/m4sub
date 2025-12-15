// ScrollToTopButton.jsx
import React, { useState, useEffect } from 'react';

export default function ScrollToTopButton({ footerRef }) {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomPosition, setBottomPosition] = useState('2rem');

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 400);

      if (footerRef?.current) {
        const windowHeight = window.innerHeight;
        const footerTop = footerRef.current.getBoundingClientRect().top;
        const footerVisibleHeight = windowHeight - footerTop;
        
        setBottomPosition(footerVisibleHeight > 0 ? `${footerVisibleHeight + 32}px` : '32px');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [footerRef]);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Повернутися нагору"
      className={`
        fixed right-6 z-50 w-12 h-12 
        bg-[#c5629a] hover:bg-[#f390d0] 
        flex items-center justify-center 
        shadow-lg transition-all duration-300 hover:scale-110 
        cornerCutSmall
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      style={{ bottom: bottomPosition }}
    >
      <i className="hn hn-chevron-up text-white text-2xl"></i>
    </button>
  );
}