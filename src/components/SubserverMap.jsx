import MapEmbed from "./MapEmbed";

export default function SubserverMap() {
  const SHOP_URL = "https://maps.m4sub.click/";

  return (
    <div className="w-[calc(100vw-2rem)] max-w-7xl mx-auto px-4 py-12">
      <MapEmbed 
        src={SHOP_URL}
        fullscreenUrl={SHOP_URL}
      />
      
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <a
          href={SHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c5629a] hover:text-[#e078b4] transition text-sm"
        >
          📍 Відкрити мапу в новому вікні
        </a>
      </div>
    </div>
  );
}