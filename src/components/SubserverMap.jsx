// src/components/SubserverMap.jsx
import MapEmbed from "./MapEmbed";

export default function SubserverMap() {
  return (
    <div className="w-[calc(100vw-2rem)] max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-6">
      </div>
      
      <MapEmbed 
        src="http://sunrise.bubble.wtf:40010/api/shop" 
        fullscreenUrl="http://sunrise.bubble.wtf:40010/api/shop"
        proxyPath="/map-proxy/"
      />
      
      {/* Додаткові посилання */}
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <a
          href="http://sunrise.bubble.wtf:40010/api/shop"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c5629a] hover:text-[#e078b4] transition text-sm"
        >
          📍 map.m4sub.click
        </a>
        <a
          href="http://sunrise.bubble.wtf:40010/api/shop"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c5629a] hover:text-[#e078b4] transition text-sm"
        >
          🌅 Sunrise карта
        </a>
      </div>
    </div>
  );
}