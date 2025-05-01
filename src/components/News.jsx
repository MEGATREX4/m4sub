export default function News() {
    const news = ["Стріми", "Івенти", "Новини"];
  
    return (
      <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <img src="/news.png" alt="Новини" className="shadow w-64 h-64 md:w-80 md:h-80" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-200">Останні новини</h2>
          <p className="mt-4">Слідкуйте за останніми подіями на нашому сервері в Discord</p>
          <ul className="mb-4 list-none list-inside">
            {news.map((item, index) => (
              <li key={index} className="mt-3 flex items-center">
                <img src="/icons/point.png" alt="Point icon" className="invert-[1] w-4 h-4 mr-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a href="/discord" className="text-center inline-block mt-4 w-[250px] px-6 py-2 bg-[#c5629a] hover:bg-[#f390d0] text-gray-200 font-bold cornerCutSmall transition">Переглянути Discord</a>
        </div>
      </section>
    );
  }
  