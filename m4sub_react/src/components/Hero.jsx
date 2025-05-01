export default function Hero() {
    return (
      <section className="z-[-1] relative text-center cornerCut w-full max-w-[100vw] overflow-hidden">
        <div className="relative w-full max-w-[100vw] overflow-hidden">
          <img src="/hero.png" alt="Головне зображення" className="w-full pixelcut object-cover md:max-h-[calc(100vh-600px)] md:min-h-[201px]" style={{ filter: "brightness(0.3)" }} />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-opacity-50">
            <h1 className="text-4xl font-bold text-gray-200 mb-4">Ласкаво просимо на M4SUB</h1>
            <p className="text-lg text-gray-200">Сервери Minecraft для тебе та твого друга</p>
          </div>
        </div>
      </section>
    );
  }
  