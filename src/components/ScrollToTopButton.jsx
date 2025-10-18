import React, { useState, useEffect } from 'react';

export default function ScrollToTopButton({ footerRef }) {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomPosition, setBottomPosition] = useState('2rem'); // Початковий відступ 32px (bottom-8)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      // 1. Логіка видимості кнопки
      setIsVisible(window.pageYOffset > 400);

      // 2. Логіка позиціонування відносно футера
      if (footerRef && footerRef.current) {
        // Висота видимої частини вікна
        const windowHeight = window.innerHeight;
        // Позиція верху футера відносно вікна
        const footerTop = footerRef.current.getBoundingClientRect().top;
        
        // Розраховуємо, наскільки футер вже "виїхав" на екран
        const footerVisibleHeight = windowHeight - footerTop;
        
        // Якщо футер видно на екрані...
        if (footerVisibleHeight > 0) {
          // ...встановлюємо відступ від низу = висота видимої частини футера + наш стандартний відступ (32px)
          setBottomPosition(`${footerVisibleHeight + 32}px`);
        } else {
          // ...інакше, повертаємо стандартний відступ
          setBottomPosition('32px');
        }
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
      onClick={scrollToTop}
      aria-label="Повернутися нагору"
      className={`
        fixed right-8 z-50
        w-16 h-16 bg-[#c5629a] hover:bg-[#f390d0] backdrop-blur-sm flex items-center justify-center 
        shadow-lg transition-all duration-300 hover:scale-110 
        focus:outline-none focus:ring-2 focus:ring-[#bb659d]
        cornerCut
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      style={{
        // Застосовуємо динамічно розрахований відступ
        bottom: bottomPosition,
      }}
    >
      <i className="hn hn-angle-up-solid text-[#e5e7eb] text-4xl"></i>
    </button>
  );
}