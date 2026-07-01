export default function Hero({ title, subtitle, icon }) {
  return (
    <section className="relative w-full h-[calc(100vh-500px)] min-h-[280px] flex items-center justify-center overflow-hidden border-b-4 border-[#c5629a]">
      {/* Фонове зображення з легким ефектом наближення */}
      <img
        src="/hero.png"
        alt="Головне зображення"
        className="absolute inset-0 w-full h-full object-cover scale-105"
        style={{ 
          filter: "brightness(0.3) saturate(1.2)",
          imageRendering: "pixelated"
        }}
      />

      {/* Градієнт для глибини */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-transparent to-[#0a0a12]/60"></div>

      {/* Текст поверх зображення */}
      <div className="relative text-center px-6 z-10 max-w-4xl">
        {/* Маленький префікс над заголовком */}
        <span className="block text-[#c5629a] minecraftFont text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-2 sm:mb-4 drop-shadow-md">
          Офіційний запуск
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white minecraftFont mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 uppercase tracking-tighter">
          {icon && <i className={`hn ${icon} text-[#c5629a] text-2xl sm:text-4xl`}></i>}
          <span className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] leading-none">
            {title}
          </span>
        </h1>

        {subtitle && (
          <p className="text-sm sm:text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-md leading-relaxed uppercase tracking-wide opacity-90">
            {subtitle}
          </p>
        )}
      </div>

      {/* Декоративні елементи по боках (піксельні кути) */}
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-[#c5629a]/20"></div>
      <div className="absolute bottom-4 right-4 w-2 h-2 bg-[#c5629a]/20"></div>
    </section>
  );
}