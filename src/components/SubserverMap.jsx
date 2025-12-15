import MapEmbed from "./MapEmbed";

export default function SubserverMap() {
  // Вказуємо пряму HTTP адресу з портом.
  // Саме цю адресу проксі буде завантажувати.
  const CURRENT_MAP_URL = "http://sunrise.bubble.wtf:40010/";

  return (
    <div className="w-[calc(100vw-2rem)] max-w-7xl mx-auto px-4 py-12">
      <MapEmbed 
        src={CURRENT_MAP_URL}
        fullscreenUrl={CURRENT_MAP_URL}
      />
      
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <a
          href={CURRENT_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c5629a] hover:text-[#e078b4] transition text-sm"
        >
          📍 Відкрити оригінальну карту (HTTP)
        </a>
      </div>
    </div>
  );
}