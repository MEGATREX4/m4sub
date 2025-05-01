export default function Hero({ title, subtitle }) {
  return (
    <section className="relative w-full h-[calc(100vh-600px)] min-h-[201px] flex items-center justify-center">
      {/* Фонове зображення */}
      <img
        src="/hero.png"
        alt="Головне зображення"
        className="absolute inset-0 w-full h-full object-cover pixelcut"
        style={{ filter: "brightness(0.3)" }}
      />

      {/* Текст поверх зображення */}
      <div className="relative text-center px-4">
        <h1 className="text-4xl font-bold text-gray-200 mb-4">{title}</h1>
        <p className="text-lg text-gray-200">{subtitle}</p>
      </div>
    </section>
  );
}
