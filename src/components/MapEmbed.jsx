// src/components/MapEmbed.jsx
import { useState, useEffect } from 'react';

export default function MapEmbed({ src, fullscreenUrl, proxyPath = '/map-proxy/' }) {
  const [mapStatus, setMapStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'
  const [useProxy, setUseProxy] = useState(true);
  
  // Визначаємо чи потрібен проксі (HTTP на HTTPS)
  const needsProxy = typeof window !== 'undefined' && 
    window.location.protocol === 'https:' && 
    src.startsWith('http://');
  
  // Формуємо фінальний URL
  const getProxiedUrl = (url) => {
    if (!needsProxy) return url;
    
    try {
      const urlObj = new URL(url);
      return `${proxyPath}${urlObj.pathname}${urlObj.search}`;
    } catch {
      return proxyPath;
    }
  };
  
  const iframeSrc = useProxy && needsProxy ? getProxiedUrl(src) : src;
  
  const handleIframeLoad = () => {
    setMapStatus('loaded');
  };
  
  const handleIframeError = () => {
    setMapStatus('error');
    // Якщо проксі не працює, показуємо fallback
    if (useProxy) {
      setUseProxy(false);
    }
  };

  return (
    <div className="w-full h-[80vh] md:h-[90vh] relative bg-[#1a1a2e] overflow-hidden">
      {/* Loading стан */}
      {mapStatus === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a2e] z-20">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-[#c5629a] border-t-transparent mx-auto mb-4"></div>
            <p className="minecraftFont text-white text-lg">Завантаження карти...</p>
          </div>
        </div>
      )}
      
      {/* Error стан */}
      {mapStatus === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a2e] z-20">
          <div className="text-center px-6">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="minecraftFont text-white text-xl mb-4">
              Карта недоступна у вбудованому режимі
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Через обмеження безпеки браузера, карта не може бути завантажена напряму. 
              Відкрийте її в новому вікні для повного доступу.
            </p>
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
          src={iframeSrc}
          title="Embedded Map"
          className="w-full h-full border-0"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      )}
      
      {/* Fullscreen кнопка */}
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
            <span>Відкрити на весь екран</span>
          </a>
        </div>
      )}
      
      {/* Індикатор що карта працює через проксі */}
      {mapStatus === 'loaded' && needsProxy && useProxy && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-green-600/80 text-white text-xs px-2 py-1 rounded">
            ✓ Проксі активний
          </span>
        </div>
      )}
    </div>
  );
}