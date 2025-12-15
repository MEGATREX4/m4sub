export default function Hero({ title, subtitle, icon }) {
  return (
    <section className="relative w-full h-[calc(100vh-600px)] min-h-[220px] flex items-center justify-center overflow-hidden">
      {/* Фонове зображення */}
      <img
        src="/hero.png"
        alt="Головне зображення"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          filter: "brightness(0.25)",
          imageRendering: "pixelated"
        }}
      />

      {/* Dark fade from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/40 to-transparent"></div>

      {/* Текст поверх зображення */}
      <div className="relative text-center px-4 z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white minecraftFont mb-3 flex items-center justify-center gap-3">
          {icon && <i className={`hn ${icon} text-[#c5629a]`}></i>}
          <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{title}</span>
        </h1>
        {subtitle && (
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}