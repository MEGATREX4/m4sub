export default function Hero({ title, subtitle }) {
  return (
    <section
      className="relative text-center w-[calc(100vw-20px)] left-1/2 transform -translate-x-1/2"
    >
      <div className="relative w-full max-w-[100vw] overflow-hidden">
        <img
          src="/hero.png"
          alt="Головне зображення"
          className="w-full pixelcut object-cover md:max-h-[calc(100vh-600px)] md:min-h-[201px]"
          style={{ filter: "brightness(0.3)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-opacity-50">
          <h1 className="text-4xl font-bold text-gray-200 mb-4">{title}</h1>
          <p className="text-lg text-gray-200">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
