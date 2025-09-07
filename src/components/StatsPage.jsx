// src/components/StatsPage.js
export default function StatsPage() {
  return (
    <div className="w-full h-[100vh] relative">
      <iframe
        src="/2025-stat.html"
        title="Статистика 2025"
        className="w-full h-full border-0"
      />
      
      <div className="absolute bottom-4 right-4 z-10">
        <a
          href="/2025-stat.html"
          target="_blank"
          rel="noopener noreferrer"
          className="minecraftFont bg-[#c5629a] hover:bg-[#b25587] text-white px-4 py-2 pixelated transition inline-block text-sm"
          style={{
            boxShadow: '2px 2px 0 #8b4570, 4px 4px 0 #000',
          }}
        >
          📊 Відкрити на весь екран
        </a>
      </div>
    </div>
  );
}
