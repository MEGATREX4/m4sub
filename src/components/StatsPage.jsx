// src/components/StatsPage.js
export default function StatsPage() {
  return (
    <div className="flex-grow max-w-7xl mx-auto px-4 py-12">
      <iframe
        src="/2025-stats.html"
        title="Статистика 2025"
        className="w-full h-screen border-0"
      />
    </div>
  );
}
