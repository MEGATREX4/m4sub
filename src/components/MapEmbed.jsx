// src/components/MapEmbed.jsx
import { useState, useRef, useEffect } from 'react';

export default function MapEmbed({ src, fullscreenUrl }) {
  const [mapStatus, setMapStatus] = useState('loading');
  const [errorDetails, setErrorDetails] = useState(null);
  const iframeRef = useRef(null);
  
  // Визначаємо чи потрібен проксі
  const needsProxy = typeof window !== 'undefined' && 
    window.location.protocol === 'https:' && 
    src.startsWith('http://');
  
  // Формуємо URL через проксі
  const getProxiedUrl = (url) => {
    if (!needsProxy) return url;
    return `/map-proxy?url=${encodeURIComponent(url)}`;
  };
  
  const iframeSrc = getProxiedUrl(src);
  
  // Перевіряємо чи проксі працює
  useEffect(() => {
    if (!needsProxy) {
      return;
    }
    
    // Тестовий запит до проксі
    fetch(iframeSrc, { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        console.log('Proxy test successful');
      })
      .catch(error => {
        console.error('Proxy test failed:', error);
        setErrorDetails(error.message);
        setMapStatus('error');
      });
  }, [iframeSrc, needsProxy]);
  
  const handleIframeLoad = () => {
    // Додаткова перевірка - спробуємо отримати контент
    try {
      // Це може не спрацювати через CORS, але якщо iframe завантажився - ок
      setMapStatus('loaded');
    } catch (e) {
      console.log('Cross-origin iframe loaded (normal)');
      setMapStatus('loaded');
    }
  };
  
  const handleIframeError = () => {
    setMapStatus('error');
    setErrorDetails('Failed to load iframe');
  };

  return (
    <div className="w-full h-[80vh] md:h-[90vh] relative bg-[#1a1a2e] overflow-hidden">
      {/* Loading */}
      {mapStatus === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a2e] z-20">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-[#c5629a] border-t-transparent mx-auto mb-4"></div>
            <p className="minecraftFont text-white text-lg">Завантаження карти...</p>
            {needsProxy && (
              <p className="text-gray-500 text-sm mt-2">Через HTTPS проксі...</p>
            )}
          </div>
        </div>
      )}
      
      {/* Error */}
      {mapStatus === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a2e] z-20">
          <div className="text-center px-6">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="minecraftFont text-white text-xl mb-4">
              Карта недоступна
            </h3>
            <p className="text-gray-400 mb-2 max-w-md">
              Не вдалося завантажити карту через проксі.
            </p>
            {errorDetails && (
              <p className="text-red-400 text-sm mb-4 font-mono">
                {errorDetails}
              </p>
            )}
            <a
              href={fullscreenUrl || src}
              target="_blank"
              rel="noopener noreferrer"
              className="minecraftFont bg-[#c5629a] hover:bg-[#b25587] text-white px-6 py-3 pixelated transition inline-block"
              style={{
                boxShadow: '3px 3px 0 #8b4570, 5px 5px 0 #000',
              }}
            >
              🗺️ Відкрити карту в новому вікні
            </a>
          </div>
        </div>
      )}
      
      {/* Iframe */}
      {mapStatus !== 'error' && (
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          title="Embedded Map"
          className="w-full h-full border-0"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      )}
      
      {/* Fullscreen button */}
      {mapStatus === 'loaded' && fullscreenUrl && (
        <div className="absolute bottom-4 right-4 z-10">
          <a
            href={fullscreenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="minecraftFont bg-[#c5629a] hover:bg-[#b25587] text-white px-4 py-2 pixelated transition inline-flex items-center gap-2 text-sm"
            style={{
              boxShadow: '2px 2px 0 #8b4570, 4px 4px 0 #000',
            }}
          >
            <span>🗺️</span>
            <span>На весь екран</span>
          </a>
        </div>
      )}
      
      {/* Debug info */}
      {mapStatus === 'loaded' && (
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {needsProxy && (
            <span className="bg-blue-600/80 text-white text-xs px-2 py-1">
              🔒 HTTPS Проксі
            </span>
          )}
        </div>
      )}
    </div>
  );
}